'use client';

import { DataOrder } from '@/@types';
import { api } from '@/lib/axios';
import { formatCurrency } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { CidadeCombobox } from '../command-input/command-input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const updateOrderSchema = z.object({
    number: z.coerce
        .number()
        .min(1, 'o campo número do contrato é obrigatório'),
    local: z.string().nonempty('o campo cidade é obrigatório'),
    price: z.string().nonempty('o campo valor é obrigatório'),
    contact: z.string().nonempty('o cmapo contato é obrigatório'),
});

type UpdateOrderForm = z.infer<typeof updateOrderSchema>;

interface UpdateOrderProps {
    order: DataOrder;
}

export function UpdateOrder({ order }: UpdateOrderProps) {
    const [open, setOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const form = useForm<UpdateOrderForm>({
        resolver: zodResolver(updateOrderSchema),
        defaultValues: {
            number: order.number,
            local: order.local,
            price: formatCurrency(order.price),
            contact: order.contact,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UpdateOrderForm) => {
            await api.put(`orders/${order.id}`, {
                number: order.number,
                local: order.local,
                price: Number(data.price.replace('R$', '').replace(',', '.')),
                contact: order.contact,
            });

            return;
        },
        mutationKey: ['update-order'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            setOpen(false);
            toast.success('Pedido atualizado com sucesso!');
        },
        onError: () => {
            toast.error(
                'Erro ao atualizar o pedido, tente novamente mais tarde!'
            );
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

    function onSubmit(data: UpdateOrderForm) {
        mutate(data);
    }

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger className="text-xs text-start px-2 py-3 hover:bg-muted">
                Atualizar informações
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="space-y-0">
                    <DialogTitle className="text-lg font-semibold text-muted-foreground">
                        Atualizar pedido
                    </DialogTitle>
                    <DialogDescription className="text-xs font-light text-muted-foreground/60">
                        Atualize as informações do pedido.
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
