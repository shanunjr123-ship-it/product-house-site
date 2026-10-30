/**
 * Official brand logos for the home-page strip, in /public/brands.
 * Order = marquee order: concrete-pump makers first, then mixer and plant makers, then component makers.
 * Sources: each brand's own website where it could be reached (Zoomlion, Everdigm, Atlas, Sicoma, Teka),
 * Wikimedia Commons for the rest. Anniversary badges were trimmed off Teka and Sicoma.
 * `tile` = background colour for logos that ship white-on-colour or with their own colour block.
 * `big` = tall mark that needs less padding to match the visual weight of the wide wordmarks.
 * Zenith, FAG, Koyo, Junjin, OLI: see EXTRA_LOGOS below (cards only). Not in the strip (no usable official logo file yet): Sermac, QGM, ASA Hydraulik.
 */
export const BRAND_LOGOS = [
  { file: "putzmeister.svg", en: "Putzmeister", ar: "بوتزمايستر", big: true },
  { file: "schwing.svg", en: "Schwing", ar: "شوينج" },
  { file: "cifa.webp", en: "CIFA", ar: "سيفا" },
  { file: "sany.svg", en: "Sany", ar: "ساني" },
  { file: "zoomlion.svg", en: "Zoomlion", ar: "زومليون", tile: "#a4ce4e" },
  { file: "everdigm.webp", en: "Everdigm", ar: "إيفرديجم" },
  { file: "sicoma.webp", en: "Sicoma", ar: "سيكوما" },
  { file: "teka.webp", en: "Teka", ar: "تيكا" },
  { file: "atlas.svg", en: "Atlas Cranes & Excavators", ar: "أطلس للرافعات والحفّارات", tile: "#df5f32" },
  { file: "rexroth.svg", en: "Rexroth", ar: "ريكسروث" },
  { file: "hydac.svg", en: "Hydac", ar: "هيداك" },
  { file: "parker.svg", en: "Parker", ar: "باركر" },
  { file: "danfoss.svg", en: "Danfoss (Sauer-Danfoss)", ar: "دانفوس (ساور دانفوس)" },
  { file: "bosch.svg", en: "Bosch", ar: "بوش" },
  { file: "siemens.svg", en: "Siemens", ar: "سيمنس" },
  { file: "schneider.svg", en: "Schneider Electric", ar: "شنايدر إلكتريك" },
  { file: "mennekes.svg", en: "Mennekes", ar: "مينيكس" },
] as { file: string; en: string; ar: string; tile?: string; big?: boolean }[];

/** Logo for a machine or brand tag, if we have an official one. Logo file names match the tag slugs. */
// Logos for machine/brand cards that are not in the home-page marquee. Official SVGs from Wikimedia Commons.
const EXTRA_LOGOS = [
  { file: "toyota.svg", slug: "toyota" },
  { file: "mitsubishi.svg", slug: "mitsubishi" },
  { file: "doosan.svg", slug: "doosan" },
  { file: "caterpillar.svg", slug: "caterpillar" },
  { file: "skf.svg", slug: "skf" },
  { file: "nsk.svg", slug: "nsk" },
  { file: "zenith.webp", slug: "zenith" }, // from zenithbrickmachine.com (ZENITH half of the QGM | ZENITH header logo)
  { file: "fag.webp", slug: "fag" }, // from the Schaeffler web shop (FAG_logo.png)
  { file: "koyo.webp", slug: "koyo" }, // supplied by the owner (banner cropped, background removed)
  { file: "junjin.webp", slug: "junjin" }, // supplied by the owner
  { file: "oli.webp", slug: "oli" }, // supplied by the owner
];

export const logoForTag = (slug: string): { file: string; tile?: string } | undefined =>
  BRAND_LOGOS.find((b) => b.file.replace(/\.\w+$/, "") === slug) ?? EXTRA_LOGOS.find((b) => b.slug === slug);

/**
 * Machine makers (OEMs): the brands a customer names when asked "which machine do you have?".
 * Component makers (bearings, hydraulics, electrics, vibrators) are NOT here: they are parts brands, not machines.
 * The home-page "Start with your machine" grid shows only slugs in this set that also have a logo.
 */
const MACHINE_OEMS = new Set([
  "putzmeister", "schwing", "cifa", "sany", "zoomlion", "everdigm", "junjin", "sicoma", "zenith", "atlas",
  "vianova", "toyota", "mitsubishi", "komatsu", "doosan", "caterpillar", "isuzu",
]);
export const isMachineOem = (slug: string) => MACHINE_OEMS.has(slug);
