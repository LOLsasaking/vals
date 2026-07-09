import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VALS — Premium US Auto Imports · Tenerife",
  description:
    "VALS is Tenerife's premium bridge to the American automotive market. We source, inspect, and import custom-ordered vehicles from the United States with full import transparency.",
  keywords: [
    "VALS",
    "Tenerife car import",
    "US car import Canary Islands",
    "premium vehicle import",
    "Toyota 4Runner Tenerife",
    "Ford Bronco Sport import",
  ],
  openGraph: {
    title: "VALS — Premium US Auto Imports · Tenerife",
    description:
      "Tenerife's premium bridge to the American automotive market. Source, inspect, and import — with full transparency.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="bg-canvas font-sans text-navy antialiased">
        {children}
      </body>
    </html>
  );
}
