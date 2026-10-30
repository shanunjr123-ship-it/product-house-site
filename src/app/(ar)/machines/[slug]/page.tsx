import { MachineView, machineMeta, machineParams } from "@/views/Lists";
export const dynamicParams = false;
export const generateStaticParams = machineParams;
type P = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: P) { return machineMeta("ar", (await params).slug); }
export default async function Page({ params }: P) { return <MachineView lang="ar" slug={(await params).slug} />; }
