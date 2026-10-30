"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePathname } from "next/navigation";

/**
 * Link to the home page that always lands on the very top (the hero).
 * On the home page it scrolls up in place; from other pages it navigates and
 * ScrollState resets the scroll once the new route has rendered.
 */
export default function HomeLink({ to, children, ...rest }: { to: string } & Omit<ComponentProps<typeof Link>, "href" | "scroll">) {
  const pathname = usePathname();
  return (
    <Link
      {...rest}
      href={to}
      scroll={false}
      onClick={(e) => {
        rest.onClick?.(e);
        if (e.defaultPrevented) return;
        const here = pathname.replace(/\/+$/, "") || "/";
        const dest = to.replace(/\/+$/, "") || "/";
        if (here === dest) {
          e.preventDefault();
          const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
          if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }}
    >
      {children}
    </Link>
  );
}
