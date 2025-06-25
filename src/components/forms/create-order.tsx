'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { number, z } from 'zod';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { CidadeCombobox } from '../command-input/command-input';
import {
    SchedulingData,
    SchedulingInput,
} from '../scheduling-input.tsx/scheduling-input';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useAuth } from '@/context/auth-context';

const createOrderSchema = z.object({
    number: z.coerce.number().min(1, 'número do contrato não pode ser vazio'),
    local: z.string().nonempty('o campo cidade é obrigatório'),
    schedulingDate: z.coerce
        .date()
        .min(
            moment().startOf('day').toDate(),
            'A data de agendamento deve ser maior ou igual a data atual'
        ),
    schedulingTime: z
        .string()
        .nonempty('o campo horário de agendamento é obrigatório'),
    price: z.string().nonempty('o campo valor é obrigatório'),
    contact: z.string().nonempty('o campo contato é obrigatório'),
});

type CreateOrderForm = z.infer<typeof createOrderSchema>;

export function CreateOrderForm() {
    const [open, setOpen] = useState<boolean>(false);
    const { session } = useAuth();
    const userId = session?.id;
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: CreateOrderForm) => {
            const response = await api.post(`orders/${userId}`, {
                number: data.number,
                local: data.local,
                schedulingDate: data.schedulingDate,
                schedulingTime: data.schedulingTime,
                price: Number(data.price.replace(',', '.').replace('R$', '')),
                contact: data.contact,
            });

            console.log(response);
            if (response.status === 400) {
                return;
            }

            return;
        },
        mutationKey: ['create-order'],
        onSuccess: () => {
            form.reset();
            setOpen(false);
        },
        onError: (error: any) => {
            console.log(error.response.data.details[0].issue);
            error.response.data.details.forEach((err: any) => {
                form.setError(err.issue, {
                    message: err.message,
                });
            });
        },
    });

    const form = useForm<CreateOrderForm>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: {
            number: 0,
            local: '',
            schedulingDate: moment().toDate(),
            schedulingTime: '',
            price: '',
            contact: '',
        },
    });

    function formatPrice(value: string) {
        const valuePrice = value.replace(/\D/g, '');

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(valuePrice) / 100);
    }

    const handleSchedulingChange = (data: SchedulingData) => {
        if (data.date) {
            form.setValue('schedulingDate', data.date);
        }
        if (data.time) {
            form.setValue('schedulingTime', data.time);
        }
    };

    function onSubmit(data: CreateOrderForm) {
        mutate(data);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button">
                    <Plus
                        className="-ms-1 opacity-60"
                        size={16}
                        aria-hidden="true"
                    />
                    <span className="max-sm:sr-only">
                        Adicionar novo pedido
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="space-y-8 min-w-[40vw] overflow-y-auto flex flex-col justify-between">
                <DialogHeader className="flex flex-col justify-center items-center gap-0">
                    <DialogTitle className="text-lg font-bold tracking-tight text-muted-foreground/90">
                        Novo pedido
                    </DialogTitle>
                    <DialogDescription className="text-xs font-normal text-muted-foreground/60">
                        Preencha todas as informações.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="number"
                                render={({ field }) => (
                                    <FormItem className="group relative">
                                        <Label
                                            htmlFor="number"
                                            className="bg-background text-foreground absolute start-1 top-0 z-10 
                                            block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                                        >
                                            N° do contrato
                                        </Label>
                                        <Input
                                            id="number"
                                            className="h-12"
                                            type="text"
                                            {...field}
                                        />
                                        <FormMessage className="text-[10px] ml-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="local"
                                render={({ field }) => (
                                    <FormItem className="group relative">
                                        <Label
                                            htmlFor="local"
                                            className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                                        >
                                            Cidade
                                        </Label>
                                        <CidadeCombobox
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        <FormMessage className="text-[10px] ml-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="group relative">
                                        <Label
                                            htmlFor="price"
                                            className="bg-background text-foreground absolute start-1 top-0 z-10 
                                            block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                                        >
                                            Valor
                                        </Label>
                                        <Input
                                            id="price"
                                            className="h-12"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(
                                                    formatPrice(e.target.value)
                                                );
                                            }}
                                        />
                                        <FormMessage className="text-[10px] ml-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contact"
                                render={({ field }) => (
                                    <FormItem className="group relative">
                                        <Label
                                            htmlFor="contact"
                                            className="bg-background text-foreground absolute start-1 top-0 z-10 
                                            block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                                        >
                                            Contato
                                        </Label>
                                        <Input
                                            id="contact"
                                            className="h-12"
                                            type="text"
                                            {...field}
                                        />
                                        <FormMessage className="text-[10px] ml-1" />
                                    </FormItem>
                                )}
                            />
                            <div className="col-span-2">
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
                                                date={form.watch(
                                                    'schedulingDate'
                                                )}
                                                time={form.watch(
                                                    'schedulingTime'
                                                )}
                                                onChange={
                                                    handleSchedulingChange
                                                }
                                                placeholder="Selecionar data e horário"
                                            />
                                            <FormMessage className="text-[10px] ml-1" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex mt-10 items-center w-full gap-2 justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : null}
                                Criar pedido
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
