"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { href } from "@/lib/links";

/** Hero search. While empty and idle it cycles through real examples (a part number, then categories). */
export default function SearchBox({ lang, examples = [] }: { lang: Lang; examples?: string[] }) {
  const d = DICT[lang];
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (examples.length < 2 || q || focus) return;
    const t = setInterval(() => setI((n) => (n + 1) % examples.length), 2600);
    return () => clearInterval(t);
  }, [examples.length, q, focus]);

  const showHint = !q && !focus && examples.length > 0;
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`${href(lang, "/catalog/")}${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
      }}
      className="search-shell flex w-full items-center gap-2 rounded-full p-1.5 sm:ps-7"
    >
      <label className="relative flex min-w-0 flex-1 items-center">
        <span className="sr-only">{d.searchPlaceholder}</span>
        <MagnifyingGlass aria-hidden size={22} className="pointer-events-none ms-3 shrink-0 text-steel sm:hidden" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={showHint ? "" : d.searchPlaceholder}
          autoComplete="off"
          enterKeyHint="search"
          className="h-[3.25rem] min-w-0 flex-1 bg-transparent ps-2 pe-2 text-lg text-ink outline-none placeholder:text-steel sm:ps-0 sm:text-xl"
        />
        {showHint && (
          <span aria-hidden className="pointer-events-none absolute inset-y-0 start-10 end-1 flex items-center gap-2 overflow-hidden whitespace-nowrap text-lg text-steel sm:start-0 sm:text-xl">
            <span>{d.searchTry}</span>
            <bdi key={i} dir="auto" className="ph-swap text-ink">
              {examples[i]}
            </bdi>
          </span>
        )}
      </label>
      <button type="submit" aria-label={d.searchBtn} className="go-btn">
        <MagnifyingGlass size={24} weight="bold" aria-hidden className="max-sm:hidden" />
        <span className="sm:hidden">{d.searchBtn}</span>
      </button>
    </form>
  );
}
