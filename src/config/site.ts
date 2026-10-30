// Every business fact on the site lives here. Items marked CONFIRM were taken from
// the client's own posters / Google profile and have not been confirmed with them.

export const SITE = {
  // Replace with the real domain once it is bought (set NEXT_PUBLIC_SITE_URL in Cloudflare Pages).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://product-house.pages.dev",

  nameAr: "مؤسسة بيت المنتج للتجارة", // Product House Trading Est.
  nameEn: "Product House Trading Est.",

  // Confirmed by the owner (Oct 2026).
  whatsapp: "966592112782",
  phoneDisplay: "+966 59 211 2782",
  phoneLocal: "059 211 2782",
  email: "sales@producthousetrading.com", // CONFIRM: that domain is already registered by someone.
  instagram: "product_house_trading_est",
  mapUrl: "https://maps.app.goo.gl/76URraF3QemUgAk8A",
  geo: { lat: 24.6288804, lng: 46.7597082 }, // from the Google Maps listing

  // Street address as given by the site owner (Oct 30 2026). CONFIRM against the shop's signboard / commercial registration.
  address: {
    ar: "طريق الخرج، المنطقة الصناعية، حي الخالدية، الرياض", // Al Kharj Road, Industrial Area, Al Khalidiyyah district, Riyadh
    en: "Al Kharj Road, Industrial Area, Al Khalidiyyah, Riyadh",
  },
  hours: {
    ar: "من 8 صباحًا إلى 7 مساءً، الجمعة إجازة", // 8 AM to 7 PM, closed Friday
    en: "8 AM to 7 PM, closed Friday",
  },
  vat: "310703724100003", // VAT registration certificate (ZATCA), effective 2021-09-01
  cr: "1010380995", // commercial registration, as printed on the same certificate
} as const;

export const LANGS = ["ar", "en"] as const;
export type Lang = (typeof LANGS)[number];
