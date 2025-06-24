'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { DataInsightsPerDay } from '@/@types';

const chartConfig = {
    vendas: {
        label: 'Vendas',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

export function ChartBar({ data }: { data: DataInsightsPerDay[] }) {
    return (
        <Card className="w-full shadow-none flex flex-col justify-between">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-muted-foreground/80">
                    Vendas recentes
                </CardTitle>
                <CardDescription className="text-xs tracking-tight text-muted-foreground/60">
                    Suas últimas vendas nesse mês.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[250px] w-full"
                >
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="quantity"
                            fill="var(--color-chart-1)"
                            radius={8}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
