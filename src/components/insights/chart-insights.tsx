'use client';

import { DataInsightsPerDay, DataInsightsStatus } from '@/@types';
import { useAuth } from '@/context/auth-context';
import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Skeleton } from '../ui/skeleton';
import { ChartDataType, DonutChart } from '../charts/donut-chart';
import { ChartBar } from '../charts/bar-chart';

const dateIn = moment().startOf('month').format('YYYY-MM-DD');
const dateOut = moment().endOf('month').format('YYYY-MM-DD');

const initialDataSales = [] as DataInsightsPerDay[];
const initialDataStatus = {} as DataInsightsStatus;

export function ChartInsights() {
    const { session } = useAuth();
    const userId = session?.id;

    const getInsightsStatus = async () => {
        const response = await api.get(
            `insights/status/${userId}?dateIn=${dateIn}&dateOut=${dateOut}`
        );
        return response.data;
    };

    const getInsightsSales = async () => {
        const response = await api.get(
            `insights/per-day/${userId}?dateIn=${dateIn}&dateOut=${dateOut}`
        );
        console.log(response.data);
        return response.data.sales;
    };

    const { data: sales, isFetching: isFetchingSales } = useQuery<
        DataInsightsPerDay[]
    >({
        queryFn: getInsightsSales,
        queryKey: ['insights', 'sales', userId, dateIn, dateOut],
        enabled: !!userId,
        initialData: initialDataSales,
    });

    const { data: status, isFetching: isFetchingStatus } =
        useQuery<DataInsightsStatus>({
            queryFn: getInsightsStatus,
            queryKey: ['insights', 'status', userId, dateIn, dateOut],
            enabled: !!userId,
            initialData: initialDataStatus,
        });

    if (isFetchingSales || isFetchingStatus) {
        return (
            <div className="flex gap-4 w-full">
                <Skeleton className="w-[360px] h-64" />
                <Skeleton className="w-full h-64" />
            </div>
        );
    }

    const dataStatus: ChartDataType[] = [
        {
            status: 'Conectados',
            quantidade: status.connected,
            fill: 'var(--chart-1)',
        },
        {
            status: 'Pendentes',
            quantidade: status.pending,
            fill: 'var(--chart-2)',
        },
        {
            status: 'Cancelados',
            quantidade: status.cancelled,
            fill: 'var(--chart-3)',
        },
    ];

    return (
        <section className="flex gap-4 w-full">
            <DonutChart chartData={dataStatus} />
            <ChartBar data={sales} />
        </section>
    );
}
