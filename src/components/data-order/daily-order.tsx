"use client";

import { DataOrder } from "@/@types";
import { DataTable } from "../table/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";




export function DailyOrder() {

    const data = [
        {
            id: "123",
            number: 1234,
            local: "São Paulo/SP",
            schedulingDate: "2025-06-23",
            schudulingTime: "12:00 as 15:00",
            price: 119.90,
            contact: "88 83838-9393",
            status: "PENDENTE",
            createdAt: "2025-06-12",
            updatedAt: "2025-06-12"
        },
        {
            id: "124",
            number: 1234,
            local: "São Paulo/SP",
            schedulingDate: "2025-06-23",
            schudulingTime: "12:00 as 15:00",
            price: 119.90,
            contact: "88 83838-9393",
            status: "CONECTADO",
            createdAt: "2025-06-12",
            updatedAt: "2025-06-12"
        },
        {
            id: "125",
            number: 1234,
            local: "São Paulo/SP",
            schedulingDate: "2025-06-23",
            schudulingTime: "12:00 as 15:00",
            price: 119.90,
            contact: "88 83838-9393",
            status: "CANCELADO",
            createdAt: "2025-06-12",
            updatedAt: "2025-06-12"
        }
    ] as DataOrder[]

    return (
        <Card className="w-full shadow-none">
            <CardHeader>
                <CardTitle>Pedidos recentes</CardTitle>
                <CardDescription>Pedidos com datas previstas para hoje.</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable data={data}/>
            </CardContent>
        </Card>
    )
}