"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

// ponytail: each flyer already carries the full spec sheet, so we show the flyer itself.
// To add a car: drop the flyer in /public/assets/usa/ and add a row here.
const usaCars = [
  { img: 1, name: "2024 Ford Bronco Wildtrak", price: "$44,000" },
  { img: 2, name: "2022 Ford Bronco Outer Banks", price: "$33,500" },
  { img: 3, name: "2023 Ford Bronco Base", price: "$39,000" },
  { img: 4, name: "2023 Ford Bronco Black Diamond", price: "$47,500" },
  { img: 5, name: "2023 Ford Bronco", price: "$42,000" },
  { img: 6, name: "2024 Ford Bronco Heritage Edition", price: "$57,000" },
  { img: 7, name: "2024 Ford Bronco Big Bend", price: "$43,500" },
  { img: 8, name: "2022 Toyota Corolla SE", price: "$16,500" },
  { img: 9, name: "2026 Toyota Tundra Limited", price: "$50,000" },
  { img: 10, name: "2024 Chevrolet Silverado 1500", price: "$30,000" },
  { img: 11, name: "2026 Chevrolet Silverado 1500", price: "$30,000" },
  { img: 12, name: "2025 Hyundai Santa Fe", price: "$28,000" },
  { img: 13, name: "2020 Toyota 4Runner", price: "$30,000" },
  { img: 14, name: "2023 Toyota 4Runner", price: "$38,000" },
];

export default function UsaStock() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  const car = usaCars.find((c) => c.img === open);

  return (
    <section id="usa-stock" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="mb-12 text-center">
        <p className="eyebrow">{t("usa.eyebrow")}</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          {t("usa.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-light text-navy-soft">{t("usa.subtitle")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {usaCars.map((c) => (
          <button
            key={c.img}
            type="button"
            onClick={() => setOpen(c.img)}
            className="group overflow-hidden rounded-2xl border border-line bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lux"
          >
            <img
              src={`/assets/usa/${c.img}.jpg`}
              alt={`${c.name} — ${c.price}`}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <span className="text-sm font-semibold text-navy">{c.name}</span>
              <span className="shrink-0 text-sm font-bold text-royal">{c.price}</span>
            </div>
          </button>
        ))}
      </div>

      {car && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={car.name}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/85 p-4 backdrop-blur"
        >
          <img
            src={`/assets/usa/${car.img}.jpg`}
            alt={`${car.name} — ${car.price}`}
            className="max-h-full max-w-full rounded-xl shadow-lux"
          />
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
