import { GuideView, guideMeta, guideSlugs } from "@/views/Guides";
export const dynamicParams = false;
export const generateStaticParams = guideSlugs;
type P = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: P) { return guideMeta("en", (await params).slug); }
export default async function Page({ params }: P) { return <GuideView lang="en" slug={(await params).slug} />; }
