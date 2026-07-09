"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const handleContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const message = String(fd.get("message") ?? "");
    const subject = `Website enquiry — ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:vanessahg2312@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
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
              <a href="https://wa.me/34606410974" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 transition-colors hover:text-white">
                <svg className="h-4 w-4 text-royal-light" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.82c0 4.54-3.69 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
                </svg>
                +34 606 41 09 74
              </a>
              <a href="mailto:vanessahg2312@gmail.com" className="flex items-center gap-3 text-white/70 transition-colors hover:text-white">
                <svg className="h-4 w-4 text-royal-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 6L2 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                vanessahg2312@gmail.com
              </a>
              <p className="flex items-center gap-3 text-white/70">
                <svg className="h-4 w-4 text-royal-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Tenerife, Canary Islands
              </p>
            </div>

            {sent ? (
              <div className="mt-6 rounded-lg border border-white/20 bg-white/10 p-5 text-sm text-white">
                {t("footer.form.sent")}
              </div>
            ) : (
              <form onSubmit={handleContact} className="mt-6 space-y-3">
                <input name="name" required placeholder={t("footer.form.name")} className={inputCls} />
                <input name="email" type="email" required placeholder={t("footer.form.email")} className={inputCls} />
                <textarea name="message" rows={3} required placeholder={t("footer.form.message")} className={`${inputCls} resize-none`} />
                <button type="submit" className="btn-blue w-full bg-white text-royal-dark hover:bg-sky">
                  {t("footer.form.send")}
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
          <a href="#import" className="transition-colors hover:text-white">{t("nav.import")}</a>
          <a href="#contact" className="transition-colors hover:text-white">{t("nav.contact")}</a>
        </div>
      </div>
    </footer>
  );
}
