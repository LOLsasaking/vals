export type SpecRow = {
  /** Translation key for the row label (see dictionary "spec.*"). */
  labelKey: string;
  /** Display value. Plain values stay as-is; translatable ones use a "val.*" key resolved in the modal. */
  value: string;
};

export type Availability = "in-stock" | "import";

export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  /** Translation key for the color name (see dictionary "color.*"). */
  colorKey: string;
  /** Where the car lives now: on-island stock vs. custom-import example. */
  availability: Availability;
  /** Optional real-photo gallery shown in the modal (under the 3D view). */
  photos?: string[];
  /** Masked studio still / video poster. */
  image: string;
  /** Listing video that autoplays on the card. Swap the .mp4 to change it. */
  spinVideo: string;
  /** 3D model loaded in the explorer modal. Swap with your real .glb. */
  modelUrl: string;
  /** On-island local price, formatted for display. */
  priceLabel: string;
  mileage: string;
  /** Translation key for the condition (see dictionary "cond.*"). */
  conditionKey: string;
  /** Translation key for the tagline (see dictionary "veh.*.tagline"). */
  taglineKey: string;
  /** Headline stats shown in the detail hero (top speed, 0-100, power). */
  topSpeed: string;
  accel: string;
  power: string;
  /** Product-highlight quick cards. */
  bodyTypeKey: string;
  seats: string;
  doors: string;
  /** Extended information rows. */
  width: string;
  length: string;
  specs: SpecRow[];
  /** Translation keys for the highlight bullets (see dictionary "hl.*"). */
  highlightKeys: string[];
}

export const vehicles: Vehicle[] = [
  {
    id: "toyota-4runner-2021",
    year: 2021,
    make: "Toyota",
    model: "4Runner",
    colorKey: "color.blue",
    availability: "in-stock",
    photos: [
      "/assets/vehicles/4runner/4runner-1.jpeg",
      "/assets/vehicles/4runner/4runner-2.jpeg",
      "/assets/vehicles/4runner/4runner-3.jpeg",
      "/assets/vehicles/4runner/4runner-4.jpeg",
      "/assets/vehicles/4runner/4runner-5.jpeg",
      "/assets/vehicles/4runner/4runner-6.jpeg",
      "/assets/vehicles/4runner/4runner-7.jpeg",
    ],
    image: "/assets/vehicles/4runner.svg",
    spinVideo: "/assets/listings/video%202%20ford%20runne.mp4",
    modelUrl: "/assets/models/4runner.glb",
    priceLabel: "€49.800",
    mileage: "94.400 km (58,690 mi)",
    conditionKey: "cond.4runner",
    taglineKey: "veh.4runner.tagline",
    topSpeed: "190 km/h",
    accel: "7.7 s",
    power: "270 hp",
    bodyTypeKey: "body.suv",
    seats: "5",
    doors: "5",
    width: "1.925 mm",
    length: "4.795 mm",
    specs: [
      { labelKey: "spec.engine", value: "4.0L V6 (270 hp)" },
      { labelKey: "spec.drivetrain", value: "4WD" },
      { labelKey: "spec.transmission", value: "val.auto5" },
      { labelKey: "spec.fuel", value: "val.gasoline" },
      { labelKey: "spec.seats", value: "5" },
      { labelKey: "spec.exterior", value: "Voodoo Blue" },
    ],
    highlightKeys: ["hl.4runner.1", "hl.inspection", "hl.4runner.3"],
  },
  {
    id: "ford-bronco-sport-2022",
    year: 2022,
    make: "Ford",
    model: "Bronco Sport",
    colorKey: "color.blue",
    availability: "in-stock",
    photos: [
      "/assets/vehicles/bronco-sport/bronco-1.jpg",
      "/assets/vehicles/bronco-sport/bronco-2.jpg",
      "/assets/vehicles/bronco-sport/bronco-3.jpg",
      "/assets/vehicles/bronco-sport/bronco-4.jpg",
      "/assets/vehicles/bronco-sport/bronco-5.jpg",
      "/assets/vehicles/bronco-sport/bronco-6.jpg",
      "/assets/vehicles/bronco-sport/bronco-7.jpg",
      "/assets/vehicles/bronco-sport/bronco-8.jpg",
      "/assets/vehicles/bronco-sport/bronco-9.jpg",
      "/assets/vehicles/bronco-sport/bronco-10.jpg",
    ],
    image: "/assets/vehicles/bronco-sport.svg",
    spinVideo: "/assets/listings/video%202%20bronco.mp4",
    modelUrl: "/assets/models/bronco-sport.glb",
    priceLabel: "€41.500",
    mileage: "76.200 km (47,380 mi)",
    conditionKey: "cond.bronco",
    taglineKey: "veh.bronco.tagline",
    topSpeed: "180 km/h",
    accel: "9.5 s",
    power: "181 hp",
    bodyTypeKey: "body.suv",
    seats: "5",
    doors: "5",
    width: "1.882 mm",
    length: "4.388 mm",
    specs: [
      { labelKey: "spec.engine", value: "1.5L EcoBoost Turbo (181 hp)" },
      { labelKey: "spec.drivetrain", value: "4x4" },
      { labelKey: "spec.transmission", value: "val.auto8" },
      { labelKey: "spec.fuel", value: "val.gasoline" },
      { labelKey: "spec.seats", value: "5" },
      { labelKey: "spec.exterior", value: "Atlas Blue" },
    ],
    highlightKeys: ["hl.bronco.1", "hl.inspection", "hl.bronco.3"],
  },
];
