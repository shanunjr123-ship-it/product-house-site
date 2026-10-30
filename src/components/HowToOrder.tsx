import { DICT } from "@/i18n/dict";
import type { Lang } from "@/config/site";
import { PRODUCTS, pname } from "@/lib/catalog";

// Parts shown in the request-list mock-up: real catalogue items (with photos) from three different categories.
const SAMPLE = ["201010-010", "201010-011", "201010-056"];

/** Step 1: a phone camera framing the label on a part. Modern 9:19.5 body, thin bezel, dynamic island. Always drawn left-to-right. */
function PhoneVisual({ label }: { label: string }) {
  return (
    <div dir="ltr" role="img" aria-label={label} className="how-phone">
      <div className="how-screen">
        <svg viewBox="0 0 100 228" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
          <defs>
            <linearGradient id="hw-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a4266" />
              <stop offset="1" stopColor="#10152c" />
            </linearGradient>
            <linearGradient id="hw-metal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#6d7aa6" />
              <stop offset=".35" stopColor="#e9edfb" />
              <stop offset=".6" stopColor="#aab4da" />
              <stop offset="1" stopColor="#59658f" />
            </linearGradient>
            <linearGradient id="hw-vig" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity=".5" />
              <stop offset=".25" stopColor="#000" stopOpacity="0" />
              <stop offset=".72" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity=".6" />
            </linearGradient>
          </defs>
          <rect width="100" height="228" fill="url(#hw-bg)" />
          {/* the part: a steel body with a paper label stuck on it */}
          <rect x="-4" y="80" width="108" height="72" rx="10" fill="url(#hw-metal)" />
          <rect x="-4" y="80" width="108" height="8" rx="4" fill="#fff" opacity=".35" />
          <g transform="rotate(-3 50 115)">
            <rect x="17" y="97" width="66" height="37" rx="2.5" fill="#fff" />
            <rect x="17" y="97" width="66" height="7" rx="2.5" fill="#e0222b" />
            <text x="22" y="102.4" fontSize="4.4" fontWeight="700" fill="#fff" fontFamily="sans-serif">
              P/N
            </text>
            <text x="22" y="114" fontSize="7.4" fontWeight="700" fill="#0b1230" fontFamily="sans-serif">
              {SAMPLE[0]}
            </text>
            {Array.from({ length: 22 }, (_, i) => (
              <rect key={i} x={22 + i * 2.5} y="118" width={i % 3 === 0 ? 1.7 : 0.9} height="10" fill="#0b1230" />
            ))}
          </g>
          <rect width="100" height="228" fill="url(#hw-vig)" />
          {/* viewfinder: corners lock on, a scan line sweeps the label */}
          <g className="how-brk" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 104V92H23M88 92H77M88 92V104M12 129V141H23M88 141H77M88 141V129" />
          </g>
          <rect className="how-scan" x="14" y="94" width="72" height="1.6" rx=".8" fill="#7fa0ff" />
          <rect className="how-flash" width="100" height="228" fill="#fff" />
        </svg>
        <span className="how-notch" />
        <span className="how-shutter" />
        <span className="how-gal" />
        <span className="how-home" />
      </div>
    </div>
  );
}

/** Step 2: a multi-item price-request list; rows slide in and tick one after another. */
function ListVisual({ lang, label }: { lang: Lang; label: string }) {
  const d = DICT[lang];
  const rows = SAMPLE.map((c) => PRODUCTS.find((p) => p.code === c)).filter(Boolean) as (typeof PRODUCTS)[number][];
  return (
    <div role="img" aria-label={label} className="how-list">
      <div className="flex items-center justify-between gap-2 px-3 pb-2 pt-2.5">
        <span className="text-[0.8125rem] font-semibold text-ink">{d.navQuote}</span>
        <span className="how-count t-num">3</span>
      </div>
      <ul className="m-0 grid list-none grid-cols-[minmax(0,1fr)] gap-0 p-0">
        {rows.map((p, i) => (
          <li key={p.code} className="how-row flex items-center gap-2 border-t border-[color:var(--color-line)] px-3 py-1.5" style={{ ["--i" as string]: i }}>
            <span className="how-box">
              <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path className="how-tick" d="M2.5 6.4l2.4 2.4 4.6-5" pathLength={1} />
              </svg>
            </span>
            {p.image && (
              <span className="hidden size-7 shrink-0 overflow-hidden rounded-md bg-white ring-1 ring-[color:var(--color-line)] lg:grid lg:place-items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt="" width={28} height={28} loading="lazy" className="size-full object-contain" />
              </span>
            )}
            <span className="min-w-0 flex-1 truncate text-[0.75rem] leading-tight text-ink">{pname(p, lang)}</span>
            <span dir="ltr" className="t-num shrink-0 rounded-full bg-[color:var(--color-paper)] px-1.5 text-[0.6875rem] text-steel">×{i === 0 ? 4 : i === 1 ? 1 : 2}</span>
          </li>
        ))}
      </ul>
      <div className="px-3 pb-3 pt-2">
        <span className="how-send">{d.howSend}</span>
      </div>
    </div>
  );
}

/** Step 3: the WhatsApp reply with the quote. Your message goes out, "typing" dots, then the reply lands and the ticks turn blue. */
function ChatVisual({ lang, label }: { lang: Lang; label: string }) {
  const d = DICT[lang];
  return (
    <div role="img" aria-label={label} className="how-chat">
      <div className="how-chat-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo.png" alt="" width={46} height={37} className="size-6 rounded-full bg-white object-contain p-0.5" />
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[0.75rem] font-semibold text-white">{lang === "ar" ? "بيت المنتج" : "Product House"}</span>
          <span className="block text-[0.625rem] text-white/80">{lang === "ar" ? "متصل" : "online"}</span>
        </span>
      </div>
      <div className="grid gap-1.5 p-2.5">
        <div className="how-out ms-auto">
          {d.howAsk}
          <span className="how-time t-num">09:41</span>
          <b className="how-dt" aria-hidden>
            ✓✓
          </b>
        </div>
        <div className="relative">
          <div className="how-typing" aria-hidden>
            <i />
            <i />
            <i />
          </div>
          <div className="how-in">
            <span className="block text-[0.8125rem] font-semibold text-ink">{d.howQuoteReady}</span>
            <span className="mt-1.5 grid gap-1" aria-hidden>
              {[72, 58, 66].map((w, i) => (
                <span key={i} className="flex items-center justify-between gap-2">
                  <span className="h-1.5 rounded-full bg-[color:var(--color-line)]" style={{ width: `${w}%` }} />
                  <span className="how-price" />
                </span>
              ))}
            </span>
            <span className="mt-2 flex items-center gap-1 text-[0.6875rem] font-medium text-[color:var(--color-wa)]">
              <svg viewBox="0 0 16 16" className="how-ok size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="8" r="6.5" />
                <path d="M5 8.2l2 2 4-4.4" />
              </svg>
              {d.howPriceOk}
            </span>
            <span className="mt-1 block text-[0.6875rem] text-steel">{d.howReply}</span>
            <span className="how-time t-num">09:41</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowToOrder({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  const steps = [
    { t: d.step1, s: d.step1d, v: <PhoneVisual label={d.howVis1} /> },
    { t: d.step2, s: d.step2d, v: <ListVisual lang={lang} label={d.howVis2} /> },
    { t: d.step3, s: d.step3d, v: <ChatVisual lang={lang} label={d.howVis3} /> },
  ];
  return (
    <section className="wrap sec">
      <h2 className="h-display reveal text-[clamp(1.6rem,3.6vw,2.4rem)]">{d.howTitle}</h2>
      <ol className="how reveal mt-5 grid grid-cols-1 items-stretch gap-3 md:grid-cols-3 md:gap-4 lg:mt-7 lg:gap-6">
        {steps.map((st, i) => (
          <li key={st.t} className={`how-step surface flex flex-col rounded-[1.5rem] p-4 sm:p-5 how-s${i + 1}`}>
            <div className="how-vis">{st.v}</div>
            <span className="mt-4 flex items-center gap-2.5">
              <span aria-hidden className="t-num grid size-6 shrink-0 place-items-center rounded-full text-[0.75rem] text-steel ring-1 ring-[color:var(--color-line)]">
                {i + 1}
              </span>
              <span className="block text-lg leading-snug">{st.t}</span>
            </span>
            <span className="mt-1 block text-[0.95rem] text-steel">{st.s}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
