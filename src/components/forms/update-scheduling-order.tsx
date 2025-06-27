'use client';

import { DataOrder } from '@/@types';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { boolean, z } from 'zod';
import {
    SchedulingData,
    SchedulingInput,
} from '../scheduling-input.tsx/scheduling-input';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Separator } from '../ui/separator';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { api } from '@/lib/axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const updateSchedulingOrderSchema = z.object({
    schedulingDate: z.coerce
        .date()
        .min(
            moment().subtract(1, 'day').toDate(),
            'a data de agendamento deve ser maior ou igual a data atual'
        ),
    schedulingTime: z
        .string()
        .nonempty('o horário de agendamento não pode ser vazio'),
});

type UpdateSchedulingOrderForm = z.infer<typeof updateSchedulingOrderSchema>;

interface UpdateSchedulingOrderProps {
    order: DataOrder;
}

export function UpdateSchedulingOrder({ order }: UpdateSchedulingOrderProps) {
    const [open, setOpen] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const form = useForm<UpdateSchedulingOrderForm>({
        resolver: zodResolver(updateSchedulingOrderSchema),
        defaultValues: {
            schedulingDate: moment(order.schedulingDate).toDate(),
            schedulingTime: order.schedulingTime,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UpdateSchedulingOrderForm) => {
            await api.put(`orders/scheduling/${order.id}`, {
                schedulingDate: data.schedulingDate,
                schedulingTime: data.schedulingTime,
            });

            return;
        },
        mutationKey: ['update-scheduling-order'],
        onSuccess: () => {
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast.success('Pedido atualizado com sucesso!');
        },
        onError: () => {
            toast.error(
                'Erro ao atualizar o pedido, tente novamente mais tarde!'
            );
        },
    });

    const handleSchedulingChange = (data: SchedulingData) => {
        if (data.date) {
            form.setValue('schedulingDate', data.date);
        }
        if (data.time) {
            form.setValue('schedulingTime', data.time);
        }
    };

    function onSubmit(data: UpdateSchedulingOrderForm) {
        mutate(data);
    }

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger className="text-xs px-2 py-3 hover:bg-muted">
                Atualizar agendamento
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="space-y-0">
                    <DialogTitle className="text-lg font-semibold text-muted-foreground">
                        Atualizar agendamento
                    </DialogTitle>
                    <DialogDescription className="text-xs font-light text-muted-foreground/60">
                        Atualize as informações de agendamento.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="schedulingDate"
                            render={({ field }) => (
                                <FormItem className="group relative">
                                    <Label
                                        htmlFor="scheduling"
                                        className="bg-background text-foreground absolute start-1 top-0 z-10 
                                                block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                                    >
                                        Agendamento
                                    </Label>
                                    <SchedulingInput
                                        date={form.watch('schedulingDate')}
                                        time={form.watch('schedulingTime')}
                                        onChange={handleSchedulingChange}
                                        placeholder="Selecionar data e horário"
                                    />
                                    <FormMessage className="text-[10px] ml-1" />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-2 items-center">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-[120px]"
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-[120px]"
                            >
                                {isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    'Atualizar'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
