"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { vehicles, type Availability, type Vehicle } from "@/data/vehicles";
import { useI18n } from "@/i18n/I18nProvider";

type Filter = "all" | Availability;

function VehicleCard({
  vehicle,
  onOpen,
}: {
  vehicle: Vehicle;
  onOpen: (v: Vehicle) => void;
}) {
  const { t } = useI18n();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(vehicle)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lux sm:p-8"
    >
      {/* Media stage — listing video plays automatically and loops */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        {/* Availability badge */}
        <span
          className={`absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] backdrop-blur ${
            vehicle.availability === "in-stock"
              ? "bg-royal/90 text-white"
              : "bg-navy/80 text-white"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              vehicle.availability === "in-stock" ? "bg-emerald-300" : "bg-sky"
            }`}
          />
          {vehicle.availability === "in-stock"
            ? t("inv.badge.inStock")
            : t("inv.badge.import")}
        </span>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={vehicle.image}
          aria-label={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.play().catch(() => {});
            }
          }}
        >
          <source src={vehicle.spinVideo} type="video/mp4" />
        </video>
      </div>

      {/* Typography block: year + name + More Info */}
      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-4xl font-bold leading-none text-blue-grad sm:text-5xl">
            {vehicle.year}
          </p>
          <h3 className="mt-2 text-lg font-light tracking-wide text-navy-soft sm:text-xl">
            {vehicle.make}{" "}
            <span className="font-semibold text-navy">{vehicle.model}</span>
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-navy-muted">
            {t(vehicle.colorKey)} · {vehicle.priceLabel}
          </p>
        </div>

        {/* More Info CTA — dynamic contrast on hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(vehicle);
          }}
          className="btn-blue shrink-0 border border-line px-5 py-2.5 text-[0.7rem] text-royal-dark transition-all duration-300 hover:border-transparent hover:bg-royal hover:text-white"
        >
          {t("inv.moreInfo")}
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <p className="mt-4 border-t border-line pt-4 text-sm font-light text-navy-soft">
        {t(vehicle.taglineKey)}
      </p>
    </motion.article>
  );
}

export default function Inventory({
  onOpen,
  makeFilter = "",
  onClearMake,
}: {
  onOpen: (v: Vehicle) => void;
  makeFilter?: string;
  onClearMake?: () => void;
}) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("inv.filter.all") },
    { key: "in-stock", label: t("inv.filter.inStock") },
    { key: "import", label: t("inv.filter.import") },
  ];

  const shown = useMemo(() => {
    let list = filter === "all" ? vehicles : vehicles.filter((v) => v.availability === filter);
    if (makeFilter) list = list.filter((v) => v.make === makeFilter);
    return list;
  }, [filter, makeFilter]);

  return (
    <section id="inventory" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="mb-10 text-center">
        <p className="eyebrow">{t("inv.eyebrow")}</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          {t("inv.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-light text-navy-soft">
          {t("inv.subtitle")}
        </p>
      </div>

      {/* Filter bar — In Stock (drive tomorrow) vs Available to Import */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
        {filters.map((f) => {
          const count =
            f.key === "all"
              ? vehicles.length
              : vehicles.filter((v) => v.availability === f.key).length;
          const isActive = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={isActive}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                isActive
                  ? "border-royal bg-royal text-white"
                  : "border-line text-navy-soft hover:border-royal/40 hover:bg-mist"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[0.6rem] ${
                  isActive ? "bg-white/20 text-white" : "bg-mist text-navy-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {makeFilter && (
        <div className="mb-8 flex items-center justify-center">
          <span className="flex items-center gap-2 rounded-full border border-royal/30 bg-sky px-4 py-2 text-xs text-royal-dark">
            {t("inv.showingMake")}: <strong className="font-semibold">{makeFilter}</strong>
            <button
              type="button"
              onClick={onClearMake}
              aria-label={t("inv.clearMake")}
              className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-royal/15 text-royal-dark transition-colors hover:bg-royal hover:text-white"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </span>
        </div>
      )}

      {shown.length === 0 ? (
        <p className="py-16 text-center text-sm font-light text-navy-soft">
          {t("inv.empty")}
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {shown.map((v) => (
            <VehicleCard key={v.id} vehicle={v} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  );
}
