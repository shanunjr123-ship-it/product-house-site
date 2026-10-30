import type { NextConfig } from "next";

// Static export: the whole site is plain files, hosted free on Cloudflare Pages.
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Lets a phone on the same Wi-Fi load the dev server's scripts (otherwise the page never becomes interactive).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local"],
  // One data file per page instead of one per route segment: keeps the export well under Cloudflare's 20,000-file limit.
  experimental: { prefetchInlining: true, globalNotFound: true },
};

export default config;
