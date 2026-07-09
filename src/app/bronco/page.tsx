import type { Metadata } from "next";
import VehicleSheet, { SheetData } from "@/components/VehicleSheet";

export const metadata: Metadata = {
  title: "2022 Ford Bronco Sport Big Bend · VALS Tenerife",
  description:
    "2022 Ford Bronco Sport Big Bend 4x4 — photos, full specs and equipment. Available at VALS, Tenerife.",
};

const data: SheetData = {
  title: "2022 FORD BRONCO SPORT",
  price: "€41.500",
  photoAlt: "2022 Ford Bronco Sport",
  photos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `/assets/vehicles/bronco-sport/bronco-${n}.jpg`),
  specs: [
    { label: { en: "Year", es: "Año" }, value: { en: "2022", es: "2022" } },
    { label: { en: "Make", es: "Marca" }, value: { en: "FORD", es: "FORD" } },
    { label: { en: "Model", es: "Modelo" }, value: { en: "BRONCO SPORT", es: "BRONCO SPORT" } },
    { label: { en: "Trim", es: "Versión" }, value: { en: "BIG BEND SPORT UTILITY 4D", es: "BIG BEND SPORT UTILITY 4D" } },
    { label: { en: "Drivetrain", es: "Tracción" }, value: { en: "4X4", es: "4X4" } },
    { label: { en: "Transmission", es: "Transmisión" }, value: { en: "8-SPEED AUTOMATIC", es: "AUTOMÁTICA DE 8 VELOCIDADES" } },
    { label: { en: "Engine", es: "Motor" }, value: { en: "1.5L ECOBOOST TURBO", es: "1.5L ECOBOOST TURBO" } },
    { label: { en: "Mileage", es: "Millas" }, value: { en: "47,380", es: "47,380" } },
    { label: { en: "Doors", es: "Puertas" }, value: { en: "4", es: "4" } },
    { label: { en: "Exterior Color", es: "Color exterior" }, value: { en: "BLUE", es: "AZUL" } },
    { label: { en: "Interior Color", es: "Color interior" }, value: { en: "GRAY (CLOTH)", es: "GRIS (TELA)" } },
    { label: { en: "VIN", es: "VIN" }, value: { en: "3FMCR9B64NRD95991", es: "3FMCR9B64NRD95991" } },
  ],
  equipment: [
    { en: "1.5L ECOBOOST TURBO ENGINE", es: "MOTOR 1.5L ECOBOOST TURBO" },
    { en: "8-SPEED AUTOMATIC", es: "AUTOMÁTICA DE 8 VELOCIDADES" },
    { en: "TERRAIN MANAGEMENT — 5 G.O.A.T. MODES", es: "GESTIÓN DE TERRENO — 5 MODOS G.O.A.T." },
    { en: "FORD CO-PILOT360", es: "FORD CO-PILOT360" },
    { en: "PRE-COLLISION ASSIST (AEB)", es: "ASISTENTE PRE-COLISIÓN (FRENADA AUTOM.)" },
    { en: "BLIND SPOT MONITOR + CROSS-TRAFFIC ALERT", es: "ÁNGULO MUERTO + ALERTA DE TRÁFICO CRUZADO" },
    { en: "LANE-KEEPING SYSTEM", es: "MANTENIMIENTO DE CARRIL" },
    { en: "SYNC 3 — 8\" TOUCHSCREEN", es: "SYNC 3 — PANTALLA TÁCTIL 8\"" },
    { en: "APPLE CARPLAY / ANDROID AUTO", es: "APPLE CARPLAY / ANDROID AUTO" },
    { en: "WIRELESS CHARGING PAD", es: "CARGADOR INALÁMBRICO" },
    { en: "HEATED FRONT SEATS", es: "ASIENTOS DELANTEROS CALEFACTADOS" },
    { en: "REAR PARKING SENSORS", es: "SENSORES DE APARCAMIENTO TRASEROS" },
    { en: "INTELLIGENT ACCESS (KEYLESS)", es: "ACCESO SIN LLAVE (INTELLIGENT ACCESS)" },
    { en: "BACKUP CAMERA", es: "CÁMARA DE MARCHA ATRÁS" },
    { en: "FLIP-UP REAR GLASS", es: "LUNA TRASERA ABATIBLE" },
    { en: "LIFTGATE FLOODLIGHTS", es: "FOCOS DE PORTÓN TRASERO" },
    { en: "17\" ALLOY WHEELS (CARBONIZED GRAY)", es: "LLANTAS DE ALEACIÓN 17\" (GRIS CARBONIZADO)" },
  ],
};

export default function Page() {
  return <VehicleSheet data={data} />;
}
