import { MachinesIndexView, machinesMeta } from "@/views/Lists";
export const metadata = machinesMeta("en");
export default function Page() { return <MachinesIndexView lang="en" />; }
