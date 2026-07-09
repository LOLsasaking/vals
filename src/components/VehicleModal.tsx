"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Vehicle } from "@/data/vehicles";
import { useI18n } from "@/i18n/I18nProvider";
import { resolveValue } from "@/i18n/dictionary";

export default function VehicleModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle | null;
  onClose: () => void;
}) {
  const { t, locale } = useI18n();
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  const gallery = vehicle?.photos?.length ? vehicle.photos : vehicle ? [vehicle.image] : [];

  useEffect(() => {
    setActive(0);
    setZoom(false);
  }, [vehicle]);

  useEffect(() => {
    if (!vehicle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setZoom((z) => {
        if (z) return false;
        onClose();
        return false;
      });
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [vehicle, onClose]);

  const prev = () => setActive((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setActive((i) => (i + 1) % gallery.length);

  return (
    <AnimatePresence>
      {vehicle && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/40 p-3 backdrop-blur-md sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-4 w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-mist shadow-lux"
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/90 text-navy backdrop-blur transition-colors hover:bg-navy hover:text-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="p-6 sm:p-9">
              {/* ===== Header: title + stat cards ===== */}
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
                    {vehicle.year} {vehicle.make}{" "}
                    <span className="text-blue-grad">{vehicle.model}</span>
                  </h2>
                  <p className="mt-2 max-w-md text-sm font-light text-navy-soft">
                    {t(vehicle.taglineKey)}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <StatCard label={t("detail.topSpeed")} value={vehicle.topSpeed} icon="speed" />
                  <StatCard label={t("detail.accel")} value={vehicle.accel} icon="accel" />
                  <StatCard label={t("detail.power")} value={vehicle.power} icon="power" />
                </div>
              </div>

              {/* ===== Price + Contact ===== */}
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <p className="font-display text-3xl font-bold text-navy">{vehicle.priceLabel}</p>
                <a
                  href="#import"
                  onClick={onClose}
                  className="btn-blue bg-navy px-6 text-white hover:bg-royal-dark"
                >
                  {t("detail.contact")}
                </a>
                <span
                  className={`rounded-full px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${
                    vehicle.availability === "in-stock"
                      ? "bg-royal/10 text-royal-dark"
                      : "bg-navy/10 text-navy"
                  }`}
                >
                  {vehicle.availability === "in-stock" ? t("inv.badge.inStock") : t("inv.badge.import")}
                </span>
              </div>

              {/* ===== Main image + thumbnails ===== */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
                <button
                  type="button"
                  onClick={() => setZoom(true)}
                  className="group relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden"
                  aria-label={t("modal.viewPhoto")}
                >
                  <Image
                    key={gallery[active]}
                    src={gallery[active]}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 960px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                  {gallery.length > 1 && (
                    <>
                      <span onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy shadow-soft backdrop-blur hover:bg-white" aria-label={t("modal.prevPhoto")}>
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                      </span>
                      <span onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy shadow-soft backdrop-blur hover:bg-white" aria-label={t("modal.nextPhoto")}>
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                      </span>
                    </>
                  )}
                </button>
                {gallery.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto border-t border-line bg-mist p-3">
                    {gallery.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActive(i)}
                        className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                          i === active ? "border-royal" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`${t("modal.viewPhoto")} ${i + 1}`}
                      >
                        <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ===== Product Highlight ===== */}
              <h3 className="mt-9 font-display text-xl font-semibold text-navy">
                {t("detail.highlight")}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <HighlightCard label={t("spec.transmission")} value={resolveValue(locale, transmissionValue(vehicle))} icon="trans" />
                <HighlightCard label={t("detail.seats")} value={vehicle.seats} icon="seat" />
                <HighlightCard label={t("detail.bodyType")} value={t(vehicle.bodyTypeKey)} icon="body" />
                <HighlightCard label={t("detail.doors")} value={vehicle.doors} icon="door" />
              </div>

              {/* ===== Tabs (Information only) ===== */}
              <div className="mt-9 border-b border-line">
                <span className="relative -mb-px inline-block pb-3 text-sm font-semibold text-royal">
                  {t("detail.information")}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-royal" />
                </span>
              </div>

              {/* Information body — two-column spec list */}
              <div className="mt-6 grid gap-x-12 gap-y-5 sm:grid-cols-2">
                {[
                  { label: t("spec.engine"), value: resolveValue(locale, vehicle.specs.find((s) => s.labelKey === "spec.engine")?.value ?? "—") },
                  { label: t("detail.accel"), value: vehicle.accel },
                  { label: t("spec.transmission"), value: resolveValue(locale, transmissionValue(vehicle)) },
                  { label: t("detail.topSpeed"), value: vehicle.topSpeed },
                  { label: t("spec.drivetrain"), value: resolveValue(locale, vehicle.specs.find((s) => s.labelKey === "spec.drivetrain")?.value ?? "—") },
                  { label: t("detail.width"), value: vehicle.width },
                  { label: t("detail.power"), value: vehicle.power },
                  { label: t("detail.length"), value: vehicle.length },
                  { label: t("modal.mileage"), value: vehicle.mileage },
                  { label: t("spec.exterior"), value: vehicle.specs.find((s) => s.labelKey === "spec.exterior")?.value ?? "—" },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col border-b border-line/70 pb-4">
                    <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-navy-muted">{row.label}</dt>
                    <dd className="mt-1.5 text-base font-medium text-navy">{row.value}</dd>
                  </div>
                ))}
              </div>

              {/* Highlights bullets */}
              <ul className="mt-7 space-y-2.5">
                {vehicle.highlightKeys.map((hk) => (
                  <li key={hk} className="flex items-start gap-3 text-sm font-light text-navy-soft">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-royal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t(hk)}
                  </li>
                ))}
              </ul>

              <a
                href="#import"
                onClick={onClose}
                className="btn-blue mt-8 w-full justify-center bg-royal text-white hover:bg-royal-dark"
              >
                {t("modal.enquire")}
              </a>
            </div>

            {/* Fullscreen lightbox */}
            <AnimatePresence>
              {zoom && (
                <motion.div
                  key="lightbox"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-navy/95 p-4 sm:p-8"
                  onClick={() => setZoom(false)}
                >
                  <div className="relative h-[72%] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                    <Image src={gallery[active]} alt={`${vehicle.make} ${vehicle.model}`} fill sizes="(max-width: 768px) 100vw, 900px" className="object-contain" priority />
                  </div>
                  {gallery.length > 1 && (
                    <>
                      <button type="button" aria-label={t("modal.prevPhoto")} onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/30">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                      </button>
                      <button type="button" aria-label={t("modal.nextPhoto")} onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/30">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                      </button>
                    </>
                  )}
                  <div className="mt-4 flex items-center gap-3 text-xs text-white/70">
                    <span>{active + 1} / {gallery.length}</span>
                    <button type="button" onClick={() => setZoom(false)} className="rounded-full border border-white/30 px-3 py-1 uppercase tracking-[0.2em] hover:bg-white/10">
                      {t("modal.closePhoto")}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Transmission spec value (a "val.*" key) for a vehicle, or em-dash. */
function transmissionValue(v: Vehicle) {
  return v.specs.find((s) => s.labelKey === "spec.transmission")?.value ?? "—";
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: IconKey }) {
  return (
    <div className="rounded-xl border border-line bg-white px-3.5 py-3 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-[0.58rem] uppercase tracking-[0.12em] text-navy-muted">{label}</span>
        <SpecIcon name={icon} />
      </div>
      <p className="mt-1.5 font-display text-base font-bold text-navy">{value}</p>
    </div>
  );
}

function HighlightCard({ label, value, icon }: { label: string; value: string; icon: IconKey }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-[0.62rem] uppercase tracking-[0.12em] text-navy-muted">{label}</span>
        <SpecIcon name={icon} />
      </div>
      <p className="mt-2 text-sm font-semibold text-navy">{value}</p>
    </div>
  );
}

type IconKey = "speed" | "accel" | "power" | "trans" | "seat" | "body" | "door";

function SpecIcon({ name }: { name: IconKey }) {
  const common = { className: "h-4 w-4 text-royal", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "speed": return <svg {...common}><path d="M12 14l4-4M6.3 18a9 9 0 1 1 11.4 0" /></svg>;
    case "accel": return <svg {...common}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>;
    case "power": return <svg {...common}><path d="M11 3L4 14h6l-1 7 8-11h-6z" /></svg>;
    case "trans": return <svg {...common}><path d="M6 4v16M18 4v16M6 8h12M6 4h0M18 4h0M12 12v8" /><circle cx="6" cy="4" r="1.5" /><circle cx="18" cy="4" r="1.5" /><circle cx="12" cy="12" r="1.5" /></svg>;
    case "seat": return <svg {...common}><path d="M5 11V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6M5 11h11a3 3 0 0 1 3 3v3M5 11l-1 7M19 17H8" /></svg>;
    case "body": return <svg {...common}><path d="M3 13l2-5a3 3 0 0 1 3-2h8a3 3 0 0 1 3 2l2 5M3 13h18M3 13v3h2M21 13v3h-2" /><circle cx="7" cy="17" r="1.5" /><circle cx="17" cy="17" r="1.5" /></svg>;
    case "door": return <svg {...common}><path d="M4 21V5a2 2 0 0 1 2-2h9l5 5v13M4 21h16M14 12h.01" /></svg>;
  }
}
