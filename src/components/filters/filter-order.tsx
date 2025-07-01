'use client';

import { StatusType } from '@/@types';
import { DateRange } from 'react-day-picker';
import { ptBR } from 'react-day-picker/locale';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import moment from 'moment';
import { Calendar } from '../ui/calendar';
import { Label } from '../ui/label';
import { Calendar as CalendarIcon, XCircle } from 'lucide-react';
import { StatusBadge } from '../status/status-badge';
import { useState } from 'react';

export interface FiltersProps {
    status?: StatusType;
    setStatus?: (status: StatusType) => void;
    schedulingDateFilter?: DateRange;
    setSchedulingDateFilter?: (date?: DateRange) => void;
    createdDateFilter?: DateRange;
    setCreatedDateFilter?: (date?: DateRange) => void;
}

const statusOptions = [
    { value: 'PENDENTE' as StatusType },
    { value: 'CONECTADO' as StatusType },
    { value: 'CANCELADO' as StatusType },
];

export function OrderFilters({
    status,
    setStatus,
    schedulingDateFilter,
    createdDateFilter,
    setCreatedDateFilter,
    setSchedulingDateFilter,
}: FiltersProps) {
    const [schedulingDraft, setSchedulingDraft] = useState<
        DateRange | undefined
    >(undefined);
    const [createdDraft, setCreatedDraft] = useState<DateRange | undefined>(
        undefined
    );
    return (
        <section className="space-y-3">
            <section className="flex items-center gap-4">
                <div className="flex flex-col gap-0">
                    <Label className="text-xs ml-1">Filtrar por status</Label>
                    <Select defaultValue={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Filtrar por status..." />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((item, index) => (
                                <SelectItem value={item.value} key={index}>
                                    <StatusBadge status={item.value} />
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-0">
                    <Label className="text-xs ml-1">
                        Filtrar por data de agendamento
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="text-sm font-light tracking-tighter justify-start w-[250px] bg-transparent 
                                    text-muted-foreground/80 flex items-center gap-1"
                            >
                                <CalendarIcon className="w-4 h-4" />
                                {schedulingDateFilter?.to &&
                                schedulingDateFilter.from ? (
                                    <span>
                                        {moment(schedulingDateFilter.from)
                                            .locale('pt-BR')
                                            .format('DD/MM/YY')}
                                        {'  '}-{'  '}
                                        {moment(schedulingDateFilter.to)
                                            .locale('pt-BR')
                                            .format('DD/MM/YY')}
                                    </span>
                                ) : (
                                    ''
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit" align="center">
                            <Calendar
                                mode="range"
                                selected={
                                    schedulingDraft ?? schedulingDateFilter
                                }
                                onSelect={setSchedulingDraft}
                                locale={ptBR}
                                numberOfMonths={2}
                            />
                            <div className="flex gap-2 mt-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() => {
                                        if (schedulingDraft) {
                                            setSchedulingDateFilter?.(
                                                schedulingDraft
                                            );
                                        }
                                    }}
                                >
                                    Aplicar
                                </Button>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                        setSchedulingDraft(undefined);
                                        setSchedulingDateFilter?.(undefined);
                                    }}
                                >
                                    Limpar
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-0">
                    <Label className="text-xs ml-1">
                        Filtrar por data de criação
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="text-sm tracking-tight justify-start w-[250px] 
                            bg-transparent text-muted-foreground/80 flex items-center gap-1"
                            >
                                <CalendarIcon className="w-4 h-4" />
                                {createdDateFilter?.to &&
                                createdDateFilter.from ? (
                                    <span>
                                        {moment(createdDateFilter.from)
                                            .locale('pt-BR')
                                            .format('DD/MM/YY')}
                                        {'  '}-{'  '}
                                        {moment(createdDateFilter.to)
                                            .locale('pt-BR')
                                            .format('DD/MM/YY')}
                                    </span>
                                ) : (
                                    ''
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit" align="center">
                            <Calendar
                                mode="range"
                                selected={createdDraft ?? createdDateFilter}
                                onSelect={setCreatedDraft}
                                locale={ptBR}
                                numberOfMonths={2}
                            />
                            <div className="flex gap-2 mt-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() => {
                                        if (createdDraft) {
                                            setCreatedDateFilter?.(
                                                createdDraft
                                            );
                                        }
                                    }}
                                >
                                    Aplicar
                                </Button>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                        setCreatedDraft(undefined);
                                        setCreatedDateFilter?.(undefined);
                                    }}
                                >
                                    Limpar
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </section>
        </section>
    );
}
