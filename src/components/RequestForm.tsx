"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

// Web version of the VALS vehicle request form (public/docs/vals-formulario-
// solicitud.pdf). Same four sections and fields as the PDF. It's sent
// privately to /api/import-request; no VALS email/phone is exposed.

export type RequestFormData = {
  fullName: string;
  phone: string;
  email: string;
  buyerType: "" | "person" | "company";
  company: string;
  taxId: string;
  billingAddress: string;
  deliveryAddress: string;
  vehicleType: string;
  make: string;
  model: string;
  year: string;
  extColor: string;
  intColor: string;
  fuel: string;
  transmission: string;
  maxKm: string;
  budget: string;
  mustHave: string;
  alternatives: string;
  notes: string;
  accepted: boolean;
  signName: string;
};

const EMPTY: RequestFormData = {
  fullName: "",
  phone: "",
  email: "",
  buyerType: "",
  company: "",
  taxId: "",
  billingAddress: "",
  deliveryAddress: "",
  vehicleType: "",
  make: "",
  model: "",
  year: "",
  extColor: "",
  intColor: "",
  fuel: "",
  transmission: "",
  maxKm: "",
  budget: "",
  mustHave: "",
  alternatives: "",
  notes: "",
  accepted: false,
  signName: "",
};

const STEPS = ["req.step.client", "req.step.vehicle", "req.step.prefs", "req.step.terms"] as const;
const FUELS = ["gasoline", "diesel", "hybrid", "phev", "electric", "other"] as const;
const TRANSMISSIONS = ["auto", "manual", "any"] as const;

const fieldCls =
  "w-full rounded-lg border border-line bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy-muted outline-none transition-colors focus:border-royal focus:bg-white focus:ring-2 focus:ring-royal/15";
const labelCls = "mb-1.5 block text-[0.7rem] uppercase tracking-[0.18em] text-navy-muted";

const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

export default function RequestForm() {
  const { t, locale } = useI18n();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RequestFormData>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const today = new Date().toLocaleDateString(locale);

  const set =
    <K extends keyof RequestFormData>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const stepValid = (s = step): boolean => {
    if (s === 0) return form.fullName.trim() !== "" && isEmail(form.email);
    if (s === 1) return form.make.trim() !== "" && form.model.trim() !== "" && form.budget.trim() !== "";
    if (s === 2) return true;
    return form.accepted && form.signName.trim() !== "";
  };

  const next = () => stepValid() && setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (![0, 1, 2, 3].every((s) => stepValid(s))) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/import-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "vehicle-request", locale, date: today, ...form }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setStep(0);
    setStatus("idle");
  };

  const slide = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.25 },
  };

  const Field = ({
    k,
    label,
    required,
    type = "text",
    placeholder,
    inputMode,
    className = "",
  }: {
    k: keyof RequestFormData;
    label: string;
    required?: boolean;
    type?: string;
    placeholder?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    className?: string;
  }) => (
    <div className={className}>
      <label className={labelCls} htmlFor={`req-${k}`}>
        {label}
        {required && " *"}
      </label>
      <input
        id={`req-${k}`}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={form[k] as string}
        onChange={set(k)}
        required={required}
        className={fieldCls}
      />
    </div>
  );

  const Area = ({ k, label }: { k: keyof RequestFormData; label: string }) => (
    <div>
      <label className={labelCls} htmlFor={`req-${k}`}>
        {label}
      </label>
      <textarea
        id={`req-${k}`}
        rows={3}
        value={form[k] as string}
        onChange={set(k)}
        className={`${fieldCls} resize-none`}
      />
    </div>
  );

  return (
    <div id="request-form" className="rounded-2xl border border-line bg-white p-7 shadow-lux sm:p-9">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[480px] flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-royal"
            >
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <h3 className="mt-6 font-display text-2xl font-bold text-navy">{t("req.successTitle")}</h3>
            <p className="mt-3 max-w-sm text-sm font-light text-navy-soft">{t("req.successBody")}</p>
            <button onClick={reset} className="btn-blue mt-8 border border-line text-navy hover:bg-mist">
              {t("req.another")}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-[480px] flex-col"
            noValidate
          >
            <p className="eyebrow">{t("req.eyebrow")}</p>
            <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-navy">{t("req.title")}</h3>
            <p className="mt-2 text-sm font-light text-navy-soft">{t("req.lead")}</p>

            {/* Stepper */}
            <div className="mb-7 mt-6 flex items-center gap-2">
              {STEPS.map((labelKey, i) => (
                <button
                  key={labelKey}
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  className="flex w-full flex-col gap-1.5 text-left"
                  aria-current={i === step ? "step" : undefined}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold transition-colors ${
                        i <= step ? "bg-royal text-white" : "bg-cloud text-navy-muted"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`hidden text-[0.66rem] uppercase tracking-[0.14em] sm:inline ${
                        i <= step ? "text-navy" : "text-navy-muted"
                      }`}
                    >
                      {t(labelKey)}
                    </span>
                  </span>
                  <span className={`h-0.5 w-full rounded-full transition-colors ${i <= step ? "bg-royal/50" : "bg-cloud"}`} />
                </button>
              ))}
            </div>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="s0" {...slide} className="space-y-4">
                    <p className="font-display text-base font-semibold text-navy">{t("req.s1.title")}</p>
                    {Field({ k: "fullName", label: t("req.fullName"), required: true })}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {Field({ k: "email", label: t("req.email"), required: true, type: "email" })}
                      {Field({ k: "phone", label: t("req.phone"), type: "tel" })}
                    </div>
                    <p className="-mt-2 text-xs text-navy-muted">{t("req.contactHint")}</p>
                    <div>
                      <span className={labelCls}>{t("req.buyerType")}</span>
                      <div className="flex gap-2">
                        {(["person", "company"] as const).map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, buyerType: b }))}
                            className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                              form.buyerType === b
                                ? "border-royal bg-royal text-white"
                                : "border-line text-navy-soft hover:bg-mist"
                            }`}
                          >
                            {t(b === "person" ? "req.buyer.person" : "req.buyer.company")}
                          </button>
                        ))}
                      </div>
                    </div>
                    {form.buyerType === "company" && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {Field({ k: "company", label: t("req.company") })}
                        {Field({ k: "taxId", label: t("req.taxId") })}
                      </div>
                    )}
                    {Field({ k: "billingAddress", label: t("req.billing") })}
                    {Field({ k: "deliveryAddress", label: t("req.delivery") })}
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="s1" {...slide} className="space-y-4">
                    <p className="font-display text-base font-semibold text-navy">{t("req.s2.title")}</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {Field({ k: "make", label: t("req.make"), required: true, placeholder: "Ford" })}
                      {Field({ k: "model", label: t("req.model"), required: true, placeholder: "Bronco" })}
                      {Field({ k: "vehicleType", label: t("req.type"), placeholder: t("req.typePh") })}
                      {Field({ k: "year", label: t("req.year"), inputMode: "numeric", placeholder: "2022" })}
                      {Field({ k: "extColor", label: t("req.extColor") })}
                      {Field({ k: "intColor", label: t("req.intColor") })}
                      <div>
                        <label className={labelCls} htmlFor="req-fuel">{t("req.fuel")}</label>
                        <select id="req-fuel" value={form.fuel} onChange={set("fuel")} className={fieldCls}>
                          <option value="">{t("req.select")}</option>
                          {FUELS.map((f) => (
                            <option key={f} value={f}>{t(`req.fuel.${f}`)}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="req-transmission">{t("req.transmission")}</label>
                        <select id="req-transmission" value={form.transmission} onChange={set("transmission")} className={fieldCls}>
                          <option value="">{t("req.select")}</option>
                          {TRANSMISSIONS.map((x) => (
                            <option key={x} value={x}>{t(`req.trans.${x}`)}</option>
                          ))}
                        </select>
                      </div>
                      {Field({ k: "maxKm", label: t("req.maxKm"), inputMode: "numeric", placeholder: "80.000 km" })}
                      {Field({ k: "budget", label: t("req.budget"), required: true, inputMode: "numeric", placeholder: "45.000" })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" {...slide} className="space-y-4">
                    <p className="font-display text-base font-semibold text-navy">{t("req.s3.title")}</p>
                    {Area({ k: "mustHave", label: t("req.mustHave") })}
                    {Area({ k: "alternatives", label: t("req.alternatives") })}
                    {Area({ k: "notes", label: t("req.notes") })}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" {...slide} className="space-y-4">
                    <p className="font-display text-base font-semibold text-navy">{t("req.s4.title")}</p>
                    <p className="rounded-xl border border-royal/25 bg-sky p-4 text-sm leading-relaxed text-navy-soft">
                      {t("req.terms")}
                    </p>
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-navy">
                      <input
                        type="checkbox"
                        checked={form.accepted}
                        onChange={(e) => setForm((f) => ({ ...f, accepted: e.target.checked }))}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-royal"
                      />
                      <span className="font-medium">{t("req.accept")} *</span>
                    </label>
                    <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                      {Field({ k: "signName", label: t("req.signName"), required: true })}
                      <div>
                        <span className={labelCls}>{t("req.date")}</span>
                        <p className="rounded-lg border border-line bg-cloud px-4 py-3 text-sm text-navy-soft">{today}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {status === "error" && (
              <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {t("req.error")}
              </p>
            )}

            <div className="mt-7 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="btn-blue border border-line text-navy-soft transition-opacity enabled:hover:bg-mist disabled:cursor-not-allowed disabled:opacity-30"
              >
                {t("req.back")}
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!stepValid()}
                  className="btn-blue bg-royal text-white transition-all hover:bg-royal-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("req.next")}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!stepValid() || status === "sending"}
                  className="btn-blue bg-royal text-white transition-all hover:bg-royal-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {status === "sending" ? t("req.sending") : t("req.send")}
                </button>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
