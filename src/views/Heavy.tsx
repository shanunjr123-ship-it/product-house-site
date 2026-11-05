import Link from "next/link";
import { BrandCard, CatCard, MissingCard } from "@/components/Cards";
import type { Lang } from "@/config/site";
import { PRODUCTS, byTag, categoryCounts, tagBySlug, tagCounts } from "@/lib/catalog";
import { isMachineOem } from "@/lib/brands";
import { href } from "@/lib/links";
import { collectionJsonLd, jsonLdScript, pageMeta, titled } from "@/lib/seo";
import { Crumbs } from "./Lists";

// Landing page for the broad search "heavy equipment spare parts" (قطع غيار معدات ثقيلة, about 1,000 searches a month in Saudi Arabia).
// It names only what the catalogue really holds, so visitors looking for other machines can tell at a glance.

const PATH = "/heavy-equipment-parts/";

export const heavyMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: PATH,
    title: titled(lang, lang === "ar" ? "قطع غيار معدات ثقيلة في الرياض" : "Heavy Equipment Spare Parts in Riyadh"), // Heavy equipment spare parts in Riyadh
    description:
      lang === "ar"
        ? "قطع غيار معدات ثقيلة في الرياض: مضخات الخرسانة والخلاطات ومحطات الخلط ورافعات أطلس والرافعات الشوكية. محامل وأختام وفلاتر وصمامات. السعر عند الطلب عبر واتساب." // Heavy equipment spare parts in Riyadh: concrete pumps, mixers, batching plants, Atlas cranes and forklifts. Bearings, seals, filters and valves. Price on request via WhatsApp.
        : "Heavy equipment spare parts in Riyadh: concrete pumps, mixers, batching plants, Atlas cranes and forklifts. Bearings, seals, filters and valves. Price on request via WhatsApp.",
  });

const n = (x: number, lang: Lang) => x.toLocaleString(lang === "ar" ? "ar-SA-u-nu-latn" : "en-US");

export function HeavyView({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const cats = categoryCounts().filter((c) => c.slug !== "other");
  const brands = tagCounts().filter((t) => isMachineOem(t.slug));
  const atlas = byTag("atlas").length;
  const forklift = byTag("forklift").length;
  const pumpBrands = ["putzmeister", "schwing", "cifa", "sany", "zoomlion", "zenith"].map((s) => tagBySlug(s)?.[lang]).filter(Boolean) as string[];
  const pumpList = pumpBrands.join(ar ? "، " : ", ");

  const h1 = ar ? "قطع غيار معدات ثقيلة في الرياض" : "Heavy equipment spare parts in Riyadh"; // Heavy equipment spare parts in Riyadh
  const intro = ar
    ? `تورّد مؤسسة بيت المنتج للتجارة من الرياض ${n(PRODUCTS.length, lang)} قطعة غيار لمعدات الخرسانة والمعدات الثقيلة: مضخات الخرسانة، شاحنات الخلاطات، محطات الخلط، الرافعات المركّبة على الشاحنات (أطلس) والرافعات الشوكية. موزّع معتمد لبوتزمايستر. أرسل رقم القطعة أو صورتها على واتساب ويصلك السعر.` // Product House Trading Est. supplies N spare parts for concrete and heavy equipment from Riyadh: concrete pumps, truck mixers, batching plants, truck-mounted cranes (Atlas) and forklifts. Authorised Putzmeister distributor. Send the part number or a photo on WhatsApp and get the price.
    : `Product House Trading Est. supplies ${n(PRODUCTS.length, lang)} spare parts for concrete and heavy equipment from Riyadh: concrete pumps, truck mixers, batching plants, truck-mounted cranes (Atlas) and forklifts. Authorised Putzmeister distributor. Send the part number or a photo on WhatsApp for the price.`;

  const covered: { name: string; note: string; to?: string }[] = ar
    ? [
        { name: "مضخات الخرسانة", note: `${pumpList} وغيرها.` }, // Concrete pumps: Putzmeister, Schwing, Cifa, Sany, Zoomlion and others.
        { name: "شاحنات الخلاطات ومحطات الخلط", note: "خلاطات ومحركات وجيربوكسات وصمامات هوائية." }, // Truck mixers and batching plants: mixers, motors, gearboxes, pneumatic valves.
        { name: "رافعات أطلس المركّبة على الشاحنات", note: `${n(atlas, lang)} قطعة: أطقم سيلات وصمامات وفلاتر.`, to: "/machines/atlas/" }, // Atlas truck-mounted cranes: N parts: seal kits, valves, filters.
        { name: "الرافعات الشوكية", note: `${n(forklift, lang)} قطعة.`, to: "/machines/forklift/" }, // Forklifts: N parts.
        { name: "قطع هيدروليك عامة", note: "محامل وأختام وفلاتر ووصلات وخراطيم تناسب أكثر من علامة." }, // General hydraulic parts: bearings, seals, filters, couplings and hoses that fit more than one make.
      ]
    : [
        { name: "Concrete pumps", note: `${pumpList} and others.` },
        { name: "Truck mixers and batching plants", note: "Mixers, motors, gearboxes and pneumatic valves." },
        { name: "Atlas truck-mounted cranes", note: `${n(atlas, lang)} parts: seal kits, valves and filters.`, to: "/machines/atlas/" },
        { name: "Forklifts", note: `${n(forklift, lang)} parts.`, to: "/machines/forklift/" },
        { name: "General hydraulic parts", note: "Bearings, seals, filters, couplings and hoses that fit more than one make." },
      ];

  const items = [...covered.map((c) => ({ name: c.name, path: c.to ?? "/catalog/" })), ...brands.slice(0, 12).map((t) => ({ name: t[lang], path: `/machines/${t.slug}/` }))];

  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: h1 }]} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{h1}</h1>
      <p className="rise mt-3 max-w-[66ch] text-lg text-steel" style={{ ["--d" as string]: 2 }}>
        {intro}
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(collectionJsonLd({ lang, path: PATH, name: h1, description: intro, items }))}
      />

      <section className="mt-8" aria-labelledby="hv-cover">
        <h2 id="hv-cover" className="h-display text-[clamp(1.5rem,3.4vw,2.2rem)]">
          {ar ? "الآلات التي نوفّر لها قطع الغيار" : "Machines we supply parts for"}
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:gap-4">
          {covered.map((c) => (
            <li key={c.name} className="surface rounded-[1.25rem] px-5 py-4 text-start">
              <p className="text-lg font-medium">
                {c.to ? (
                  <Link href={href(lang, c.to)} className="text-brand hover:underline">
                    {c.name}
                  </Link>
                ) : (
                  c.name
                )}
              </p>
              <p className="mt-0.5 text-[0.95rem] text-steel">{c.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-[66ch] text-[0.95rem] text-steel">
          {ar
            ? "لا نغطي كل المعدات الثقيلة. إذا كانت آلتك غير مذكورة، أرسل صورة القطعة أو رقمها على واتساب ونخبرك إن كانت متوفرة." // We do not cover all heavy equipment. If your machine is not listed, send a photo or the part number on WhatsApp and we will tell you if it is available.
            : "We do not cover all heavy equipment. If your machine is not listed, send a photo or the part number on WhatsApp and we will tell you if we can supply it."}
        </p>
      </section>

      <section className="mt-10" aria-labelledby="hv-brands">
        <h2 id="hv-brands" className="h-display text-[clamp(1.5rem,3.4vw,2.2rem)]">
          {ar ? "قطع الغيار حسب العلامة" : "Parts by brand"}
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {brands.map((t) => (
            <li key={t.slug}>
              <BrandCard lang={lang} t={t} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="hv-cats">
        <h2 id="hv-cats" className="h-display text-[clamp(1.5rem,3.4vw,2.2rem)]">
          {ar ? "أنواع القطع" : "Part types"}
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {cats.map((c) => (
            <li key={c.slug}>
              <CatCard lang={lang} c={c} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <MissingCard lang={lang} />
      </section>
      <p className="mt-4 text-sm text-steel">
        <Link href={href(lang, "/catalog/")} className="text-brand hover:underline">
          {ar ? "تصفّح الكتالوج الكامل" : "Browse the full catalogue"}
        </Link>
      </p>
    </div>
  );
}
