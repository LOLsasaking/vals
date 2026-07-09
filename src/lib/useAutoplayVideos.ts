"use client";

import { useEffect } from "react";

/**
 * iOS Safari (especially in Low Power Mode) refuses muted-autoplay until a real
 * user gesture occurs. This hook plays EVERY <video> on the page on the first
 * scroll / touch / pointer anywhere — so one flick of the finger starts the hero
 * and all the listing clips at once, instead of each showing a dead play button.
 *
 * It also keeps retrying when videos scroll into view, and re-arms after the tab
 * becomes visible again.
 */
export function useAutoplayVideos() {
  useEffect(() => {
    const playAll = () => {
      document.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
        v.muted = true;
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      });
    };

    // Try immediately (works on most Android / desktop / non-LPM iOS).
    playAll();

    // First user gesture of any kind unlocks playback for the whole page.
    const onGesture = () => playAll();
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("scroll", onGesture, opts);
    window.addEventListener("touchstart", onGesture, opts);
    window.addEventListener("pointerdown", onGesture, opts);
    window.addEventListener("click", onGesture, opts);

    // Re-try when returning to the tab.
    const onVis = () => { if (!document.hidden) playAll(); };
    document.addEventListener("visibilitychange", onVis);

    // Play clips as they enter the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const v = e.target as HTMLVideoElement;
            v.muted = true;
            v.play().catch(() => {});
          }
        });
      },
      { threshold: 0.25 }
    );
    document.querySelectorAll("video").forEach((v) => io.observe(v));

    return () => {
      window.removeEventListener("scroll", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("click", onGesture);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);
}
