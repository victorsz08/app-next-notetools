"use client";

import {useAuth} from "@/context/auth-context";
import {DataTable} from "../table/data-table";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {api} from "@/lib/axios";
import type {DataOrder, StatusType} from "@/@types";
import Paginator from "../comp-458";
import type {DateRange} from "react-day-picker";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Button} from "../ui/button";
import {Label} from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {Calendar} from "../ui/calendar";
import {
    CalendarIcon,
    Filter,
    X,
    ChevronDown,
    ChevronUp,
    Trash,
} from "lucide-react";
import {ptBR} from "date-fns/locale";
import {cn} from "@/lib/utils";
import moment from "moment";
import {Skeleton} from "../ui/skeleton";
import {Badge} from "../ui/badge";
import {OrderFilters} from "../filters/filter-order";

interface DataResponseOrder {
    orders: DataOrder[];
    totalPages: number;
    totalItems: number;
    limit: number;
    page: number;
}
export function OrderPage() {
    const {session} = useAuth();
    const userId = session?.id;

    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [schedulingDateFilter, setSchedulingDateFilter] = useState<
        DateRange | undefined
    >({
        from: undefined,
        to: undefined,
    });
    const [createdDateFilter, setCreatedDateFilter] = useState<
        DateRange | undefined
    >({
        from: undefined,
        to: undefined,
    });
    const [statusFilter, setStatusFilter] = useState<StatusType | undefined>(
        undefined
    );

    const getOrders = async () => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: "10",
        });

        if (
            schedulingDateFilter &&
            schedulingDateFilter?.from &&
            schedulingDateFilter?.to
        ) {
            params.append(
                "schedulingDateIn",
                moment(schedulingDateFilter.from).format("YYYY-MM-DD")
            );
            params.append(
                "schedulingDateOut",
                moment(schedulingDateFilter.to).format("YYYY-MM-DD")
            );
        }

        if (
            createdDateFilter &&
            createdDateFilter?.from &&
            createdDateFilter?.to
        ) {
            params.append(
                "createdDateIn",
                moment(createdDateFilter.from).format("YYYY-MM-DD")
            );
            params.append(
                "createdDateOut",
                moment(createdDateFilter.to).format("YYYY-MM-DD")
            );
        }

        if (statusFilter && statusFilter !== "ALL") {
            params.append("status", statusFilter);
        }

        const response = await api.get(
            `orders/list/${userId}?page=${page}&limit=10${params.toString()}`
        );
        const data: DataResponseOrder = response.data;

        return data;
    };

    const {data, isFetching} = useQuery<DataResponseOrder>({
        queryFn: getOrders,
        queryKey: [
            "orders",
            page,
            userId,
            schedulingDateFilter,
            createdDateFilter,
            statusFilter,
        ],
        enabled: !!userId,
        initialData: {} as DataResponseOrder,
        refetchOnWindowFocus: false,
    });

    if (isFetching)
        return (
            <div className="p-4">
                <Skeleton className="w-full h-screen bg-muted-foreground/30" />
            </div>
        );

    return (
        <section>
            <Card className="w-full shadow-sm border-border/50">
                <CardHeader>
                    <div className="flex items-center mb-4 justify-start gap-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowFilters(!showFilters)}
                            className="cursor-pointer border border-muted-foreground/10"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filtrar</span>
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            className="cursor-pointer border border-muted-foreground/10"
                        >
                            <Trash className="w-4 h-4" />
                            <span>Limpar filtros</span>
                        </Button>
                    </div>
                    {showFilters && (
                        <OrderFilters
                            createdDateFilter={createdDateFilter}
                            status={statusFilter}
                            schedulingDateFilter={schedulingDateFilter}
                            setCreatedDateFilter={setCreatedDateFilter}
                            setSchedulingDateFilter={setSchedulingDateFilter}
                            setStatus={setStatusFilter}
                        />
                    )}
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                {data.totalItems
                                    ? `${data.totalItems} pedido${
                                          data.totalItems > 1 ? "s" : ""
                                      } encontrado${
                                          data.totalItems > 1 ? "s" : ""
                                      }`
                                    : "Nenhum pedido encontrado"}
                            </p>
                        </div>
                        <DataTable data={data.orders || []} />
                        {data.totalPages > 1 && (
                            <Paginator
                                onPageChange={setPage}
                                currentPage={page}
                                totalPages={data.totalPages || 0}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
