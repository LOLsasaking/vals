"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { site } from "@/data/site";

// "How it works" — the VALS custom-order process, taken from the
// presentation PDF (public/docs/vals-proceso-de-compra.pdf).

const OVERVIEW = [1, 2, 3, 4] as const;
const PHASES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
// Phases where a payment is due, shown as a badge on the timeline.
const PHASE_PAYMENT: Record<number, string> = { 4: "60%", 7: "20%", 9: "20%" };
const PAYMENTS = [
  ["60%", "proc.pay.1"],
  ["20%", "proc.pay.2"],
  ["20%", "proc.pay.3"],
] as const;
const COSTS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
const CONDITIONS = [1, 2, 3, 4] as const;

const OverviewIcon = ({ n }: { n: number }) => {
  const common = {
    className: "h-6 w-6",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (n === 1)
    return (
      <svg {...common}>
        <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    );
  if (n === 2)
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    );
  if (n === 3)
    return (
      <svg {...common}>
        <path d="M3 17h18l-2 4H5zM5 17V9h6v8M11 11h5l3 6" />
        <path d="M8 9V5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M5 16l1.5-5A2 2 0 018.4 9.5h7.2a2 2 0 011.9 1.5L19 16" />
      <path d="M4 16h16v3H4zM7 19v1.5M17 19v1.5" />
      <path d="M9 5l2 2 4-4" />
    </svg>
  );
};

export default function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="relative border-t border-line bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{t("proc.eyebrow")}</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
            {t("proc.title")}
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-navy-soft">{t("proc.lead")}</p>
        </div>

        {/* 4-step overview */}
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OVERVIEW.map((n, i) => (
            <motion.li
              key={n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl border border-line bg-white p-6 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky text-royal">
                  <OverviewIcon n={n} />
                </span>
                <span className="font-display text-3xl font-bold text-cloud">{n}</span>
              </div>
              <p className="mt-5 font-display text-lg font-semibold text-navy">{t(`proc.overview.${n}.t`)}</p>
              <p className="mt-2 text-sm font-light leading-relaxed text-navy-soft">{t(`proc.overview.${n}.d`)}</p>
            </motion.li>
          ))}
        </ol>

        {/* 10 phases */}
        <div className="mt-20">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
            <h3 className="font-display text-2xl font-bold text-navy sm:text-3xl">{t("proc.phases.title")}</h3>
            <p className="text-sm font-light text-navy-muted">{t("proc.phases.sub")}</p>
          </div>

          <ol className="mt-8 grid gap-x-8 gap-y-0 md:grid-cols-2">
            {PHASES.map((n) => (
              <li key={n} className="relative flex gap-5 border-t border-line py-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-royal font-display text-sm font-bold text-white">
                  {n}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-navy">{t(`proc.p${n}.t`)}</p>
                    {PHASE_PAYMENT[n] && (
                      <span className="rounded-full bg-sky px-2.5 py-0.5 text-[0.7rem] font-semibold text-royal-dark">
                        {PHASE_PAYMENT[n]}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-light leading-relaxed text-navy-soft">{t(`proc.p${n}.d`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Costs · payments · conditions */}
        <div className="mt-20 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-line bg-mist p-7">
            <h4 className="font-display text-lg font-semibold text-navy">{t("proc.costs.title")}</h4>
            <ul className="mt-5 space-y-3">
              {COSTS.map((n) => (
                <li key={n} className="flex gap-3 text-sm text-navy-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                  {t(`proc.cost.${n}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-royal-deep p-7 text-white shadow-lux">
            <h4 className="font-display text-lg font-semibold">{t("proc.pay.title")}</h4>
            <ul className="mt-5 space-y-3">
              {PAYMENTS.map(([pct, key], i) => (
                <li key={i} className="flex items-center gap-4 rounded-xl border border-white/15 bg-white/5 px-4 py-3.5">
                  <span className="font-display text-3xl font-bold">{pct}</span>
                  <span className="text-sm text-white/75">{t(key)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs uppercase tracking-[0.18em] text-white/50">{t("proc.pay.foot")}</p>
          </div>

          <div className="rounded-2xl border border-line bg-mist p-7">
            <h4 className="font-display text-lg font-semibold text-navy">{t("proc.cond.title")}</h4>
            <ul className="mt-5 space-y-4">
              {CONDITIONS.map((n) => (
                <li key={n} className="flex gap-3 text-sm leading-relaxed text-navy-soft">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-royal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t(`proc.cond.${n}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#import" className="btn-blue bg-royal text-white hover:bg-royal-dark">
            {t("proc.cta.start")}
          </a>
          <a
            href={site.docs.presentation}
            target="_blank"
            rel="noopener"
            className="btn-blue inline-flex items-center gap-2 border border-line text-navy hover:bg-mist"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("proc.cta.pdf")}
          </a>
        </div>
      </div>
    </section>
  );
}
