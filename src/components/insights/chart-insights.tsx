'use client';

import { useAuth } from '@/context/auth-context';
import { getInsightStatus } from '@/data/get-insight-status';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '../ui/skeleton';
import { DonutChart } from '../charts/donut-chart';

export function ChartInsights() {
    const { session } = useAuth();
    const userId = session?.id;

    const { data, isPending } = useQuery({
        queryFn: async () => {
            const data = await getInsightStatus(userId);
            return data;
        },
        queryKey: ['insight-status'],
        enabled: !!userId,
    });

    const chartData = [
        {
            status: 'Conectados',
            quantidade: data?.connected || 0,
            fill: 'var(--chart-1)',
        },
        {
            status: 'Pendentes',
            quantidade: data?.pending || 0,
            fill: 'var(--chart-2)',
        },
        {
            status: 'Cancelados',
            quantidade: data?.cancelled || 0,
            fill: 'var(--chart-3)',
        },
    ];

    if (isPending) {
        return (
            <div className='flex gap-4 w-full'>
                <Skeleton className="w-[360px] h-[320px] bg-muted-foreground/40 rounded-lg" />
                <Skeleton className="w-full h-[320px] bg-muted-foreground/40 rounded-lg" />
            </div>
        );
    }

    return (
        <div className='flex gap-4 w-full'>
            <DonutChart chartData={chartData} />
        </div>
    );
}
