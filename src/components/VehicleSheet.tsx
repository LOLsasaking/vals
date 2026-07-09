"use client";

import Image from "next/image";
import { useState } from "react";

/* QR landing sheet: dealer-style spec page (gallery, price, spec table,
   equipment list) with a self-contained ES/EN toggle for the QR audience. */

export type Lang = "es" | "en";
export type Bi = Record<Lang, string>;

export interface SheetData {
  title: string;
  price: string;
  photos: string[];
  photoAlt: string;
  specs: { label: Bi; value: Bi }[];
  equipment: Bi[];
}

const UI: Record<string, Bi> = {
  equipment: { en: "Vehicle Equipment", es: "Equipamiento del Vehículo" },
  visit: { en: "Visit our website", es: "Visita nuestra web" },
  tagline: { en: "Premium US Auto Imports · Tenerife", es: "Importación premium de coches de EE. UU. · Tenerife" },
};

export default function VehicleSheet({ data }: { data: SheetData }) {
  const [lang, setLang] = useState<Lang>("es");
  const [photo, setPhoto] = useState(0);
  const n = data.photos.length;

  const prev = () => setPhoto((p) => (p - 1 + n) % n);
  const next = () => setPhoto((p) => (p + 1) % n);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-6">
        {/* Header: logo + language toggle */}
        <div className="mb-6 flex items-center justify-between">
          <a href="/" aria-label="VALS home">
            <Image
              src="/assets/vals-logo.png"
              alt="VALS"
              width={130}
              height={72}
              className="h-auto w-[110px]"
              priority
            />
          </a>
          <div className="flex overflow-hidden rounded-full border border-white/25 text-sm font-semibold">
            {(["es", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-1.5 uppercase tracking-wide transition-colors ${
                  lang === l ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={data.photos[photo]}
            alt={`${data.photoAlt} — ${photo + 1}/${n}`}
            width={1200}
            height={800}
            priority
            className="h-auto w-full object-cover"
          />
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2.5 text-xl leading-none hover:bg-black/80"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2.5 text-xl leading-none hover:bg-black/80"
          >
            ›
          </button>
          <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2.5 py-1 text-xs font-semibold">
            {photo + 1} / {n}
          </span>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {data.photos.map((src, i) => (
            <button
              key={src}
              onClick={() => setPhoto(i)}
              className={`shrink-0 overflow-hidden rounded ${
                i === photo ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`Photo ${i + 1}`}
            >
              <Image src={src} alt="" width={120} height={80} className="h-16 w-24 object-cover" />
            </button>
          ))}
        </div>

        {/* Title + price + spec table */}
        <h1 className="mt-10 font-display text-2xl font-bold tracking-wide sm:text-3xl">
          {data.title}
        </h1>
        <p className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
          {data.price}
        </p>
        <dl className="mt-4">
          {data.specs.map((row) => (
            <div
              key={row.label.en}
              className="flex items-baseline gap-2 border-b border-white/15 py-3 text-[15px]"
            >
              <dt className="w-40 shrink-0 text-white/70">{row.label[lang]}</dt>
              <dd className="break-all font-bold">{row.value[lang]}</dd>
            </div>
          ))}
        </dl>

        {/* Equipment */}
        <h2 className="mt-12 border-b border-dashed border-white/30 pb-3 font-display text-2xl font-bold">
          {UI.equipment[lang]}
        </h2>
        <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 text-sm font-medium tracking-wide sm:grid-cols-2">
          {data.equipment.map((item) => (
            <li key={item.en} className="pl-1">
              {item[lang]}
            </li>
          ))}
        </ul>

        {/* Website link */}
        <div className="mt-14 text-center">
          <p className="mb-4 text-sm text-white/60">{UI.tagline[lang]}</p>
          <a
            href="/"
            className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-black transition-transform hover:scale-105"
          >
            {UI.visit[lang]} →
          </a>
        </div>
      </div>
    </main>
  );
}
