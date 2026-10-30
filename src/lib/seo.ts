import type { Metadata } from "next";
import { SITE, type Lang } from "@/config/site";
import { abs } from "@/lib/links";

/** Short brand for page titles: the full legal name is kept for the home page and structured data. */
export const BRAND = { ar: "بيت المنتج", en: "Product House" } as const; // Product House
export const titled = (lang: Lang, page: string) => `${page} | ${BRAND[lang]}`;

const ID = { business: `${SITE.url}/#business`, site: `${SITE.url}/#website` };

export function pageMeta(o: {
  lang: Lang;
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  /** Path of a photo on this site. Without one, the shared brand card is used. */
  image?: string;
  imageSize?: { w: number; h: number };
  imageAlt?: string;
}): Metadata {
  const url = abs(o.lang, o.path);
  const own = !!o.image;
  const img = `${SITE.url}${o.image ?? "/img/og.jpg"}`;
  const size = own ? o.imageSize : { w: 1200, h: 630 };
  const name = o.lang === "ar" ? SITE.nameAr : SITE.nameEn;
  return {
    metadataBase: new URL(SITE.url),
    title: { absolute: o.title },
    description: o.description,
    alternates: {
      canonical: url,
      languages: { ar: abs("ar", o.path), en: abs("en", o.path), "x-default": abs("ar", o.path) },
    },
    robots: o.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url,
      title: o.title,
      description: o.description,
      siteName: name,
      locale: o.lang === "ar" ? "ar_SA" : "en_US",
      alternateLocale: o.lang === "ar" ? ["en_US"] : ["ar_SA"],
      images: [{ url: img, ...(size ? { width: size.w, height: size.h } : {}), alt: o.imageAlt ?? name }],
    },
    twitter: { card: own ? "summary" : "summary_large_image", title: o.title, description: o.description, images: [img] },
  };
}

const FACTS = {
  ar: {
    desc: "مورّد قطع غيار مضخات الخرسانة والخلاطات ومحطات الخلط في الرياض، السعودية.", // Supplier of spare parts for concrete pumps, mixers and batching plants in Riyadh, Saudi Arabia.
    known: ["قطع غيار مضخات الخرسانة", "قطع غيار الخلاطات", "قطع غيار محطات الخلط", "بوتزمايستر", "شوينغ", "زينيث", "سَني", "سيفا"],
  },
  en: {
    desc: "Supplier of spare parts for concrete pumps, mixers and batching plants in Riyadh, Saudi Arabia.",
    known: ["Concrete pump spare parts", "Concrete mixer spare parts", "Batching plant spare parts", "Putzmeister", "Schwing", "Zenith", "Sany", "CIFA"],
  },
} as const;

export function storeJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": ["Store", "LocalBusiness"],
    "@id": ID.business,
    name: lang === "ar" ? SITE.nameAr : SITE.nameEn,
    alternateName: lang === "ar" ? SITE.nameEn : SITE.nameAr,
    url: abs(lang, "/"),
    description: FACTS[lang].desc,
    image: `${SITE.url}/img/storefront.webp`,
    logo: `${SITE.url}/img/logo.png`,
    telephone: `+${SITE.whatsapp}`,
    vatID: SITE.vat,
    taxID: SITE.vat,
    identifier: { "@type": "PropertyValue", name: lang === "ar" ? "السجل التجاري" : "Commercial registration", value: SITE.cr }, // Commercial registration
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: lang === "ar" ? "المبيعات" : "sales", // sales
        telephone: `+${SITE.whatsapp}`,
        areaServed: "SA",
        availableLanguage: ["Arabic", "English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Kharj Road, Industrial Area, Al Khalidiyyah",
      addressLocality: "Riyadh",
      addressRegion: "Riyadh",
      addressCountry: "SA",
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.mapUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "19:00",
      },
    ],
    sameAs: [`https://www.instagram.com/${SITE.instagram}`],
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    knowsAbout: FACTS[lang].known,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: lang === "ar" ? "كتالوج قطع الغيار" : "Spare parts catalog", // Spare parts catalog
      url: abs(lang, "/catalog/"),
    },
    // The site publishes no email until the owner confirms one, so none is declared here.
  };
}

/** Declares the site itself, with the on-site part search, so search engines and assistants can use it. */
export function websiteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ID.site,
    url: abs(lang, "/"),
    name: lang === "ar" ? SITE.nameAr : SITE.nameEn,
    inLanguage: lang,
    publisher: { "@id": ID.business },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${abs(lang, "/catalog/")}?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

/** A category / brand / catalog page: a named collection with its first parts listed. */
export function collectionJsonLd(o: { lang: Lang; path: string; name: string; description: string; items: { name: string; path: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: o.name,
    description: o.description,
    url: abs(o.lang, o.path),
    inLanguage: o.lang,
    isPartOf: { "@id": ID.site },
    about: { "@id": ID.business },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: o.items.length,
      itemListElement: o.items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(o.lang, it.path) })),
    },
  };
}

export const breadcrumbJsonLd = (items: { name: string; url?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  // The current page (last item) carries no URL, as Google's breadcrumb guidelines allow.
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, ...(it.url ? { item: it.url } : {}) })),
});

export const jsonLdScript = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
