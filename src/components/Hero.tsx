"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

// Hero background video. Swap the file at /public/assets/hero.mp4 to change it.
const HERO_VIDEO = "/assets/hero.mp4";
const HERO_POSTER = "/assets/hero-poster.jpg";

export default function Hero() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mobile browsers (esp. iOS Safari) often refuse to autoplay until the
  // element is muted + playsInline AND .play() is called from JS. Force it on
  // mount and again on the first user interaction as a fallback.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const onTouch = () => {
      tryPlay();
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("click", onTouch);
    };
    window.addEventListener("touchstart", onTouch, { once: true });
    window.addEventListener("click", onTouch, { once: true });
    return () => {
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("click", onTouch);
    };
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* Raw background video — no scrims/overlays */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Centered logo overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.86, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative w-[min(78vw,560px)]"
        >
          <Image
            src="/assets/vals-logo.png"
            alt="VALS"
            width={1120}
            height={620}
            priority
            className="h-auto w-full drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 1.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#inventory"
            className="btn-blue bg-white text-royal-dark shadow-soft hover:bg-sky"
          >
            {t("hero.cta.inventory")}
          </a>
          <a
            href="#import"
            className="btn-blue border border-white/50 text-white hover:border-white hover:bg-white/10"
          >
            {t("hero.cta.import")}
          </a>
        </motion.div>
      </div>

      {/* Scroll-down chevron */}
      <motion.a
        href="#inventory"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <svg
          className="h-7 w-7 animate-chev-bounce text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.a>
    </section>
  );
}
