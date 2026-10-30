import { CategoryView, categoryMeta, categoryParams } from "@/views/Lists";
export const dynamicParams = false;
export const generateStaticParams = categoryParams;
type P = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: P) { return categoryMeta("ar", (await params).slug); }
export default async function Page({ params }: P) { return <CategoryView lang="ar" slug={(await params).slug} />; }
