"use client";

import { useI18n } from "@/i18n/I18nProvider";

/**
 * Scrolling marquee strip: bold trust phrases repeating across an
 * infinitely-looping track, separated by dot markers.
 */
export default function TrustStripe() {
  const { t } = useI18n();

  const phrases = [
    t("trust.auth.title"),
    t("trust.usa.title"),
    t("trust.secure.title"),
  ];

  // One "unit" of phrases; rendered twice for a seamless -50% loop.
  const Unit = () => (
    <>
      {phrases.map((p) => (
        <span key={p} className="flex items-center">
          <span className="mx-7 font-display text-lg font-extrabold uppercase tracking-[0.12em] text-white sm:text-2xl">
            {p}
          </span>
          <span className="mx-1 h-1.5 w-1.5 rounded-full bg-royal-light/70" aria-hidden="true" />
        </span>
      ))}
    </>
  );

  return (
    <section aria-label="Why VALS" className="relative">
      <div className="relative overflow-hidden bg-[#0B0F1A] py-4">
        {/* top/bottom red+blue accent hairlines */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#E23A4E] via-white to-royal-light" />
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-royal-light via-white to-[#E23A4E]" />

        <div className="flex w-max animate-marquee-rtl [--marquee-duration:28s] hover:[animation-play-state:paused]">
          <div className="flex shrink-0 items-center">
            <Unit />
          </div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            <Unit />
          </div>
        </div>
      </div>
    </section>
  );
}
