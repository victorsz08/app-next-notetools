import Insights from "@/components/insights/insights";
import { Metadata } from "next"


export const metadata: Metadata = {
    title: "Dashboard",
};

export default function Dashboard() {
    return (
        <section className="p-4 space-y-5">
            <h1 className="text-xl text-muted-foreground font-semibold">Dashboard</h1>
            <Insights/>
        </section>
    )
} 