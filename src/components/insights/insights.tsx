'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { getInsights } from '@/data/get-insights';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

type Insights = {
    revenue: number;
    sales: number;
    completionRate: number;
};

export default function Insights() {
    const { session } = useAuth();
    const userId = session?.id;

    const { data, isPending } = useQuery({
        queryFn: async () => {
            const data = await getInsights(userId);
            return data;
        },
        queryKey: ['insights'],
        enabled: !!userId,
    });

    if (isPending) {
        return (
            <div className="flex gap-2">
                <Skeleton className="w-full h-40 bg-muted-foreground/40 rounded-lg" />
                <Skeleton className="w-full h-40 bg-muted-foreground/40 rounded-lg" />
                <Skeleton className="w-full h-40 bg-muted-foreground/40 rounded-lg" />
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardDescription>Faturamento</CardDescription>
                    <span className="bg-orange-500/20 text-orange-500 p-2 rounded-sm">
                        <DollarSign className="h-4 w-4" />
                    </span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {data &&
                            new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }).format(data.revenue)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        +20.1% em relação ao mês passado
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardDescription>Vendas</CardDescription>
                    <span className="bg-green-500/20 text-green-600 p-2 rounded-sm">
                        <ShoppingCart className="h-4 w-4" />
                    </span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {data && data.sales}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        +180.1% em relação ao mês passado
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardDescription>Percentual de Instalação</CardDescription>
                    <span className="bg-blue-500/20 text-blue-600 p-2 rounded-sm">
                        <TrendingUp className="h-4 w-4" />
                    </span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {data &&
                            new Intl.NumberFormat('pt-BR', {
                                style: 'percent',
                            }).format(data.completionRate)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        +12.3% em relação ao mês passado
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
