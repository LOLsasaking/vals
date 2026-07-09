import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  yearFrom?: string;
  yearTo?: string;
  make?: string;
  model?: string;
  budget?: string;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
};

function esc(s: string) {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();

  // Minimal validation
  if (!name || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json(
      { error: "Name and a valid email are required." },
      { status: 422 }
    );
  }

  const summary = [
    ["Name", name],
    ["Email", email],
    ["Phone", body.phone],
    ["Vehicle", `${body.make ?? ""} ${body.model ?? ""}`.trim()],
    ["Year range", [body.yearFrom, body.yearTo].filter(Boolean).join(" – ")],
    ["Budget", body.budget],
    ["Notes", body.notes],
  ]
    .filter(([, v]) => v && String(v).trim() !== "")
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#8A9197">${k}</td><td style="color:#E8EBED">${esc(String(v))}</td></tr>`)
    .join("");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev";

  // If Resend isn't configured yet, accept the lead and log it.
  // Swap-in is zero-code: just set the env vars in .env.local.
  if (!apiKey || !to) {
    console.info("[import-request] (email not configured) New lead:", {
      name,
      email,
      vehicle: `${body.make ?? ""} ${body.model ?? ""}`.trim(),
      budget: body.budget,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `VALS Imports <${from}>`,
      to: [to],
      replyTo: email,
      subject: `New US import request — ${body.make ?? "Vehicle"} ${body.model ?? ""}`.trim(),
      html: `
        <div style="font-family:Inter,system-ui,sans-serif;background:#0D0D0D;padding:24px;color:#E8EBED">
          <h2 style="margin:0 0 16px;font-weight:700">New import request</h2>
          <table style="border-collapse:collapse;font-size:14px">${summary}</table>
        </div>`,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[import-request] Resend error:", err);
    return NextResponse.json(
      { error: "Could not send right now. Please email us directly." },
      { status: 502 }
    );
  }
}
