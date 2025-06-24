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
import { Button } from '../ui/button';
import moment from 'moment';
import { formatCurrency, formatDate } from '@/lib/utils';

export function DataTable({ data }: { data?: DataOrder[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="text-xs font-semibold text-muted-foreground bg-muted/10">
                    <TableHead>
                        <Checkbox />
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
                {data &&
                    data.map((item) => (
                        <TableRow
                            key={item.id}
                            className="text-xs text-foreground/80"
                        >
                            <TableCell>
                                <Checkbox />
                            </TableCell>
                            <TableCell>{item.number}</TableCell>
                            <TableCell>{item.local}</TableCell>
                            <TableCell>
                                {formatDate(item.schedulingDate)}
                            </TableCell>
                            <TableCell>{item.schudulingTime}</TableCell>
                            <TableCell>{formatCurrency(item.price)}</TableCell>
                            <TableCell>{item.contact}</TableCell>
                            <TableCell>{formatDate(item.createdAt)}</TableCell>
                            <TableCell>
                                <StatusBadge status={item.status} />
                            </TableCell>
                            <TableCell>
                                <Button>
                                    <Ellipsis className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}
