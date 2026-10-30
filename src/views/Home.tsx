import WhatsAppIcon from "@/components/WhatsAppIcon";
import { CalendarCheck, ChatCircleText, Check, Package, UsersThree } from "@phosphor-icons/react/dist/ssr";
import MapEmbed, { directionsUrl } from "@/components/MapEmbed";
import PhoneIcon from "@/components/PhoneIcon";
import Link from "next/link";
import { BrandCard, CatCard, MissingCard } from "@/components/Cards";
import HowToOrder from "@/components/HowToOrder";
import PumpDiagram from "@/components/PumpDiagram";
import SearchBox from "@/components/SearchBox";
import GoogleMapsIcon from "@/components/GoogleMapsIcon";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import StatsOdometer from "@/components/StatsOdometer";
import { STATS } from "@/config/stats";
import { SITE, type Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { BRAND_LOGOS, isMachineOem, logoForTag } from "@/lib/brands";
import { PRODUCTS, categoryCounts, label, tagCounts } from "@/lib/catalog";
import { href, telLink, waLink } from "@/lib/links";
import { jsonLdScript, pageMeta, storeJsonLd, websiteJsonLd } from "@/lib/seo";

export const homeMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: "/",
    title:
      lang === "ar"
        ? "مورّد قطع غيار مضخات الخرسانة والخلاطات في الرياض | مؤسسة بيت المنتج للتجارة" // Supplier of concrete pump and mixer spare parts in Riyadh | Product House
        : "Concrete Pump & Mixer Spare Parts in Riyadh | Product House Trading Est.",
    description:
      lang === "ar"
        ? "قطع غيار مضخات الخرسانة والخلاطات ومحطات الخلط في الرياض. موزّع معتمد لبوتزمايستر. أرسل رقم القطعة أو صورتها على واتساب ويصلك السعر." // Spare parts for concrete pumps, mixers and batching plants in Riyadh. Authorised Putzmeister distributor. Send the part number or a photo on WhatsApp and get the price.
        : "Concrete pump, mixer and batching plant spare parts in Riyadh. Authorised Putzmeister distributor. Send a part number or photo on WhatsApp for a price.",
  });

function SectionHead({ title, to, lang }: { title: string; to: string; lang: Lang }) {
  const d = DICT[lang];
  return (
    <div className="reveal flex items-end justify-between gap-4">
      <h2 className="h-display text-[clamp(1.6rem,3.6vw,2.4rem)]">{title}</h2>
      <Link href={href(lang, to)} prefetch={false} className="link-arrow shrink-0 pb-1 text-base text-brand">
        {d.viewAll}
      </Link>
    </div>
  );
}

export default function Home({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  const cats = categoryCounts();
  const tags = tagCounts();
  const examples = [PRODUCTS[0]?.code ?? "", ...cats.filter((c) => c.slug !== "other").slice(0, 3).map((c) => label(c, lang))].filter((x) => x && x.length <= 16);
  const trust = [d.trustAuth, d.trustDelivery, d.trustShop];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(storeJsonLd(lang))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd(lang))} />

      {/* Hero: copy, search and two direct actions on the left; a tappable pump diagram on the right (below on phones). */}
      <section className="relative isolate overflow-hidden pt-6 sm:pt-10 lg:pt-14">
        <div className="wrap relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
          <div className="min-w-0">
          <h1 className="h-display rise text-[clamp(2.15rem,6.4vw,3.9rem)] text-brand-deep lg:text-[clamp(2.7rem,4.1vw,3.9rem)]">{d.homeTitle}</h1>
          <p className="rise mt-5 max-w-xl text-lg font-light text-steel sm:text-xl lg:text-[1.375rem] lg:leading-snug" style={{ ["--d" as string]: 1 }}>
            {d.homeSub}
          </p>

          <div className="rise mt-8 max-w-2xl" style={{ ["--d" as string]: 2 }}>
            <SearchBox lang={lang} examples={examples} />
            <div className="mt-6 grid gap-5 sm:grid-cols-[1.5fr_1fr]">
              <a href={waLink(d.waPhoto)} target="_blank" rel="noopener noreferrer" className="hero-btn btn-wa">
                <WhatsAppIcon size={26} />
                {d.sendPhotoShort}
              </a>
              <a href={telLink()} className="hero-btn hero-call">
                <PhoneIcon size={24} />
                {d.call}
              </a>
            </div>
          </div>

          <ul className="rise mt-8 grid gap-3.5" style={{ ["--d" as string]: 3 }}>
            {trust.map((t) => (
              <li key={t} className="h-display flex items-center gap-3.5 text-[clamp(1.15rem,2.6vw,1.4rem)] leading-snug text-ink">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-wa/15 text-wa">
                  <Check size={17} weight="bold" aria-hidden />
                </span>
                {t}
              </li>
            ))}
          </ul>
          </div>
          <div className="rise min-w-0" style={{ ["--d" as string]: 2 }}>
            <PumpDiagram
              parts={cats.map((c) => ({
                slug: c.slug,
                name: label(c, lang),
                count: c.count,
                href: href(lang, `/category/${c.slug}/`),
                thumbs: PRODUCTS.filter((p) => p.cat === c.slug && p.image).slice(0, 2).map((p) => p.image as string),
              }))}
              rtl={lang === "ar"}
              itemsWord={d.itemsWord}
              browse={d.browse}
              hint={d.pumpHint}
              alt={d.pumpAlt}
            />
          </div>
        </div>
      </section>

      {/* Brand marquee: official brand logos. Names stay in the page as a text list for screen readers and search engines. */}
      <section aria-label={d.brandsLbl} className="pb-2 pt-10 sm:pt-14">
        <div aria-hidden dir="ltr" className="overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="brand-track">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((b, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <span key={i} className={b.big ? "brand-cell brand-cell-big" : "brand-cell"} style={b.tile ? { background: b.tile } : undefined}>
                <img src={`/brands/${b.file}`} alt="" loading="lazy" />
              </span>
            ))}
          </div>
        </div>
        <ul className="sr-only">
          {BRAND_LOGOS.map((b) => (
            <li key={b.file}>{lang === "ar" ? b.ar : b.en}</li>
          ))}
        </ul>
      </section>

      {/* Part categories */}
      <section className="wrap sec">
        <SectionHead title={d.catsTitle} to="/catalog/" lang={lang} />
        <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:mt-7 lg:grid-cols-4 lg:gap-6">
          {cats.map((c, i) => (
            <li key={c.slug} className="reveal" style={{ ["--d" as string]: i % 4 }}>
              <CatCard lang={lang} c={c} />
            </li>
          ))}
        </ul>
      </section>

      {/* Machines and brands */}
      <section className="wrap sec">
        <SectionHead title={d.machinesTitle} to="/machines/" lang={lang} />
        <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:mt-7 lg:grid-cols-4 lg:gap-6">
          {tags.filter((t) => isMachineOem(t.slug) && logoForTag(t.slug)).slice(0, 12).map((t, i) => (
            <li key={t.slug} className="reveal" style={{ ["--d" as string]: i % 4 }}>
              <BrandCard lang={lang} t={t} />
            </li>
          ))}
        </ul>
      </section>

      {/* Stats: rolling-digit card. Values come from src/config/stats.ts (most are still placeholders). */}
      <section className="wrap sec" aria-labelledby="stats-h">
        <div className="stats-card surface reveal">
          <div className="max-w-2xl text-start">
            <h2 id="stats-h" className="h-display text-[clamp(1.6rem,3.6vw,2.4rem)]">
              {d.statsTitle}
            </h2>
            <p className="mt-2 text-[0.95rem] text-steel">{d.statsSub}</p>
          </div>
          <div className="mt-7">
            <StatsOdometer
              items={STATS.map((s) => ({
                id: s.key,
                value: s.value ?? PRODUCTS.length,
                prefix: s.prefix,
                suffix: s.suffix,
                label: { years: d.statYears, parts: d.statParts, customers: d.statCustomers, reply: d.statReply }[s.key],
                icon: { years: <CalendarCheck size={22} aria-hidden />, parts: <Package size={22} aria-hidden />, customers: <UsersThree size={22} aria-hidden />, reply: <ChatCircleText size={22} aria-hidden /> }[s.key],
              }))}
            />
          </div>
        </div>
      </section>

      <HowToOrder lang={lang} />

      <Reviews lang={lang} />
      <Faq lang={lang} />

      {/* Visit */}
      <section className="wrap sec grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-10">
        <MapEmbed lang={lang} className="reveal" />
        <div className="reveal" style={{ ["--d" as string]: 2 }}>
          <h2 className="h-display text-[clamp(1.6rem,3.6vw,2.4rem)]">{d.visitTitle}</h2>
          <p className="mt-3 text-[0.9375rem]">{SITE.address[lang]}</p>
          <p className="text-sm text-steel">{SITE.hours[lang]}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:flex sm:gap-5">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-brand !px-4">
              <GoogleMapsIcon size={26} />
              {d.directions}
            </a>
            <a href={telLink()} className="btn btn-line !px-4">
              <PhoneIcon size={18} />
              <bdi dir="ltr">{SITE.phoneLocal}</bdi>
            </a>
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <div className="reveal">
          <MissingCard lang={lang} />
        </div>
      </section>
    </>
  );
}
