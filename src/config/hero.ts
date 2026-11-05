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
  /** Longer description for screen readers and search engines; falls back to the label. */
  alt?: { ar: string; en: string };
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
    fit: "contain",
    lg: "/img/hero/crane-lg.webp",
    sm: "/img/hero/crane-sm.webp",
    wLg: 958,
    hLg: 565,
    wSm: 560,
    label: { ar: "رافعة على شاحنة", en: "Truck-mounted crane" }, // Truck-mounted crane
    alt: { ar: "رافعة أطلس 250CS مركّبة على شاحنة", en: "Atlas 250CS truck-mounted crane" }, // Atlas 250CS crane mounted on a truck
  },
  {
    id: "crane2",
    fit: "contain",
    lg: "/img/hero/crane2-lg.webp",
    sm: "/img/hero/crane2-sm.webp",
    wLg: 1000,
    hLg: 789,
    wSm: 560,
    label: { ar: "الرافعة عن قرب", en: "Crane close-up" }, // The crane up close
    alt: { ar: "رافعة أطلس 250CS عن قرب", en: "Atlas 250CS crane boom and mounting, close-up" }, // Atlas 250CS crane up close
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
