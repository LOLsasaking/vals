import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clean white + blue palette
        canvas: "#FFFFFF",       // base background (white)
        mist: "#F4F7FB",         // light gray section / raised surface
        cloud: "#EAF1FA",        // slightly deeper light blue-gray
        line: "#DCE5F0",         // hairline borders
        // Navy ink for text
        navy: {
          DEFAULT: "#0B1B3A",    // primary text
          soft: "#33415C",       // secondary text
          muted: "#6B7891",      // tertiary / labels
        },
        // Royal blue accent ramp
        royal: {
          light: "#5B8DEF",
          DEFAULT: "#1E5BD6",
          dark: "#1647AB",
          deep: "#0F2E73",
        },
        sky: "#E8F1FF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.35em",
      },
      backgroundImage: {
        "blue-sheen":
          "linear-gradient(120deg, #1647AB 0%, #1E5BD6 45%, #5B8DEF 100%)",
        "radial-spot":
          "radial-gradient(60% 60% at 50% 35%, rgba(30,91,214,0.08) 0%, rgba(255,255,255,0) 70%)",
      },
      boxShadow: {
        lux: "0 24px 60px -20px rgba(11,27,58,0.25)",
        soft: "0 8px 30px -12px rgba(11,27,58,0.18)",
        "inner-line": "inset 0 1px 0 0 rgba(255,255,255,0.6)",
      },
      keyframes: {
        "marquee-ltr": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "marquee-rtl": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "chev-bounce": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "marquee-ltr": "marquee-ltr var(--marquee-duration, 40s) linear infinite",
        "marquee-rtl": "marquee-rtl var(--marquee-duration, 40s) linear infinite",
        "chev-bounce": "chev-bounce 1.8s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
