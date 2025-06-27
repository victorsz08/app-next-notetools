'use client';

import { ptBR } from 'react-day-picker/locale';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import moment from 'moment';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

interface DatePickerProps {
    date?: Date;
    setDate(value?: Date): void;
}

export default function DatePicker({ date, setDate }: DatePickerProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="text-sm border border-muted-foreground/30 h-10 text-muted-foregorund/80 font-light flex items-center gap-1 justify-start"
                >
                    <CalendarIcon className="w-4 h-4" />
                    {date ? (
                        <span>
                            {moment(date).locale('pt-BR').format('DD MMM YYYY')}
                        </span>
                    ) : (
                        <span>Selecione uma data</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="center">
                <Calendar
                    mode="single"
                    selected={date}
                    locale={ptBR}
                    onSelect={(value?: Date) => {
                        setDate(value);
                        setOpen(false);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
