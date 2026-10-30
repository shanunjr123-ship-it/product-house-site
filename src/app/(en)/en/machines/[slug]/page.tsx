import { MachineView, machineMeta, machineParams } from "@/views/Lists";
export const dynamicParams = false;
export const generateStaticParams = machineParams;
type P = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: P) { return machineMeta("en", (await params).slug); }
export default async function Page({ params }: P) { return <MachineView lang="en" slug={(await params).slug} />; }
