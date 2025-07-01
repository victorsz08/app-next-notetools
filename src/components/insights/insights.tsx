'use client';

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { api } from '@/lib/axios';
import { DataInsights } from '@/@types';
import { Skeleton } from '../ui/skeleton';
import { HandCoins, Handshake, Percent } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { toast } from 'sonner';

type CardInsightProps = {
    title: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
};

export function CardInsight({ title, children, icon }: CardInsightProps) {
    return (
        <Card className="w-full shadow-none">
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm font-light tracking-tight text-muted-foreground/80">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <span className="text-2xl font-inter tracking-tighter font-bold text-muted-foreground">
                    {children}
                </span>
            </CardContent>
        </Card>
    );
}

const dateIn = moment().startOf('month').format('YYYY-MM-DD');
const dateOut = moment().endOf('month').format('YYYY-MM-DD');

const initialData: DataInsights = {} as DataInsights;

export function Insights() {
    const { session } = useAuth();
    const userId = session?.id;

    const getInsights = async () => {
        const response = await api.get(
            `insights/${userId}?dateIn=${dateIn}&dateOut=${dateOut}`
        );

        if (response.status !== 200) {
            toast.error('Erro ao carregar os seus relatórios!');
        }

        return response.data;
    };

    const { data, isFetching } = useQuery<DataInsights>({
        queryFn: getInsights,
        queryKey: ['insights'],
        enabled: !!userId,
        initialData,
        refetchOnWindowFocus: false,
    });

    if (isFetching) {
        return (
            <div className="flex gap-4 w-full">
                <Skeleton className="w-full h-32 bg-muted-foreground/40 rounded-lg" />
                <Skeleton className="w-full h-32 bg-muted-foreground/40 rounded-lg" />
                <Skeleton className="w-full h-32 bg-muted-foreground/40 rounded-lg" />
            </div>
        );
    }

    return (
        <section className="flex gap-4">
            <CardInsight
                title="Faturamento"
                icon={
                    <span className="p-2 w-fit rounded-sm bg-blue-200 text-blue-700">
                        <HandCoins className="w-5 h-5" />
                    </span>
                }
            >
                {formatCurrency(data.revenue)}
            </CardInsight>
            <CardInsight
                title="Vendas"
                icon={
                    <span className="p-2 w-fit rounded-sm bg-orange-200 text-orange-700">
                        <Handshake className="w-5 h-5" />
                    </span>
                }
            >
                {data.sales}
            </CardInsight>
            <CardInsight
                title="Percentual de instalação"
                icon={
                    <span className="p-2 w-fit rounded-sm bg-green-200 text-green-700">
                        <Percent className="w-5 h-5" />
                    </span>
                }
            >
                {formatPercentage(data.completionRate)}
            </CardInsight>
        </section>
    );
}
