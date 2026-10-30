import { ProductView, productMeta, productParams } from "@/views/Product";
export const dynamicParams = false;
export const generateStaticParams = productParams;
type P = { params: Promise<{ code: string }> };
export async function generateMetadata({ params }: P) { return productMeta("ar", (await params).code); }
export default async function Page({ params }: P) { return <ProductView lang="ar" code={(await params).code} />; }
