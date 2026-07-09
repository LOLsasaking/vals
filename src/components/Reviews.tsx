"use client";

import { useI18n } from "@/i18n/I18nProvider";

type Review = { quote: string; author: string; location: string };

const TRACK_1: Review[] = [
  { quote: "Imported my Raptor flawlessly — every euro of freight and customs itemized up front.", author: "Daniel R.", location: "Santa Cruz" },
  { quote: "The 3D walkaround sold me before I ever saw the car in person.", author: "Marta G.", location: "La Laguna" },
  { quote: "Transparent pricing on the IGIC and DUA. No surprises at the port.", author: "Javier M.", location: "Adeje" },
];

const TRACK_2: Review[] = [
  { quote: "From US auction to my driveway in Los Cristianos in six weeks. Impeccable.", author: "Sofía P.", location: "Arona" },
  { quote: "VALS handled the 150-point inspection so I knew exactly what I was buying.", author: "Tom B.", location: "Costa Adeje" },
  { quote: "Finally an importer that treats the Canary Islands market seriously.", author: "Elena C.", location: "Puerto de la Cruz" },
];

const TRACK_3: Review[] = [
  { quote: "Premium service end-to-end. The studio photography is gorgeous.", author: "Andrés L.", location: "Güímar" },
  { quote: "They sourced an exact-spec Bronco I couldn't find anywhere in Europe.", author: "Lucía F.", location: "Candelaria" },
  { quote: "Honest, fast, and obsessive about the details. Highly recommend.", author: "Pablo N.", location: "Tacoronte" },
];

function Card({ r }: { r: Review }) {
  return (
    <figure className="mx-3 flex w-[clamp(260px,80vw,400px)] shrink-0 flex-col justify-between rounded-xl border border-line bg-white p-5 shadow-soft">
      <blockquote className="text-sm font-light leading-relaxed text-navy-soft">
        &ldquo;{r.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-navy-muted">
        <span className="font-semibold text-royal">{r.author}</span>
        <span className="text-navy-muted">·</span>
        <span>{r.location}</span>
      </figcaption>
    </figure>
  );
}

/**
 * A seamless track: the content is rendered twice back-to-back and the
 * whole strip is translated by exactly -50% (or 0%→-50%), so the loop point
 * is invisible. Edges are faded by the parent's `.marquee-mask`.
 */
function Track({
  reviews,
  direction,
  duration,
}: {
  reviews: Review[];
  direction: "ltr" | "rtl";
  duration: number;
}) {
  const items = [...reviews, ...reviews];
  return (
    <div
      className="flex w-max"
      style={
        {
          animation: `${direction === "ltr" ? "marquee-ltr" : "marquee-rtl"} ${duration}s linear infinite`,
        } as React.CSSProperties
      }
    >
      {items.map((r, i) => (
        <Card key={`${r.author}-${i}`} r={r} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-t border-line bg-gradient-to-b from-white to-sky py-24 sm:py-28">
      <div className="mb-12 px-6 text-center">
        <p className="eyebrow">{t("reviews.eyebrow")}</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          {t("reviews.title")}
        </h2>
      </div>

      <div className="marquee-mask flex flex-col gap-5">
        <Track reviews={TRACK_1} direction="ltr" duration={46} />
        <Track reviews={TRACK_2} direction="rtl" duration={54} />
        <Track reviews={TRACK_3} direction="ltr" duration={50} />
      </div>
    </section>
  );
}
