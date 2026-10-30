import { FilePdf } from "@phosphor-icons/react/dist/ssr";
import { statSync } from "node:fs";
import GoogleMapsIcon from "@/components/GoogleMapsIcon";
import InstagramIcon from "@/components/InstagramIcon";
import PhoneIcon from "./PhoneIcon";
import Link from "next/link";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { SITE, type Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { PRODUCTS } from "@/lib/catalog";
import { href, telLink, waLink } from "@/lib/links";

const CATALOG_PDF = "/downloads/product-house-parts-catalog.pdf";
// File size shown next to the button; read at build time so it never goes stale.
const catalogMb = (() => {
  try {
    return (statSync(`public${CATALOG_PDF}`).size / 1e6).toFixed(1);
  } catch {
    return null;
  }
})();

// Brands the shop supplies for: [English, Arabic]. Decorative marquee only (aria-hidden); the Arabic is a transliteration of the brand name.
const BRANDS: [string, string][] = [
  ["Putzmeister", "بوتزمايستر"],
  ["Schwing", "شوينغ"],
  ["Zenith", "زينيث"],
  ["Atlas", "أطلس"],
  ["CIFA", "سيفا"],
  ["Sicoma", "سيكوما"],
  ["Vianova", "فيانوفا"],
  ["Parker", "باركر"],
  ["SKF", "إس كي إف"],
  ["NSK", "إن إس كي"],
  ["Hydac", "هايداك"],
  ["Rexroth", "ريكسروث"],
  ["Toyota", "تويوتا"],
  ["Komatsu", "كوماتسو"],
];

export default function Footer({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  const links = [
    [d.navCatalog, "/catalog/"],
    [d.navMachines, "/machines/"],
    [d.navAbout, "/about/"],
    [d.navContact, "/contact/"],
    [d.navQuote, "/quote/"],
  ] as const;
  const a = "rounded transition-colors duration-300 hover:text-brand";
  return (
    <footer className="relative isolate mt-10 overflow-hidden pb-28 md:pb-0">
      <div aria-hidden className="foot-orb foot-orb-a" />
      <div aria-hidden className="foot-orb foot-orb-b" />

      <div aria-hidden dir="ltr" className="overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="foot-track">
          {[...BRANDS, ...BRANDS].map(([en, ar], i) =>
            lang === "ar" ? (
              <span key={i} className="foot-word foot-ar" lang="ar" dir="rtl">
                {ar}
              </span>
            ) : (
              <span key={i} className="foot-word">
                {en}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="wrap pb-2 pt-3">
        <div className="dl-band">
          <div>
            <p className="h-display text-[1.375rem] leading-snug text-white">{d.dlTitle}</p>
            <p className="mt-1 max-w-xl text-[0.9375rem] text-white/85">{d.dlBody.replace("{n}", PRODUCTS.length.toLocaleString("en-US"))}</p>
          </div>
          <a href={CATALOG_PDF} download className="dl-btn" data-event="catalog-download">
            <FilePdf size={26} weight="duotone" aria-hidden />
            <span>
              {d.dlBtn}
              {catalogMb && <span className="t-num mt-0.5 block text-[0.75rem] font-normal text-steel">PDF · {catalogMb} MB</span>}
            </span>
          </a>
        </div>
      </div>

      <div className="wrap grid gap-8 py-6 md:grid-cols-[1.3fr_1fr_1fr] md:gap-10 md:py-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="surface grid size-11 shrink-0 place-items-center rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo-sm.webp" alt="" width={46} height={37} className="h-6 w-auto" />
            </span>
            <p className="h-display text-lg leading-snug text-ink">{lang === "ar" ? SITE.nameAr : SITE.nameEn}</p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-steel">{d.brandLine}</p>
          <div className="mt-5 grid max-w-sm grid-cols-2 gap-3 lg:gap-5">
            <a href={waLink(d.waGeneral)} target="_blank" rel="noopener noreferrer" className="btn btn-wa !min-h-11 !px-3 text-[0.95rem]">
              <WhatsAppIcon size={20} />
              {d.whatsappLbl}
            </a>
            <a href={telLink()} className="btn btn-line !min-h-11 !px-3 text-[0.95rem]">
              <PhoneIcon size={18} />
              {d.call}
            </a>
          </div>
        </div>

        <div className="text-sm text-steel">
          <p className="text-base text-ink">{d.footVisit}</p>
          <p className="mt-2 text-[0.8125rem] leading-relaxed">{SITE.address[lang]}</p>
          <p className="text-[0.8125rem] leading-relaxed text-steel/80">{SITE.hours[lang]}</p>
          <div className="mt-3 grid justify-items-start gap-2.5">
            <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className={`${a} inline-flex items-center gap-2 text-brand`}>
              <GoogleMapsIcon size={22} />
              {d.openMapShort}
            </a>
            <a href={`https://www.instagram.com/${SITE.instagram}`} target="_blank" rel="noopener noreferrer" className={`${a} inline-flex items-center gap-2 text-brand`}>
              <InstagramIcon size={22} />
              {d.igFollow}
            </a>
          </div>
        </div>

        <div className="text-sm text-steel">
          <p className="text-base text-ink">{d.footLinks}</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 md:grid-cols-1">
            {links.map(([t, p]) => (
              <li key={p}>
                <Link className={a} href={href(lang, p)} prefetch={false}>
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap flex flex-wrap justify-between gap-x-4 gap-y-1 pb-2 text-xs text-steel/80">
        <span>
          © {new Date().getFullYear()} {lang === "ar" ? SITE.nameAr : SITE.nameEn} {d.footerRights}
        </span>
        <span>
          {d.crLbl}: <bdi dir="ltr">{SITE.cr}</bdi> · {d.vatLbl}: <bdi dir="ltr">{SITE.vat}</bdi>
        </span>
      </div>

      <p className="wrap pb-2 text-xs text-steel">{d.brandsNote}</p>

      {/* Giant outline name, fading out at the bottom edge. Real text (not the logo image) so it stays sharp at any size. */}
      <div id="foot-brand" aria-hidden dir="ltr" className="wrap mt-6 overflow-hidden">
        <p className="foot-big text-center text-[clamp(2.2rem,11.2vw,9.25rem)]">PRODUCT HOUSE</p>
        <p className="foot-big mt-[0.12em] text-center text-[clamp(2.2rem,11.2vw,9.25rem)]">TRADING EST.</p>
      </div>
    </footer>
  );
}
