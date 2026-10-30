import type { Viewport } from "next";
import Shell from "@/components/Shell";

export const viewport: Viewport = { viewportFit: "cover", themeColor: "#1c2b8e" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell lang="ar">{children}</Shell>;
}
