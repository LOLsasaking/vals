"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-canvas/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" aria-label="VALS home" className="flex items-center">
          <Image
            src="/assets/vals-logo.png"
            alt="VALS"
            width={540}
            height={300}
            priority
            // Silver logo reads on the dark hero as-is; once over the white bar
            // we deepen it to navy so it stays legible.
            className={`h-12 w-auto transition-[filter] duration-300 sm:h-14 ${
              scrolled
                ? "[filter:brightness(0)_saturate(100%)_invert(9%)_sepia(40%)_saturate(2200%)_hue-rotate(200deg)_brightness(95%)_contrast(95%)]"
                : ""
            }`}
          />
        </a>
        <div
          className={`hidden items-center gap-8 text-xs uppercase tracking-[0.2em] transition-colors sm:flex ${
            scrolled ? "text-navy-soft" : "text-white/80"
          }`}
        >
          <a href="#inventory" className="transition-colors hover:text-royal">{t("nav.inventory")}</a>
          <a href="#import" className="transition-colors hover:text-royal">{t("nav.import")}</a>
          <a href="#contact" className="transition-colors hover:text-royal">{t("nav.contact")}</a>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher dark={scrolled} />
          <a
            href="#import"
            className={`btn-blue px-5 py-2 text-[0.7rem] transition-all ${
              scrolled
                ? "bg-royal text-white hover:bg-royal-dark"
                : "border border-white/40 text-white hover:bg-white/10"
            }`}
          >
            {t("nav.cta")}
          </a>
        </div>
      </nav>
    </header>
  );
}
