import type { Metadata } from "next";
import VehicleSheet, { SheetData } from "@/components/VehicleSheet";

export const metadata: Metadata = {
  title: "2021 Toyota 4Runner SR5 · VALS Tenerife",
  description:
    "2021 Toyota 4Runner SR5 4WD — photos, full specs and equipment. Available at VALS, Tenerife.",
};

const data: SheetData = {
  title: "2021 TOYOTA 4RUNNER",
  price: "€49.800",
  photoAlt: "2021 Toyota 4Runner",
  photos: [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/vehicles/4runner/4runner-${n}.jpeg`),
  specs: [
    { label: { en: "Year", es: "Año" }, value: { en: "2021", es: "2021" } },
    { label: { en: "Make", es: "Marca" }, value: { en: "TOYOTA", es: "TOYOTA" } },
    { label: { en: "Model", es: "Modelo" }, value: { en: "4RUNNER", es: "4RUNNER" } },
    { label: { en: "Trim", es: "Versión" }, value: { en: "SR5 SPORT UTILITY 4D", es: "SR5 SPORT UTILITY 4D" } },
    { label: { en: "Drivetrain", es: "Tracción" }, value: { en: "4WD", es: "4WD" } },
    { label: { en: "Transmission", es: "Transmisión" }, value: { en: "AUTOMATIC", es: "AUTOMÁTICA" } },
    { label: { en: "Engine", es: "Motor" }, value: { en: "V6, 4.0 LITER", es: "V6, 4.0 LITROS" } },
    { label: { en: "Mileage", es: "Millas" }, value: { en: "58,690", es: "58,690" } },
    { label: { en: "Doors", es: "Puertas" }, value: { en: "4", es: "4" } },
    { label: { en: "Exterior Color", es: "Color exterior" }, value: { en: "BLUE", es: "AZUL" } },
    { label: { en: "Interior Color", es: "Color interior" }, value: { en: "BLACK", es: "NEGRO" } },
    { label: { en: "VIN", es: "VIN" }, value: { en: "JTEMU5JR7M5925976", es: "JTEMU5JR7M5925976" } },
    { label: { en: "Stock No.", es: "Nº de stock" }, value: { en: "925976", es: "925976" } },
  ],
  equipment: [
    { en: "SIDE AIR BAGS", es: "AIRBAGS LATERALES" },
    { en: "AIR CONDITIONING", es: "AIRE ACONDICIONADO" },
    { en: "POWER SEAT", es: "ASIENTO ELÉCTRICO" },
    { en: "DOWNHILL ASSIST CONTROL", es: "CONTROL DE ASISTENCIA EN DESCENSOS" },
    { en: "SAFETY CONNECT", es: "SAFETY CONNECT" },
    { en: "F&R HEAD CURTAIN AIR BAGS", es: "AIRBAGS DE CORTINA DEL. Y TRAS." },
    { en: "POWER DOOR LOCKS", es: "CIERRE CENTRALIZADO" },
    { en: "ABS (4-WHEEL)", es: "ABS (4 RUEDAS)" },
    { en: "TRACTION CONTROL", es: "CONTROL DE TRACCIÓN" },
    { en: "POWER STEERING", es: "DIRECCIÓN ASISTIDA" },
    { en: "POWER WINDOWS", es: "ELEVALUNAS ELÉCTRICOS" },
    { en: "DYNAMIC RADAR CRUISE CONTROL", es: "CONTROL DE CRUCERO ADAPTATIVO" },
    { en: "ALLOY WHEELS", es: "LLANTAS DE ALEACIÓN" },
    { en: "DUAL AIR BAGS", es: "DOBLE AIRBAG FRONTAL" },
    { en: "VEHICLE STABILITY CONTROL", es: "CONTROL DE ESTABILIDAD" },
    { en: "BACKUP CAMERA", es: "CÁMARA DE MARCHA ATRÁS" },
    { en: "LANE DEPARTURE ALERT", es: "AVISO DE CAMBIO DE CARRIL" },
    { en: "REAR SPOILER", es: "ALERÓN TRASERO" },
    { en: "AM/FM STEREO", es: "RADIO AM/FM" },
    { en: "DAYTIME RUNNING LIGHTS", es: "LUCES DIURNAS" },
    { en: "BLUETOOTH WIRELESS", es: "BLUETOOTH" },
    { en: "KEYLESS ENTRY", es: "ACCESO SIN LLAVE" },
    { en: "HILL START ASSIST CONTROL", es: "ASISTENTE DE ARRANQUE EN PENDIENTE" },
    { en: "TOWING PKG", es: "PAQUETE DE REMOLQUE" },
    { en: "SIRIUSXM SATELLITE", es: "RADIO SATELITAL SIRIUSXM" },
    { en: "LED HEADLAMPS", es: "FAROS LED" },
    { en: "FOG LIGHTS", es: "FAROS ANTINIEBLA" },
    { en: "KNEE AIR BAGS", es: "AIRBAGS DE RODILLA" },
    { en: "TILT & TELESCOPING WHEEL", es: "VOLANTE AJUSTABLE" },
  ],
};

export default function Page() {
  return <VehicleSheet data={data} />;
}
