import { Camera } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import CatIcon from "@/components/CatIcon";
import ForkliftIcon from "@/components/ForkliftIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import type { Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { logoForTag } from "@/lib/brands";
import { label, type Named } from "@/lib/taxonomy";
import { href, waLink } from "@/lib/links";

type Counted = Named & { count: number };

/** Part category: icon and count on top, name below. Same height everywhere so the grid stays even. */
export function CatCard({ lang, c }: { lang: Lang; c: Counted }) {
  const d = DICT[lang];
  return (
    <Link href={href(lang, `/category/${c.slug}/`)} prefetch={false} className="card">
      <span className="flex items-start justify-between gap-2">
        <span className="tile-icon">
          <CatIcon slug={c.slug} />
        </span>
        <span className="t-num pt-1 text-sm text-steel">
          {c.count} {d.itemsWord}
        </span>
      </span>
      <span className="text-[1.0625rem] leading-snug">{label(c, lang)}</span>
    </Link>
  );
}

// No logo yet: show the name as a short wordmark, or the first letter for long names.
const mono = (en: string) => (en.length <= 7 ? en : en.slice(0, 1).toUpperCase());

/** Machine or brand: official logo on a white tile (initial letter if we have no logo) with the name below. Same shape as the category card. */
export function BrandCard({ lang, t }: { lang: Lang; t: Counted }) {
  const logo = logoForTag(t.slug);
  return (
    <Link href={href(lang, `/machines/${t.slug}/`)} prefetch={false} className="card">
      <span className="flex items-start">
        {t.slug === "forklift" ? (
          <span className="brand-tile" aria-hidden>
            <ForkliftIcon size={30} />
          </span>
        ) : logo ? (
          <span className="brand-tile" style={logo.tile ? { background: logo.tile } : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/brands/${logo.file}`} alt="" loading="lazy" />
          </span>
        ) : (
          <span className="brand-tile brand-tile-mono" aria-hidden>
            {mono(t.en)}
          </span>
        )}
      </span>
      <span className="text-[1.0625rem] font-medium leading-snug">{label(t, lang)}</span>
    </Link>
  );
}

/** "Can't find the part?" card: one text block, one button, aligned to the same edge. */
export function MissingCard({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  return (
    <div className="surface flex flex-col gap-4 rounded-[1.75rem] p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-7">
      <div className="flex items-start gap-3.5">
        <span className="tile-icon !size-11 shrink-0">
          <Camera size={22} aria-hidden />
        </span>
        <div>
          <p className="text-lg leading-snug">{d.missingTitle}</p>
          <p className="mt-0.5 text-[0.95rem] text-steel">{d.missingBody}</p>
        </div>
      </div>
      <a href={waLink(d.waPhoto)} target="_blank" rel="noopener noreferrer" className="btn btn-wa w-full sm:w-auto">
        <WhatsAppIcon size={22} />
        {d.askShort}
      </a>
    </div>
  );
}
