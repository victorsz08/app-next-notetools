"use client";

import {DataOrder} from "@/@types";
import {DataTable} from "../table/data-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {useAuth} from "@/context/auth-context";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "../ui/skeleton";
import {api} from "@/lib/axios";
import moment from "moment";
import {CreateOrderForm} from "../forms/create-order";
import {Separator} from "../ui/separator";
import {NotFoundOrder} from "./not-found-order";

const dateIn = moment().startOf("month").format("YYYY-MM-DD");
const dateOut = moment().endOf("month").format("YYYY-MM-DD");

export function DailyOrder() {
    const {session} = useAuth();
    const userId = session?.id;

    const getDailyOrders = async () => {
        const response = await api.get(
            `orders/list/${userId}?page=1&limit=10&schedulingDateIn=${dateIn}&shcedulingDateOut=${dateOut}`
        );

        return response.data.orders;
    };

    const {data, isFetching} = useQuery<DataOrder[]>({
        queryFn: getDailyOrders,
        queryKey: ["orders"],
        enabled: !!userId,
        initialData: [],
    });

    if (isFetching) {
        return (
            <Skeleton className="w-full h-96 bg-muted-foreground/30 rounded-lg" />
        );
    }

    return (
        <Card className="w-full shadow-none">
            {data.length > 0 ? (
                <>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-muted-foreground">
                            Pedidos recentes
                        </CardTitle>
                        <CardDescription className="text-xs font-normal text-muted-foreground/60">
                            Pedidos com datas previstas para hoje.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-end mb-1 w-full">
                            <CreateOrderForm />
                        </div>
                        <Separator />
                        <DataTable data={data} />
                    </CardContent>
                </>
            ) : (
                <CardContent>
                    <NotFoundOrder />
                </CardContent>
            )}
        </Card>
    );
}
