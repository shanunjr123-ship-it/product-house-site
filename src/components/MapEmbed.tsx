import { SITE, type Lang } from "@/config/site";

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`;

/** Google Maps embed (no API key needed). Lazy-loaded so it never slows the first paint. */
export default function MapEmbed({ lang, className = "" }: { lang: Lang; className?: string }) {
  const src = `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=17&hl=${lang}&output=embed`;
  return (
    <div className={`bezel ${className}`}>
      <div className="plate relative aspect-[4/3] w-full sm:aspect-[16/10]">
        <iframe
          src={src}
          title={lang === "ar" ? SITE.nameAr : SITE.nameEn}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    </div>
  );
}
