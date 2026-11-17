import type { ReactNode } from "react";
import type { Photo } from "@/config/photos";
import type { Lang } from "@/config/site";

// Shared pieces for the product and machine photos: the <img>, the page-header layout and the photo strip. Photos are plain <img> tags (the site is a static export without next/image).

/** One photo with a 400 / 720 px (or 560 / 1120 px) srcset. Width and height are set, so the page does not jump while it loads. */
export function Pic({ p, lang, sizes, className, eager = false }: { p: Photo; lang: Lang; sizes: string; className?: string; eager?: boolean }) {
  const two = p.sm !== p.lg;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={two ? p.sm : p.lg}
      srcSet={two ? `${p.sm} ${p.wSm}w, ${p.lg} ${p.wLg}w` : undefined}
      sizes={two ? sizes : undefined}
      width={p.wLg}
      height={p.hLg}
      alt={p.alt[lang]}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}

/**
 * Page header with a photo. Phones: text, then the photo. Large screens: text on the left (right in Arabic)
 * and a 22 rem photo on the other side, vertically centred. Without a photo the text is rendered as it was.
 */
export function PageHead({ children, figure }: { children: ReactNode; figure?: ReactNode }) {
  if (!figure) return <>{children}</>;
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-10">
      <div>{children}</div>
      {figure}
    </div>
  );
}

/** Header photo in a double bezel (same frame as the storefront photo). `ratio` is the crop of the plate. */
export function HeadFigure({
  p,
  lang,
  caption,
  ratio = "4/3",
  desktopOnly = false,
}: {
  p: Photo;
  lang: Lang;
  caption?: string;
  ratio?: "4/3" | "16/10";
  desktopOnly?: boolean;
}) {
  return (
    <figure className={`mt-5 text-start lg:mt-0 ${desktopOnly ? "hidden lg:block" : ""}`}>
      <div className="bezel">
        <div className="plate">
          <Pic p={p} lang={lang} sizes="(min-width: 1024px) 352px, 92vw" className={`block w-full object-cover ${ratio === "16/10" ? "aspect-[16/10]" : "aspect-[4/3]"}`} />
        </div>
      </div>
      {caption && <figcaption className="mt-2 text-xs text-steel">{caption}</figcaption>}
    </figure>
  );
}

/**
 * Row of extra photos under a category header. Phones: swipeable row (the cover is the first photo there, because the
 * header photo is hidden on phones). Large screens: wrapped row of fixed-width tiles.
 */
export function PhotoStrip({ lang, cover, more }: { lang: Lang; cover?: Photo; more: Photo[] }) {
  const items = [...(cover ? [{ p: cover, phoneOnly: true }] : []), ...more.map((p) => ({ p, phoneOnly: false }))];
  if (items.length === 0) return null;
  return (
    <ul className={`mt-6 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] snap-x snap-mandatory lg:flex-wrap lg:overflow-visible ${more.length === 0 ? "lg:hidden" : ""}`}>
      {items.map(({ p, phoneOnly }) => (
        <li key={p.id} className={`w-44 shrink-0 snap-start lg:w-[13.5rem] ${phoneOnly ? "lg:hidden" : ""}`}>
          <div className="overflow-hidden rounded-[1.1rem] bg-white ring-1 ring-[color:var(--color-line)]">
            <Pic p={p} lang={lang} sizes="(min-width: 1024px) 216px, 176px" className="block h-auto w-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}
