"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { site } from "@/data/site";

export default function Footer() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Sent privately through the site's API — no VALS email is exposed.
  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/import-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          message: String(fd.get("message") ?? ""),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-royal-light focus:bg-white/10";

  return (
    <footer id="contact" className="relative bg-royal-deep text-white">
      {/* About block */}
      <div className="mx-auto max-w-7xl px-6 pt-24 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-royal-light">
              {t("footer.about.eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {t("footer.about.title")}
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/70">
              {t("footer.about.body")}
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-8">
              {[
                ["48h", "footer.stat.turnaround"],
                ["150", "footer.stat.inspection"],
                ["100%", "footer.stat.fees"],
              ].map(([n, lk]) => (
                <div key={lk}>
                  <p className="font-display text-3xl font-bold text-white">{n}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/50">
                    {t(lk)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact info + secure form */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur sm:p-8">
            <h3 className="font-display text-xl font-semibold text-white">
              {t("footer.getInTouch")}
            </h3>

            <div className="mt-5 space-y-3 text-sm">
              <p className="flex items-center gap-3 text-white/70">
                <svg className="h-4 w-4 text-royal-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {site.address || t("footer.location")}
              </p>
            </div>

            {status === "sent" ? (
              <div className="mt-6 rounded-lg border border-white/20 bg-white/10 p-5 text-sm text-white">
                {t("footer.form.sent")}
              </div>
            ) : (
              <form onSubmit={handleContact} className="mt-6 space-y-3">
                <input name="name" required placeholder={t("footer.form.name")} className={inputCls} />
                <input name="email" type="email" required placeholder={t("footer.form.email")} className={inputCls} />
                <textarea name="message" rows={3} required placeholder={t("footer.form.message")} className={`${inputCls} resize-none`} />
                {status === "error" && (
                  <p role="alert" className="text-sm text-red-200">{t("footer.form.error")}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-blue w-full bg-white text-royal-dark hover:bg-sky disabled:opacity-60"
                >
                  {status === "sending" ? t("req.sending") : t("footer.form.send")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/15 px-6 py-8 sm:flex-row">
        <Image
          src="/assets/vals-logo.png"
          alt="VALS"
          width={420}
          height={232}
          className="h-10 w-auto opacity-95"
        />
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} VALS · Premium US Auto Imports · Tenerife
        </p>
        <div className="flex gap-6 text-xs uppercase tracking-[0.16em] text-white/50">
          <a href="#inventory" className="transition-colors hover:text-white">{t("nav.inventory")}</a>
          <a href="#process" className="transition-colors hover:text-white">{t("nav.process")}</a>
          <a href="#import" className="transition-colors hover:text-white">{t("nav.import")}</a>
          <a href="#contact" className="transition-colors hover:text-white">{t("nav.contact")}</a>
        </div>
      </div>
    </footer>
  );
}
