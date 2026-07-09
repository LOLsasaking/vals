"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { vehicles } from "@/data/vehicles";
import { useI18n } from "@/i18n/I18nProvider";

type Tab = "all" | "new" | "used" | "cpo";

// Browse-by-make wall. `make` must match Vehicle.make exactly for stocked
// brands to light up; `logo` is the file in /public/assets/brands.
const BRANDS: { label: string; make: string; logo: string }[] = [
  { label: "Toyota", make: "Toyota", logo: "toyota" },
  { label: "Audi", make: "Audi", logo: "audi" },
  { label: "Aston Martin", make: "Aston Martin", logo: "aston-martin" },
  { label: "Lamborghini", make: "Lamborghini", logo: "lamborghini" },
  { label: "BMW", make: "BMW", logo: "bmw" },
  { label: "Kia", make: "Kia", logo: "kia" },
  { label: "Acura", make: "Acura", logo: "acura" },
  { label: "Honda", make: "Honda", logo: "honda" },
  { label: "Ford", make: "Ford", logo: "ford" },
  { label: "Mazda", make: "Mazda", logo: "mazda" },
  { label: "Mercedes", make: "Mercedes-Benz", logo: "mercedes-benz" },
  { label: "Mitsubishi", make: "Mitsubishi", logo: "mitsubishi" },
];

export default function FindCars({
  onSearch,
}: {
  /** Push the chosen make + scroll to inventory. Empty make = show all. */
  onSearch: (make: string) => void;
}) {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("all");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");

  const makes = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.make))),
    []
  );
  const models = useMemo(
    () =>
      Array.from(
        new Set(vehicles.filter((v) => !make || v.make === make).map((v) => v.model))
      ),
    [make]
  );
  const years = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.year))).sort((a, b) => b - a),
    []
  );

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: t("find.tab.all") },
    { key: "new", label: t("find.tab.new") },
    { key: "used", label: t("find.tab.used") },
    { key: "cpo", label: t("find.tab.cpo") },
  ];

  const stockedMakes = new Set(makes);

  const selectCls =
    "w-full appearance-none rounded-lg border border-line bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-royal focus:ring-2 focus:ring-royal/15";

  return (
    <section id="find" className="relative z-20 mx-auto mt-8 max-w-5xl px-6 sm:-mt-20">
      {/* Search panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-line bg-white/95 p-4 shadow-lux backdrop-blur sm:p-6"
      >
        {/* Tabs */}
        <div className="mb-4 flex gap-5 border-b border-line px-1 text-sm">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              type="button"
              onClick={() => setTab(tb.key)}
              className={`relative -mb-px pb-2.5 font-medium transition-colors ${
                tab === tb.key ? "text-royal" : "text-navy-muted hover:text-navy"
              }`}
            >
              {tb.label}
              {tab === tb.key && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-royal" />
              )}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          <div className="relative">
            <select value={make} onChange={(e) => { setMake(e.target.value); setModel(""); }} className={selectCls} aria-label={t("find.make")}>
              <option value="">{t("find.anyMake")}</option>
              {makes.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <Chevron />
          </div>
          <div className="relative">
            <select value={model} onChange={(e) => setModel(e.target.value)} className={selectCls} aria-label={t("find.model")}>
              <option value="">{t("find.model")}</option>
              {models.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <Chevron />
          </div>
          <div className="relative">
            <select value={year} onChange={(e) => setYear(e.target.value)} className={selectCls} aria-label={t("find.years")}>
              <option value="">{t("find.years")}</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <Chevron />
          </div>
          <div className="relative">
            <select value={price} onChange={(e) => setPrice(e.target.value)} className={selectCls} aria-label={t("find.price")}>
              <option value="">{t("find.price")}</option>
              <option value="0-40000">€0 – €40k</option>
              <option value="40000-60000">€40k – €60k</option>
              <option value="60000-99999999">€60k+</option>
            </select>
            <Chevron />
          </div>
          <button
            type="button"
            onClick={() => onSearch(make)}
            className="btn-blue justify-center bg-royal px-8 text-white hover:bg-royal-dark"
          >
            {t("find.search")}
          </button>
        </div>
      </motion.div>

      {/* Brand wall — real car-make logos */}
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-6">
        {BRANDS.map((b) => {
          const stocked = stockedMakes.has(b.make);
          return (
            <button
              key={b.logo}
              type="button"
              disabled={!stocked}
              onClick={() => stocked && onSearch(b.make)}
              title={b.label}
              className={`group flex flex-col items-center gap-2.5 transition-all ${
                stocked ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              <span className="relative flex h-12 w-16 items-center justify-center">
                <Image
                  src={`/assets/brands/${b.logo}.png`}
                  alt={b.label}
                  width={64}
                  height={43}
                  className={`max-h-full w-auto object-contain transition-all duration-300 ${
                    stocked
                      ? "opacity-90 group-hover:scale-110 group-hover:opacity-100"
                      : "opacity-30 grayscale"
                  }`}
                />
              </span>
              <span
                className={`text-[0.62rem] uppercase tracking-[0.1em] transition-colors ${
                  stocked ? "text-navy-soft group-hover:text-royal" : "text-navy-muted/60"
                }`}
              >
                {b.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-muted"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
