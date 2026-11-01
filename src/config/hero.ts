// The four machine photos in the home-page hero. Files live in public/img/hero (a -lg and a -sm WebP each).
// "contain" = white-background product shot shown whole; "cover" = full photo cropped to the frame.
// Captions and alt text describe the machine type only, not a brand, so no claim is made that is not confirmed.

export type HeroImage = {
  id: string;
  fit: "contain" | "cover";
  lg: string;
  sm: string;
  wLg: number;
  hLg: number;
  wSm: number;
  label: { ar: string; en: string };
};

export const HERO_IMAGES: readonly HeroImage[] = [
  {
    id: "pump",
    fit: "contain",
    lg: "/img/hero/pump-lg.webp",
    sm: "/img/hero/pump-sm.webp",
    wLg: 724,
    hLg: 280,
    wSm: 480,
    label: { ar: "مضخة خرسانة على شاحنة", en: "Truck-mounted concrete pump" }, // Truck-mounted concrete pump
  },
  {
    id: "crane",
    fit: "cover",
    lg: "/img/hero/crane-lg.webp",
    sm: "/img/hero/crane-sm.webp",
    wLg: 1024,
    hLg: 768,
    wSm: 640,
    label: { ar: "رافعة على شاحنة", en: "Truck-mounted crane" }, // Truck-mounted crane
  },
  {
    id: "block",
    fit: "contain",
    lg: "/img/hero/block-lg.webp",
    sm: "/img/hero/block-sm.webp",
    wLg: 366,
    hLg: 311,
    wSm: 366,
    label: { ar: "ماكينة صناعة البلوك", en: "Block-making machine" }, // Concrete block-making machine
  },
  {
    id: "mixer",
    fit: "cover",
    lg: "/img/hero/mixer-lg.webp",
    sm: "/img/hero/mixer-sm.webp",
    wLg: 1200,
    hLg: 800,
    wSm: 640,
    label: { ar: "شاحنة خلاطة خرسانة", en: "Concrete mixer truck" }, // Concrete mixer truck
  },
];
