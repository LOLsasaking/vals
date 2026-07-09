"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Mobile-only floating button that jumps straight to the custom-order survey.
 * Appears once the user scrolls past the hero and hides while the import
 * section is on screen (so it never covers the form itself).
 */
export default function FloatingImportCTA() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const importEl = document.getElementById("import");

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      let importVisible = false;
      if (importEl) {
        const r = importEl.getBoundingClientRect();
        importVisible = r.top < window.innerHeight && r.bottom > 0;
      }
      setShow(pastHero && !importVisible);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToImport = () => {
    document.getElementById("import")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={scrollToImport}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-royal px-6 py-3.5 text-sm font-semibold text-white shadow-lux ring-1 ring-white/20 transition-colors hover:bg-royal-dark sm:hidden"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h13M12 5l7 7-7 7" />
          </svg>
          {t("cta.importCar")}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
