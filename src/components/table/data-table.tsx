'use client';

import { DataOrder } from '@/@types';
import { Ellipsis } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { StatusBadge } from '../status/status-badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useState } from 'react';
import MenuOrder from '../menu-order';

export function DataTable({ data }: { data: DataOrder[] }) {
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

    function handleSelectedAllOrders() {
        if (selectedOrders.length === data.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(data.map((item) => item.id)); // Fix: Ensure all data items are mapped
        }
    }

    function handleIndividualCheckboxChange(id: string) {
        setSelectedOrders((prev) =>
            prev.includes(id)
                ? prev.filter((item_id) => item_id !== id)
                : [...prev, id]
        );
    }

    return (
        <section className="overflow-clip rounded-sm border border-muted-foreground/10">
            <Table>
                <TableHeader>
                    <TableRow className="text-xs font-semibold text-muted-foreground bg-muted/80">
                        <TableHead>
                            <Checkbox
                                checked={
                                    selectedOrders.length === data.length &&
                                    data.length > 0
                                }
                                onCheckedChange={handleSelectedAllOrders}
                            />
                        </TableHead>
                        <TableHead>N° do Contrato</TableHead>
                        <TableHead>Cidade</TableHead>
                        <TableHead>Data de agendamento</TableHead>
                        <TableHead>Horário</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Criado</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow
                            key={item.id}
                            className="text-xs text-foreground/80"
                        >
                            <TableCell>
                                <Checkbox
                                    checked={selectedOrders.includes(item.id)}
                                    onCheckedChange={() =>
                                        handleIndividualCheckboxChange(item.id)
                                    }
                                />
                            </TableCell>
                            <TableCell>{item.number}</TableCell>
                            <TableCell>{item.local}</TableCell>
                            <TableCell>
                                {formatDate(item.schedulingDate)}
                            </TableCell>
                            <TableCell>{item.schedulingTime}</TableCell>
                            <TableCell>{formatCurrency(item.price)}</TableCell>
                            <TableCell>{item.contact}</TableCell>
                            <TableCell>{formatDate(item.createdAt)}</TableCell>
                            <TableCell>
                                <StatusBadge status={item.status} />
                            </TableCell>
                            <TableCell>
                                <MenuOrder order={item} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
}
