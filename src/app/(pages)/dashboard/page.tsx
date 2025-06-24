import { ChartInsights } from '@/components/insights/chart-insights';
import { Insights } from '@/components/insights/insights';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function Dashboard() {
    return (
        <section className="p-4 space-y-5">
            <h2 className="text-xl font-bold text-muted-foreground">
                Dashboard
            </h2>
            <Insights />
            <ChartInsights />
        </section>
    );
}
