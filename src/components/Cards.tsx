import { Camera, ListMagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import CatIcon from "@/components/CatIcon";
import ForkliftIcon from "@/components/ForkliftIcon";
import { Pic } from "@/components/PhotoBits";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { catCover, MACHINE_PHOTO, photo } from "@/config/photos";
import type { Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { logoForTag } from "@/lib/brands";
import { label, type Named } from "@/lib/taxonomy";
import { href, waLink } from "@/lib/links";

type Counted = Named & { count: number };

const CAT_SIZES = "(min-width: 1024px) 270px, (min-width: 768px) 30vw, 46vw";

/** Part category: photo on a white plate (same 4:3 crop on every card), name and count below. Falls back to the icon card when a category has no photo. */
export function CatCard({ lang, c, sizes = CAT_SIZES }: { lang: Lang; c: Counted; sizes?: string }) {
  const d = DICT[lang];
  const ph = catCover(c.slug);
  if (!ph) {
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
  return (
    <Link href={href(lang, `/category/${c.slug}/`)} prefetch={false} className="card photo-card">
      <span className="photo-card-img">
        <Pic p={ph} lang={lang} sizes={sizes} />
      </span>
      <span className="photo-card-body">
        <span className="text-[1.0625rem] font-medium leading-snug">{label(c, lang)}</span>
        <span className="t-num text-sm text-steel">
          {c.count} {d.itemsWord}
        </span>
      </span>
    </Link>
  );
}

/** Last tile of a category grid, so the final row is full. "wa" asks for a part on WhatsApp; "catalog" opens the full catalogue. */
export function CtaTile({ lang, kind, total }: { lang: Lang; kind: "wa" | "catalog"; total?: number }) {
  const d = DICT[lang];
  const ar = lang === "ar";
  if (kind === "wa") {
    return (
      <a href={waLink(d.waPhoto)} target="_blank" rel="noopener noreferrer" className="card">
        <span className="tile-icon !size-11 shrink-0">
          <Camera size={22} aria-hidden />
        </span>
        <span className="grid gap-1">
          <span className="text-[1.0625rem] font-medium leading-snug">{d.missingTitle}</span>
          <span className="text-sm leading-snug text-steel max-sm:hidden">{d.missingBody}</span>
        </span>
        <span className="btn btn-wa w-full !px-3">
          <WhatsAppIcon size={20} />
          {d.askShort}
        </span>
      </a>
    );
  }
  return (
    <Link href={href(lang, "/catalog/")} prefetch={false} className="card">
      <span className="tile-icon !size-11 shrink-0">
        <ListMagnifyingGlass size={22} aria-hidden />
      </span>
      <span className="grid gap-1">
        <span className="text-[1.0625rem] font-medium leading-snug">{ar ? "تصفّح الكتالوج الكامل" : "Browse the full catalogue"}</span> {/* Browse the full catalogue */}
        <span className="t-num text-sm text-steel">
          {total?.toLocaleString(ar ? "ar-SA-u-nu-latn" : "en-US")} {ar ? "قطعة، ابحث بالاسم أو الرقم." : "parts. Search by name or part number."} {/* parts. Search by name or part number. */}
        </span>
      </span>
    </Link>
  );
}

/** A machine we supply parts for: photo (16:10) with the name and a one-line note. Always a link, so the page passes weight to the page it names. */
export function MachinePhotoCard({ lang, photoId, name, note, to }: { lang: Lang; photoId: string; name: string; note: string; to: string }) {
  const ph = photo(photoId);
  return (
    <Link href={href(lang, to)} prefetch={false} className="card photo-card photo-card-wide">
      {ph && (
        <span className="photo-card-img">
          <Pic p={ph} lang={lang} sizes="(min-width: 768px) 45vw, 92vw" />
        </span>
      )}
      <span className="photo-card-body">
        <span className="text-[1.0625rem] font-medium leading-snug">{name}</span>
        <span className="text-sm leading-snug text-steel">{note}</span>
      </span>
    </Link>
  );
}

// No logo yet: show the name as a short wordmark, or the first letter for long names.
const mono = (en: string) => (en.length <= 7 ? en : en.slice(0, 1).toUpperCase());

/** Machine or brand: official logo on a white tile (initial letter if we have no logo) with the name below. Same shape as the category card. */
export function BrandCard({ lang, t }: { lang: Lang; t: Counted }) {
  const logo = logoForTag(t.slug);
  const forkliftPhoto = photo(MACHINE_PHOTO.forklift);
  return (
    <Link href={href(lang, `/machines/${t.slug}/`)} prefetch={false} className="card">
      <span className="flex items-start">
        {t.slug === "forklift" ? (
          <span className="brand-tile brand-tile-photo" aria-hidden>
            {forkliftPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={forkliftPhoto.sm} alt="" width={forkliftPhoto.wSm} height={forkliftPhoto.hSm} loading="lazy" />
            ) : (
              <ForkliftIcon size={30} />
            )}
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
