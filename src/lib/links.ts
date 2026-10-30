import { SITE, type Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";

/** Arabic lives at the site root, English under /en. Every path ends with a slash. */
export const href = (lang: Lang, path = "/") => {
  const p = path.startsWith("/") ? path : `/${path}`;
  return lang === "ar" ? p : p === "/" ? "/en/" : `/en${p}`;
};
export const abs = (lang: Lang, path = "/") => `${SITE.url}${href(lang, path)}`;
export const productPath = (code: string) => `/product/${code}/`;

export const waLink = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
export const telLink = () => `tel:+${SITE.whatsapp}`;

export type QuoteLine = { code: string; name: string; qty: number };

export function partMessage(lang: Lang, code: string, name: string) {
  const d = DICT[lang];
  return `${d.waGreetOne}\n${code} — ${name}`;
}

export function quoteMessage(
  lang: Lang,
  lines: QuoteLine[],
  who: { name?: string; company?: string; city?: string; notes?: string },
) {
  const d = DICT[lang];
  const body = lines.map((l, i) => `${i + 1}) ${l.code} — ${l.name} × ${l.qty}`).join("\n");
  const extra = [
    who.name && `${d.fName}: ${who.name}`,
    who.company && `${d.fCompany}: ${who.company}`,
    who.city && `${d.fCity}: ${who.city}`,
    who.notes && `${d.fNotes}: ${who.notes}`,
  ].filter(Boolean);
  return [d.waGreetMany, body, ...(extra.length ? ["", ...extra] : [])].join("\n");
}
