import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Lets the site be added to a phone's home screen with the PH icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "مؤسسة بيت المنتج للتجارة", // Product House Trading Est.
    short_name: "بيت المنتج للتجارة", // Product House Trading
    lang: "ar",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1c2b8e",
    icons: [
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
