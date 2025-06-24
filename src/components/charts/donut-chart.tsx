'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

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

export const description = 'A donut chart with text';

export type ChartDataType = {
    status: string;
    quantidade: number;
    fill?: string;
};
const chartConfig = {
    vendas: {
        label: 'Vendas',
    },
    conectado: {
        label: 'Conectados',
        color: 'var(--chart-1)',
    },
    pendente: {
        label: 'Pendentes',
        color: 'var(--chart-2)',
    },
    cancelado: {
        label: 'Cancelados',
        color: 'var(--chart-3)',
    },
} satisfies ChartConfig;

export function DonutChart({ data }: { data: ChartDataType[] }) {
    const totalSales = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.quantidade, 0);
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center flex flex-col justify-center gap-0 pb-0">
                <CardTitle className="text-lg font-semibold text-muted-foreground/80">
                    Vendas
                </CardTitle>
                <CardDescription className="text-xs tracking-tight text-muted-foreground/60">
                    Vendas totais nesse mês
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square h-[250px] w-[280px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={data}
                            dataKey="quantidade"
                            nameKey="status"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-muted-foreground/80 text-2xl font-bold"
                                                >
                                                    {totalSales.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground/60 text-xs"
                                                >
                                                    Vendas
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex flex-row justify-center items-center gap-2 text-sm">
                {data.map((item, index) => (
                    <div
                        className="flex flex-col justify-center items-center"
                        key={index}
                    >
                        <div className="flex items-center gap-1">
                            <span
                                className="w-4 h-4 rounded-sm"
                                style={{ backgroundColor: item.fill }}
                            ></span>
                            <span className="font-semibold text-base">
                                {item.quantidade}
                            </span>
                        </div>
                        <span className="text-xs font-light text-muted-foreground">
                            {item.status}
                        </span>
                    </div>
                ))}
            </CardFooter>
        </Card>
    );
}
