"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

type FormState = {
  yearFrom: string;
  yearTo: string;
  make: string;
  model: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const EMPTY: FormState = {
  yearFrom: "",
  yearTo: "",
  make: "",
  model: "",
  budget: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

const STEP_KEYS = ["survey.step.vehicle", "survey.step.budget", "survey.step.contact"] as const;

const fieldCls =
  "w-full rounded-lg border border-line bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy-muted outline-none transition-colors focus:border-royal focus:bg-white focus:ring-2 focus:ring-royal/15";
const labelCls = "mb-1.5 block text-[0.7rem] uppercase tracking-[0.18em] text-navy-muted";

export default function ImportHub() {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "done">("idle");

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const stepValid = (): boolean => {
    if (step === 0) return form.make.trim() !== "" && form.model.trim() !== "";
    if (step === 1) return form.budget.trim() !== "";
    return (
      form.name.trim() !== "" &&
      form.email.trim() !== "" &&
      /\S+@\S+\.\S+/.test(form.email)
    );
  };

  const next = () => stepValid() && setStep((s) => Math.min(s + 1, STEP_KEYS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepValid()) return;

    // Build an itemized email to the VALS inbox (no backend required).
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      `Vehicle: ${form.make} ${form.model}`.trim(),
      (form.yearFrom || form.yearTo) && `Year range: ${[form.yearFrom, form.yearTo].filter(Boolean).join(" – ")}`,
      form.budget && `Budget: ${form.budget}`,
      form.notes && `Notes: ${form.notes}`,
    ].filter(Boolean);

    const subject = `US import request — ${form.make} ${form.model}`.trim();
    window.location.href = `mailto:vanessahg2312@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("done");
  };

  const reset = () => {
    setForm(EMPTY);
    setStep(0);
    setStatus("idle");
  };

  return (
    <section id="import" className="relative border-t border-line bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* LEFT — pitch + logistics disclosure */}
          <div>
            <p className="eyebrow">{t("import.eyebrow")}</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
              {t("import.title1")}{" "}
              <span className="text-blue-grad">{t("import.titleUS")}</span>.{" "}
              {t("import.title2")}
            </h2>
            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-navy-soft">
              {t("import.lead")}
            </p>

            {/* Process steps — full 4-step transparency (choose → inspect/buy → ship+customs → deliver) */}
            <ol className="mt-8 space-y-4">
              {[
                ["01", "import.step1.t", "import.step1.d"],
                ["02", "import.step2.t", "import.step2.d"],
                ["03", "import.step3.t", "import.step3.d"],
                ["04", "import.step4.t", "import.step4.d"],
              ].map(([n, tk, dk]) => (
                <li key={n} className="flex gap-4">
                  <span className="font-display text-sm font-bold text-royal">{n}</span>
                  <div>
                    <p className="text-sm font-semibold text-navy">{t(tk)}</p>
                    <p className="text-sm font-light text-navy-soft">{t(dk)}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Real import footage — proof we handle the journey end-to-end */}
            <div className="mt-8">
              <p className="mb-3 text-[0.7rem] uppercase tracking-[0.18em] text-navy-muted">
                {t("import.videos.label")}
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {["/assets/import/import-1.mp4", "/assets/import/import-2.mp4", "/assets/import/import-3.mp4"].map(
                  (src) => (
                    <div
                      key={src}
                      className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line bg-cloud shadow-soft"
                    >
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        ref={(el) => {
                          if (el) {
                            el.muted = true;
                            el.play().catch(() => {});
                          }
                        }}
                      >
                        <source src={src} type="video/mp4" />
                      </video>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Logistics disclosure card */}
            <div className="mt-8 flex gap-4 rounded-xl border border-royal/25 bg-sky p-5 shadow-soft">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-royal"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8h.01M11 12h1v4h1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[0.82rem] leading-relaxed text-navy-soft">
                {t("import.disclosure.before")}
                <span className="font-semibold text-navy">{t("import.disclosure.local")}</span>
                {t("import.disclosure.mid")}
                <span className="font-medium text-royal-dark">
                  {t("import.disclosure.fees")}
                </span>
                .
              </p>
            </div>
          </div>

          {/* RIGHT — multi-step survey */}
          <div className="rounded-2xl border border-line bg-white p-7 shadow-lux sm:p-9">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
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
                  <h3 className="mt-6 font-display text-2xl font-bold text-navy">
                    {t("survey.successTitle")}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm font-light text-navy-soft">
                    {t("survey.successThanks")}
                    {form.name.split(" ")[0] ? `, ${form.name.split(" ")[0]}` : ""}.{" "}
                    {t("survey.successBody")}
                  </p>
                  <button onClick={reset} className="btn-blue mt-8 border border-line text-navy hover:bg-mist">
                    {t("survey.another")}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-[420px] flex-col"
                >
                  {/* Stepper */}
                  <div className="mb-7 flex items-center gap-2">
                    {STEP_KEYS.map((labelKey, i) => (
                      <div key={labelKey} className="flex flex-1 items-center gap-2">
                        <div className="flex w-full flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-[0.65rem] font-semibold transition-colors ${
                                i <= step ? "bg-royal text-white" : "bg-cloud text-navy-muted"
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className={`text-[0.68rem] uppercase tracking-[0.16em] ${i <= step ? "text-navy" : "text-navy-muted"}`}>
                              {t(labelKey)}
                            </span>
                          </div>
                          <div className={`h-0.5 w-full rounded-full transition-colors ${i <= step ? "bg-royal/50" : "bg-cloud"}`} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1">
                    <AnimatePresence mode="wait">
                      {step === 0 && (
                        <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-4">
                          <p className="text-sm font-light text-navy-soft">{t("survey.q1")}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className={labelCls} htmlFor="yearFrom">{t("survey.yearFrom")}</label>
                              <input id="yearFrom" inputMode="numeric" placeholder="2020" value={form.yearFrom} onChange={update("yearFrom")} className={fieldCls} />
                            </div>
                            <div>
                              <label className={labelCls} htmlFor="yearTo">{t("survey.yearTo")}</label>
                              <input id="yearTo" inputMode="numeric" placeholder="2024" value={form.yearTo} onChange={update("yearTo")} className={fieldCls} />
                            </div>
                          </div>
                          <div>
                            <label className={labelCls} htmlFor="make">{t("survey.make")} *</label>
                            <input id="make" placeholder="e.g. Ford" value={form.make} onChange={update("make")} className={fieldCls} required />
                          </div>
                          <div>
                            <label className={labelCls} htmlFor="model">{t("survey.model")} *</label>
                            <input id="model" placeholder="e.g. F-150 Raptor" value={form.model} onChange={update("model")} className={fieldCls} required />
                          </div>
                        </motion.div>
                      )}

                      {step === 1 && (
                        <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-4">
                          <p className="text-sm font-light text-navy-soft">{t("survey.q2")}</p>
                          <div>
                            <label className={labelCls} htmlFor="budget">{t("survey.budget")} *</label>
                            <input id="budget" inputMode="numeric" placeholder="e.g. 55.000" value={form.budget} onChange={update("budget")} className={fieldCls} required />
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {["€30k–45k", "€45k–60k", "€60k–80k", "€80k+"].map((b) => (
                              <button key={b} type="button" onClick={() => setForm((f) => ({ ...f, budget: b }))} className={`rounded-full border border-line px-4 py-2 text-xs transition-colors ${form.budget === b ? "border-royal bg-royal text-white" : "text-navy-soft hover:bg-mist"}`}>
                                {b}
                              </button>
                            ))}
                          </div>
                          <div>
                            <label className={labelCls} htmlFor="notes">{t("survey.notes")}</label>
                            <textarea id="notes" rows={3} placeholder={t("survey.notesPh")} value={form.notes} onChange={update("notes")} className={`${fieldCls} resize-none`} />
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-4">
                          <p className="text-sm font-light text-navy-soft">{t("survey.q3")}</p>
                          <div>
                            <label className={labelCls} htmlFor="name">{t("survey.name")} *</label>
                            <input id="name" placeholder="Your name" value={form.name} onChange={update("name")} className={fieldCls} required />
                          </div>
                          <div>
                            <label className={labelCls} htmlFor="phone">{t("survey.phone")}</label>
                            <input id="phone" type="tel" placeholder="+34 …" value={form.phone} onChange={update("phone")} className={fieldCls} />
                          </div>
                          <div>
                            <label className={labelCls} htmlFor="email">{t("survey.email")} *</label>
                            <input id="email" type="email" placeholder="you@email.com" value={form.email} onChange={update("email")} className={fieldCls} required />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Nav buttons */}
                  <div className="mt-7 flex items-center justify-between gap-4">
                    <button type="button" onClick={back} disabled={step === 0} className="btn-blue border border-line text-navy-soft transition-opacity disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:bg-mist">
                      {t("survey.back")}
                    </button>

                    {step < STEP_KEYS.length - 1 ? (
                      <button type="button" onClick={next} disabled={!stepValid()} className="btn-blue bg-royal text-white transition-all hover:bg-royal-dark disabled:cursor-not-allowed disabled:opacity-40">
                        {t("survey.continue")}
                      </button>
                    ) : (
                      <button type="submit" disabled={!stepValid()} className="btn-blue bg-royal text-white transition-all hover:bg-royal-dark disabled:cursor-not-allowed disabled:opacity-40">
                        {t("survey.send")}
                      </button>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
