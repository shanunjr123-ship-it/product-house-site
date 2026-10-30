import WhatsAppIcon from "@/components/WhatsAppIcon";
import GoogleMapsIcon from "@/components/GoogleMapsIcon";
import InstagramIcon from "@/components/InstagramIcon";
import MapEmbed, { directionsUrl } from "@/components/MapEmbed";
import PhoneIcon from "@/components/PhoneIcon";
import { CatCard } from "@/components/Cards";
import QuoteList from "@/components/QuoteList";
import { SITE, type Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { categoryCounts } from "@/lib/catalog";
import { telLink, waLink } from "@/lib/links";
import { jsonLdScript, pageMeta, storeJsonLd, titled } from "@/lib/seo";
import { Crumbs } from "./Lists";

/* ---------- Quote ---------- */
export const quoteMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: "/quote/",
    title: titled(lang, lang === "ar" ? "طلب السعر" : "Price request"), // Price request
    description: DICT[lang].priceNote,
    noindex: true,
  });

export function QuoteView({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.quoteTitle }]} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{d.quoteTitle}</h1>
      <div className="mt-5">
        <QuoteList lang={lang} />
      </div>
    </div>
  );
}

/* ---------- About ---------- */
export const aboutMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: "/about/",
    title: titled(lang, lang === "ar" ? "من نحن" : "About us"), // About us
    description:
      lang === "ar"
        ? "مؤسسة بيت المنتج للتجارة في الرياض توفّر قطع غيار مضخات الخرسانة والخلاطات ومحطات الخلط. موزّع معتمد لبوتزمايستر." // Product House Trading Est. in Riyadh supplies spare parts for concrete pumps, mixers and batching plants. Authorised Putzmeister distributor.
        : "Product House Trading Est. supplies spare parts for concrete pumps, mixers and batching plants from Riyadh. Authorised Putzmeister distributor.",
  });

/** The About text, category links and storefront photo. Shown on /about/ and, on phones, under the Contact page (the phone tab bar has no About tab). */
function AboutBody({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
      <div className="reveal max-w-prose text-lg text-start">
        <p>{d.aboutBody}</p>
        <p className="mt-4 text-steel">{d.aboutWho}</p>
        <p className="mt-4 font-medium text-brand">{d.aboutAuth}</p>
        <p className="mt-1">{d.aboutDelivery}</p>
        <h2 className="h-display mt-8 text-[clamp(1.35rem,3vw,1.75rem)]">{d.aboutBrowse}</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 lg:gap-6">
          {categoryCounts()
            .filter((c) => c.slug !== "other")
            .slice(0, 8)
            .map((c) => (
              <li key={c.slug} className="grid">
                <CatCard lang={lang} c={c} />
              </li>
            ))}
        </ul>
      </div>
      <div className="bezel reveal self-start" style={{ ["--d" as string]: 2 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/storefront.webp" alt={lang === "ar" ? SITE.nameAr : SITE.nameEn} width={1400} height={939} className="plate aspect-[3/2] w-full object-cover" loading="lazy" />
      </div>
    </div>
  );
}

export function AboutView({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.aboutTitle }]} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{d.aboutTitle}</h1>
      <div className="mt-5">
        <AboutBody lang={lang} />
      </div>
    </div>
  );
}

/* ---------- Contact ---------- */
export const contactMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: "/contact/",
    title: titled(lang, lang === "ar" ? "تواصل معنا وموقعنا في الرياض" : "Contact & Location in Riyadh"), // Contact us and our location in Riyadh
    description:
      lang === "ar"
        ? `${SITE.nameAr}، ${SITE.address.ar}. واتساب وهاتف ${SITE.phoneDisplay}. ${SITE.hours.ar}.` // {name}, {address}. WhatsApp and phone {number}. {hours}.
        : `${SITE.nameEn}, ${SITE.address.en}. WhatsApp and phone ${SITE.phoneDisplay}. ${SITE.hours.en}.`,
  });

export function ContactView({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  const rows: [string, React.ReactNode][] = [
    [d.address, SITE.address[lang]],
    [d.hours, SITE.hours[lang]],
    [d.phone, <a key="p" href={telLink()} className="text-brand hover:underline"><bdi dir="ltr">{SITE.phoneDisplay}</bdi></a>],
    [d.emailLbl, <a key="e" href={`mailto:${SITE.email}`} className="text-brand hover:underline"><bdi dir="ltr">{SITE.email}</bdi></a>],
    [d.instagramLbl, <a key="i" href={`https://www.instagram.com/${SITE.instagram}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand hover:underline"><InstagramIcon size={22} />{d.igFollow}</a>],
  ];
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.contactTitle }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(storeJsonLd(lang))} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{d.contactTitle}</h1>
      <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <dl className="surface reveal overflow-hidden rounded-[1.5rem] text-start [overflow-wrap:anywhere]">
            {rows.map(([k, v]) => (
              <div key={k} className="row px-5 py-4">
                <dt className="text-sm text-steel">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="reveal mt-5 grid grid-cols-2 gap-4 lg:mt-7 lg:gap-5" style={{ ["--d" as string]: 1 }}>
            <a href={waLink(d.waGeneral)} target="_blank" rel="noopener noreferrer" className="btn btn-wa !px-3">
              <WhatsAppIcon size={22} />
              {d.whatsappLbl}
            </a>
            <a href={telLink()} className="btn btn-line !px-3">
              <PhoneIcon size={20} />
              {d.call}
            </a>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-brand col-span-2 !px-3">
              <GoogleMapsIcon size={26} />
              {d.directions}
            </a>
          </div>
        </div>
        <MapEmbed lang={lang} className="reveal self-start" />
      </div>
      {/* Phones have no About tab, so the About page content sits here too. */}
      <section aria-labelledby="about-h" className="mt-10 md:hidden">
        <h2 id="about-h" className="h-display text-[clamp(1.6rem,6vw,2.25rem)]">
          {d.aboutTitle}
        </h2>
        <div className="mt-4">
          <AboutBody lang={lang} />
        </div>
      </section>
    </div>
  );
}
