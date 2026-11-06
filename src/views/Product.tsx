import WhatsAppIcon from "@/components/WhatsAppIcon";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import PhoneIcon from "@/components/PhoneIcon";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddButton from "@/components/AddButton";
import PartIcon from "@/components/PartIcon";
import { type Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { PRODUCTS, byCode, catBySlug, hasTagPage, label, pname, similar, tagBySlug } from "@/lib/catalog";
import { abs, href, partMessage, productPath, telLink, waLink } from "@/lib/links";
import { SITE } from "@/config/site";
import { BRAND, jsonLdScript, pageMeta } from "@/lib/seo";
import { Crumbs } from "./Lists";

export const productParams = () => PRODUCTS.map((p) => ({ code: p.code }));

/** Cut at a word boundary so a snippet never ends mid-word. */
const clip = (t: string, max: number) => {
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 80)).replace(/[\s,.;:،-]+$/, "")}…`;
};

/** Meta description: name and part number first, then what it is, then the price line. Aims for 110 to 155 characters. */
function snippet(lang: Lang, name: string, code: string, desc: string, ask: string) {
  const from = lang === "ar" ? "من بيت المنتج في الرياض." : "From Product House, Riyadh."; // From Product House in Riyadh.
  const kind = lang === "ar" ? "قطع غيار مضخات الخرسانة والخلاطات." : "Concrete pump and mixer spare parts."; // Concrete pump and mixer spare parts.
  let s = `${name} (${code}). ${desc} ${ask}`;
  if (s.length < 110) s = `${s} ${from}`;
  if (s.length < 105) s = `${s} ${kind}`;
  return clip(s, 155);
}

export function productMeta(lang: Lang, code: string) {
  const p = byCode(code);
  if (!p) notFound();
  const c = catBySlug(p.cat);
  const name = pname(p, lang);
  const desc = (lang === "ar" ? p.descAr : p.descEn) ?? "";
  const ask = lang === "ar" ? "السعر عند الطلب عبر واتساب." : "Price on request via WhatsApp."; // Price on request via WhatsApp.
  return pageMeta({
    lang,
    path: productPath(code),
    title: `${name} (${p.code}) | ${BRAND[lang]}`,
    description:
      (desc && snippet(lang, name, p.code, desc, ask)) ||
      (lang === "ar"
        ? `${name}، رقم القطعة ${p.code}، من قسم ${label(c, lang)}. اطلب السعر والتوفر عبر واتساب.`
        : `${name}, part number ${p.code}, in ${label(c, lang)}. Ask for price and availability on WhatsApp.`),
    // Thin pages (no photo and no description) stay out of Google until they have real content.
    noindex: !p.indexable,
    image: p.image ?? undefined,
    imageSize: p.image && p.iw && p.ih ? { w: p.iw, h: p.ih } : undefined,
    imageAlt: name,
  });
}

export function ProductView({ lang, code }: { lang: Lang; code: string }) {
  const d = DICT[lang];
  const p = byCode(code);
  if (!p) notFound();
  const c = catBySlug(p.cat);
  const name = pname(p, lang);
  const desc = lang === "ar" ? p.descAr : p.descEn;
  const tags = p.tags.map((t) => tagBySlug(t)).filter(Boolean);
  const rel = similar(p);

  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.navCatalog, path: "/catalog/" }, { name: label(c, lang), path: `/category/${p.cat}/` }, { name: p.code }]} />

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div className="bezel rise self-start">
          {p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            // Shown at its own pixel size (never stretched), centred on white, until better photos arrive.
            <div className="plate grid min-h-[16rem] place-items-center bg-white p-4 sm:min-h-[22rem]">
              <img src={p.image} alt={name} width={p.iw ?? 600} height={p.ih ?? 600} className="h-auto max-w-full" />
            </div>
          ) : (
            <div className="plate grid min-h-[20rem] place-items-center bg-[radial-gradient(24rem_18rem_at_80%_0%,rgba(59,86,230,0.16),transparent_60%),linear-gradient(160deg,#fff,#eef1f8)] px-6 py-9 text-center lg:min-h-[28rem]">
              <div className="flex max-w-[22rem] flex-col items-center">
                <span className="grid size-24 place-items-center rounded-[1.75rem] bg-white text-brand ring-1 ring-inset ring-brand/10">
                  <PartIcon name={p.name} cat={p.cat} size={48} />
                </span>
                <p className="h-display mt-5 text-xl">{d.photoOnReq}</p>
                <p className="mt-1.5 text-[0.95rem] text-steel">{d.photoOnReqBody}</p>
                <a href={waLink(partMessage(lang, p.code, name))} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-5 !min-h-11 !px-4 text-[0.95rem]">
                  <WhatsAppIcon size={20} className="text-[#25D366]" />
                  {d.askPartPhoto}
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="rise" style={{ ["--d" as string]: 1 }}>
          <bdi dir="ltr" className="t-num inline-block rounded-lg bg-brand/[0.08] px-3 py-1 text-sm font-medium text-brand">
            {p.code}
          </bdi>
          <h1 className="h-display mt-3 text-[clamp(1.7rem,4vw,2.8rem)]">
            <bdi dir="auto">{name}</bdi>
          </h1>
          {desc && <p className="mt-3 max-w-prose text-lg text-steel">{desc}</p>}

          <dl className="surface mt-5 overflow-hidden lg:mt-7 rounded-[1.5rem] text-start">
            <div className="row px-5 py-4">
              <dt className="text-sm text-steel">{d.category}</dt>
              <dd>
                <Link className="text-brand hover:underline" href={href(lang, `/category/${p.cat}/`)}>
                  {label(c, lang)}
                </Link>
              </dd>
            </div>
            {p.ref && (
              <div className="row px-5 py-4">
                <dt className="text-sm text-steel">{d.refNo}</dt>
                <dd>
                  <bdi dir="ltr" className="t-num">
                    {p.ref}
                  </bdi>
                </dd>
              </div>
            )}
            {tags.length > 0 && (
              <div className="row px-5 py-4">
                <dt className="text-sm text-steel">{d.machineBrand}</dt>
                <dd className="flex flex-wrap gap-x-4">
                  {tags.map((t) =>
                    hasTagPage(t!.slug) ? (
                      <Link key={t!.slug} className="text-brand hover:underline" href={href(lang, `/machines/${t!.slug}/`)}>
                        {label(t, lang)}
                      </Link>
                    ) : (
                      <span key={t!.slug}>{label(t, lang)}</span>
                    ),
                  )}
                </dd>
              </div>
            )}
          </dl>

          <div className="surface reveal mt-3 rounded-[1.5rem] p-5 sm:p-7 lg:mt-7">
            <p className="h-display text-xl">{d.priceOnRequest}</p>
            <p className="mt-0.5 text-[0.95rem] text-steel">{d.priceNote}</p>
            <a href={waLink(partMessage(lang, p.code, name))} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-4 w-full !min-h-14 text-[1.0625rem]">
              <WhatsAppIcon size={24} />
              {d.askWhatsapp}
            </a>
            <div className="mt-3 grid grid-cols-2 gap-3 lg:mt-5 lg:gap-5">
              <AddButton lang={lang} code={p.code} name={p.name} nameAr={p.nameAr ?? ""} full />
              <a href={telLink()} className="btn btn-line !px-3">
                <PhoneIcon size={20} />
                {d.call}
              </a>
            </div>
          </div>
        </div>
      </div>

      {rel.length > 0 && (
        <section className="sec">
          <h2 className="h-display reveal text-[clamp(1.5rem,3.4vw,2.2rem)]">{d.similar}</h2>
          <div className="bezel reveal mt-4">
            <ul className="plate grid sm:grid-cols-2">
              {rel.map((r) => (
                <li key={r.code} className="row">
                  <a href={href(lang, productPath(r.code))} className="flex items-center gap-3 px-4 py-3 text-start transition-colors duration-300 hover:bg-brand/[0.04] hover:text-brand">
                    <span className="min-w-0 flex-1">
                      <bdi dir="ltr" className="t-num block text-sm font-medium text-brand">
                        {r.code}
                      </bdi>
                      <span className="block leading-snug">
                        <bdi dir="auto">{pname(r, lang)}</bdi>
                      </span>
                    </span>
                    <CaretRight size={18} aria-hidden className="shrink-0 text-steel rtl:-scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {p.indexable && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript({
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": `${abs(lang, productPath(p.code))}#product`,
            url: abs(lang, productPath(p.code)),
            name,
            sku: p.code,
            mpn: p.ref ?? undefined,
            image: p.image ? `${SITE.url}${p.image}` : undefined,
            description: desc ?? undefined,
            category: label(c, lang),
            inLanguage: lang,
            isAccessoryOrSparePartFor: tags.length ? tags.map((t) => ({ "@type": "Product", name: label(t, lang) })) : undefined,
            // No price, brand or availability is declared: none of them is published on the site yet.
          })}
        />
      )}
    </div>
  );
}
