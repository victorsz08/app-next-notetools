'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { getInsights } from '@/data/get-insights';
import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import moment from 'moment';

type Insights = {
    revenue: number;
    sales: number;
    completionRate: number;
    cancelledRate: number;
    connected: number;
    pending: number;
    cancelled: number;
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
        return <p>Loading...</p>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardDescription>Faturamento</CardDescription>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
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
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{
                        data && data.sales
                      }</div>
                    <p className="text-xs text-muted-foreground">
                        +180.1% em relação ao mês passado
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardDescription>Percentual de Instalação</CardDescription>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
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
