import { ChartInsights } from '@/components/insights/chart-insights';
import { Insights } from '@/components/insights/insights';
import { Metadata } from 'next';
import { DailyOrder } from '@/components/data-order/daily-order';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function Dashboard() {
    return (
        <section className="p-4 space-y-5">
            <div className="flex flex-col gap-0">
                <h2 className="text-2xl font-semibold text-muted-foreground/90">
                    Dashboard
                </h2>
                <small className="text-xs font-light text-muted-foreground/60">
                    Gerencie suas métricas.
                </small>
            </div>
            <Insights />
            <ChartInsights />
            <DailyOrder />
        </section>
    );
}
