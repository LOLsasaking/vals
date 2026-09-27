"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "./Hero";
import FindCars from "./FindCars";
import TrustStripe from "./TrustStripe";
import Inventory from "./Inventory";
import Process from "./Process";
import ImportHub from "./ImportHub";
import Reviews from "./Reviews";
import Footer from "./Footer";
import Nav from "./Nav";
import FloatingImportCTA from "./FloatingImportCTA";
import { I18nProvider } from "@/i18n/I18nProvider";
import { useAutoplayVideos } from "@/lib/useAutoplayVideos";
import type { Vehicle } from "@/data/vehicles";

// The 3D modal pulls in three.js + R3F — keep it out of the initial bundle
// and never render it on the server.
const VehicleModal = dynamic(() => import("./VehicleModal"), { ssr: false });

export default function SiteShell() {
  const [active, setActive] = useState<Vehicle | null>(null);
  const [makeFilter, setMakeFilter] = useState("");
  useAutoplayVideos();

  const handleSearch = (make: string) => {
    setMakeFilter(make);
    document.getElementById("inventory")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <I18nProvider>
      <Nav />
      <main id="top">
        <Hero />
        <FindCars onSearch={handleSearch} />
        <TrustStripe />
        <Inventory onOpen={setActive} makeFilter={makeFilter} onClearMake={() => setMakeFilter("")} />
        <Process />
        <ImportHub />
        <Reviews />
        <Footer />
      </main>
      <FloatingImportCTA />
      <VehicleModal vehicle={active} onClose={() => setActive(null)} />
    </I18nProvider>
  );
}
