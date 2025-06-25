"use client"

import { useAuth } from "@/context/auth-context"
import { DataTable } from "../table/data-table"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { api } from "@/lib/axios"
import type { DataOrder, StatusType } from "@/@types"
import Paginator from "../comp-458"
import type { DateRange } from "react-day-picker"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { CalendarIcon, Filter, X } from "lucide-react"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import moment from "moment"
import { Skeleton } from "../ui/skeleton"

interface DataResponseOrder {
  orders: DataOrder[]
  totalPages: number
  totalItems: number
  limit: number
  page: number
}

const statusOptions = [
  { value: "ALL", label: "Todos os pedidos" },
  { value: "PENDENTE", label: "Pendente" },
  { value: "CONECTADO", label: "Conectado" },
  { value: "CANCELADO", label: "Cancelado" },
]

export function OrderPage() {
  const { session } = useAuth()
  const userId = session?.id

  const [page, setPage] = useState(1)
  const [schedulingDateFilter, setSchedulingDateFilter] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [createdDateFilter, setCreatedDateFilter] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [statusFilter, setStatusFilter] = useState<StatusType | undefined>(undefined)
  const [showFilters, setShowFilters] = useState(false)

  const getOrders = async () => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: "10",
    })

    if (schedulingDateFilter?.from && schedulingDateFilter?.to) {
      params.append("schedulingDateIn", moment(schedulingDateFilter.from).format("YYYY-MM-DD"))
      params.append("schedulingDateOut", moment(schedulingDateFilter.to).format("YYYY-MM-DD"))
    }

    if (createdDateFilter?.from && createdDateFilter?.to) {
      params.append("createdDateIn", moment(createdDateFilter.from).format("YYYY-MM-DD"))
      params.append("createdDateOut", moment(createdDateFilter.to).format("YYYY-MM-DD"))
    }

    if (statusFilter && statusFilter !== "ALL") {
      params.append("status", statusFilter)
    }

    const response = await api.get(`orders/list/${userId}?${params.toString()}`)
    const data: DataResponseOrder = response.data

    return data
  }

  const { data, isFetching } = useQuery<DataResponseOrder>({
    queryFn: getOrders,
    queryKey: [
      "orders",
      page,
      userId,
      // Só inclui o filtro de agendamento se ambas as datas estiverem selecionadas
      schedulingDateFilter?.from && schedulingDateFilter?.to
        ? {
            schedulingFrom: schedulingDateFilter.from,
            schedulingTo: schedulingDateFilter.to,
          }
        : null,
      // Só inclui o filtro de criação se ambas as datas estiverem selecionadas
      createdDateFilter?.from && createdDateFilter?.to
        ? {
            createdFrom: createdDateFilter.from,
            createdTo: createdDateFilter.to,
          }
        : null,
      statusFilter,
    ],
    enabled: !!userId,
    initialData: {} as DataResponseOrder,
  })

  const clearFilters = () => {
    setSchedulingDateFilter({ from: undefined, to: undefined })
    setCreatedDateFilter({ from: undefined, to: undefined })
    setStatusFilter(undefined)
    setPage(1)
  }

  const hasActiveFilters =
    schedulingDateFilter?.from ||
    schedulingDateFilter?.to ||
    createdDateFilter?.from ||
    createdDateFilter?.to ||
    statusFilter

  if (isFetching)
    return (
      <div className="p-4">
        <Skeleton className="w-full h-screen bg-muted-foreground/30" />
      </div>
    )

  return (
    <section className="space-y-6 p-4">
      <Card className="w-full shadow-none">
        <CardContent className="space-y-4">
          <DataTable data={data.orders || []} />
          <Paginator onPageChange={setPage} currentPage={page} totalPages={data.totalPages || 0} />
        </CardContent>
      </Card>
    </section>
  )
}
