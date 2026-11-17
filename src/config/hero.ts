// The scenes in the home-page hero: AI-generated backdrops (not photos of our own stock or fleet), built from reference photos of the machine types.
// Files live in public/img/hero (a -lg 2400x1340 and a -sm 1200x670 WebP each). The machine sits on the right of the frame, the left is empty sky.
// "pos" is where the 16:9 frame is anchored when the box is cropped on large screens. Labels and alt text describe the machine type, not a brand.

export type HeroImage = {
  id: string;
  lg: string;
  sm: string;
  wLg: number;
  hLg: number;
  wSm: number;
  pos: string;
  label: { ar: string; en: string };
  alt: { ar: string; en: string };
};

export const HERO_IMAGES: readonly HeroImage[] = [
  {
    id: "pump",
    lg: "/img/hero/hero-pump-lg.webp",
    sm: "/img/hero/hero-pump-sm.webp",
    wLg: 2400,
    hLg: 1340,
    wSm: 1200,
    pos: "0% 50%",
    label: { ar: "مضخات الخرسانة", en: "Concrete pumps" }, // Concrete pumps
    alt: { ar: "مضخة خرسانة بذراع ممدودة على شاحنة بجانب مبنى قيد الإنشاء", en: "Truck-mounted concrete boom pump with its boom extended beside a building under construction" },
  },
  {
    id: "plant",
    lg: "/img/hero/hero-plant-lg.webp",
    sm: "/img/hero/hero-plant-sm.webp",
    wLg: 2400,
    hLg: 1340,
    wSm: 1200,
    pos: "100% 50%",
    label: { ar: "محطات الخلط والخلاطات", en: "Batching plants and mixers" }, // Batching plants and mixers
    alt: { ar: "محطة خلط خرسانة وشاحنتا خلاطة بيضاوان", en: "Concrete batching plant with two white mixer trucks" },
  },
];
