import { Star } from "@phosphor-icons/react/dist/ssr";
import type { Lang } from "@/config/site";
import { REVIEWS, REVIEW_LINK } from "@/config/reviews";
import { DICT, fmt } from "@/i18n/dict";

const Stars = ({ n }: { n: number }) => (
  <span className="inline-flex gap-0.5 text-[#f5a623]" aria-hidden>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={18} weight={i <= n ? "fill" : "regular"} />
    ))}
  </span>
);

/** Real Google reviews, pasted in src/config/reviews.ts. Hidden until there is either a review or a review link. */
export default function Reviews({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  if (!REVIEWS.length && !REVIEW_LINK) return null;
  const avg = REVIEWS.length ? REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length : 0;
  return (
    <section className="wrap sec" aria-labelledby="rev-h">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="text-start">
          <h2 id="rev-h" className="h-display reveal text-[clamp(1.6rem,3.6vw,2.4rem)]">
            {d.reviewsTitle}
          </h2>
          {REVIEWS.length > 0 && (
            <p className="mt-2 flex items-center gap-2 text-[0.95rem] text-steel">
              <Stars n={Math.round(avg)} />
              <bdi dir="ltr" className="t-num text-ink">
                {avg.toFixed(1)}
              </bdi>
              <span>{fmt(d.reviewsCount, { n: REVIEWS.length })}</span>
            </p>
          )}
        </div>
        {REVIEW_LINK && (
          <a href={REVIEW_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-brand reveal">
            <Star size={20} weight="fill" aria-hidden />
            {d.reviewsCta}
          </a>
        )}
      </div>

      {REVIEWS.length > 0 ? (
        <ul className="mt-5 grid gap-3 md:grid-cols-3 lg:mt-7 lg:gap-6">
          {REVIEWS.map((r, i) => (
            <li key={`${r.author}-${r.date}`} className="surface reveal flex flex-col gap-3 rounded-[1.5rem] p-6 text-start sm:p-7" style={{ ["--d" as string]: i % 3 }}>
              <Stars n={r.rating} />
              <p className="text-[1rem] leading-relaxed" lang={r.lang} dir={r.lang === "ar" ? "rtl" : "ltr"}>
                {r.text}
              </p>
              <p className="mt-auto text-sm text-steel">
                <bdi dir="auto">{r.author}</bdi> · {d.reviewsSource}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="reveal mt-4 max-w-xl text-steel">{d.reviewsInvite}</p>
      )}
    </section>
  );
}
