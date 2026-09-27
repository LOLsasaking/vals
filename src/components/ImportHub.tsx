"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { site } from "@/data/site";
import RequestForm from "./RequestForm";

export default function ImportHub() {
  const { t } = useI18n();

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

            {/* The full process lives in the "How it works" section; link to it and the PDF form. */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#process" className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-royal-dark">
                {t("req.seeProcess")}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href={site.docs.requestForm} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-soft hover:text-navy">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t("req.pdf")}
              </a>
            </div>

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

          {/* RIGHT — vehicle request form (mirrors the PDF form) */}
          <RequestForm />
        </div>
      </div>
    </section>
  );
}
