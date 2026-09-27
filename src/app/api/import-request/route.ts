import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Receives the website's vehicle requests and contact messages and emails
// them privately to VALS. The destination inbox lives ONLY in server env
// vars and is never sent to the browser:
//
//   RESEND_API_KEY     — Resend API key
//   LEAD_NOTIFY_EMAIL  — inbox that receives requests
//   LEAD_FROM_EMAIL    — optional verified sender (defaults to Resend's test sender)
//
// If these aren't set, the request fails with 503 so the visitor sees an
// error instead of a request silently disappearing.

type Body = Record<string, unknown> & { kind?: string };

const MAX_LEN = 2000;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX_LEN) : "";
}

function esc(s: string) {
  return s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]!);
}

const FUEL: Record<string, string> = {
  gasoline: "Gasolina", diesel: "Diésel", hybrid: "Híbrido", phev: "Híbrido enchufable", electric: "Eléctrico", other: "Otro",
};
const TRANS: Record<string, string> = { auto: "Automática", manual: "Manual", any: "Indiferente" };
const BUYER: Record<string, string> = { person: "Persona", company: "Empresa" };

type Section = [string, [string, string][]];

// Section → [label, value] rows, matching the PDF form layout.
function vehicleRequestRows(b: Body): Section[] {
  return [
    ["1 · Datos del cliente", [
      ["Nombre completo", str(b.fullName)],
      ["Teléfono", str(b.phone)],
      ["Email", str(b.email)],
      ["Tipo de comprador", BUYER[str(b.buyerType)] ?? ""],
      ["Nombre de la empresa", str(b.company)],
      ["NIF/CIF", str(b.taxId)],
      ["Dirección de facturación", str(b.billingAddress)],
      ["Dirección de entrega del auto", str(b.deliveryAddress)],
    ]],
    ["2 · Vehículo solicitado", [
      ["Tipo de auto", str(b.vehicleType)],
      ["Marca", str(b.make)],
      ["Modelo", str(b.model)],
      ["Año deseado", str(b.year)],
      ["Color exterior", str(b.extColor)],
      ["Color interior", str(b.intColor)],
      ["Combustible", FUEL[str(b.fuel)] ?? ""],
      ["Transmisión", TRANS[str(b.transmission)] ?? ""],
      ["Kilometraje máximo", str(b.maxKm)],
      ["Presupuesto máximo (€)", str(b.budget)],
    ]],
    ["3 · Preferencias y observaciones", [
      ["Equipamiento imprescindible", str(b.mustHave)],
      ["Opciones aceptables", str(b.alternatives)],
      ["Observaciones adicionales", str(b.notes)],
    ]],
    ["4 · Condiciones", [
      ["Acepta condiciones", b.accepted === true ? "Sí" : "No"],
      ["Firma (nombre)", str(b.signName)],
      ["Fecha", str(b.date)],
      ["Idioma de la web", str(b.locale)],
    ]],
  ];
}

function contactRows(b: Body): Section[] {
  return [["Mensaje desde la web", [
    ["Nombre", str(b.name)],
    ["Email", str(b.email)],
    ["Mensaje", str(b.message)],
  ]]];
}

function renderHtml(title: string, sections: Section[]) {
  const blocks = sections
    .map(([heading, rows]) => {
      const trs = rows
        .filter(([, v]) => v !== "")
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#6B7891;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;color:#0B1B3A;white-space:pre-wrap">${esc(v)}</td></tr>`
        )
        .join("");
      return trs
        ? `<h3 style="margin:24px 0 8px;font-size:14px;color:#1E5BD6;text-transform:uppercase;letter-spacing:.08em">${esc(heading)}</h3><table style="border-collapse:collapse;font-size:14px">${trs}</table>`
        : "";
    })
    .join("");
  return `<div style="font-family:Inter,system-ui,sans-serif;background:#F4F7FB;padding:28px;color:#0B1B3A"><h2 style="margin:0">${esc(title)}</h2>${blocks}</div>`;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const isContact = body.kind === "contact";
  const name = isContact ? str(body.name) : str(body.fullName);
  const email = str(body.email);

  if (!name || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 422 });
  }
  if (!isContact) {
    if (!str(body.make) || !str(body.model) || !str(body.budget)) {
      return NextResponse.json({ error: "Make, model and budget are required." }, { status: 422 });
    }
    if (body.accepted !== true || !str(body.signName)) {
      return NextResponse.json({ error: "Conditions must be accepted." }, { status: 422 });
    }
  } else if (!str(body.message)) {
    return NextResponse.json({ error: "Message is required." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.error("[import-request] Email delivery is not configured (RESEND_API_KEY / LEAD_NOTIFY_EMAIL missing).");
    return NextResponse.json({ error: "Delivery not configured." }, { status: 503 });
  }

  const vehicle = `${str(body.make)} ${str(body.model)}`.trim();
  const subject = isContact ? `Mensaje web — ${name}` : `Solicitud de vehículo — ${vehicle} — ${name}`;
  const html = isContact
    ? renderHtml("Nuevo mensaje de contacto", contactRows(body))
    : renderHtml("Nueva solicitud / orden de búsqueda de vehículo", vehicleRequestRows(body));

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `VALS Web <${from}>`,
      to: [to],
      replyTo: email,
      subject,
      html,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[import-request] Send failed:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}
