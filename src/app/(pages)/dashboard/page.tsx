import { DailyOrder } from '@/components/data-order/daily-order';
import { ChartInsights } from '@/components/insights/chart-insights';
import Insights from '@/components/insights/insights';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function Dashboard() {
    return (
        <section className="p-4 space-y-5">
            <div className="flex gap-2 items-center mb-5">
                <Avatar className='w-10 h-10 border-2 border-primary'>
                    <AvatarFallback className='bg-foreground/20'>FL</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0">
                    <h1 className="text-xl text-muted-foreground font-semibold">
                        Olá, Fulano
                    </h1>
                    <h3 className='text-muted-foreground font-light text-xs'>
                        Dahsboard
                    </h3>
                </div>
            </div>
            <Insights />
            <section className="flex gap-4 w-full h-fit">
                <ChartInsights />
            </section>
            <DailyOrder/>
        </section>
    );
}
