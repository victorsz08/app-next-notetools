'use client';

import { DataOrder } from '@/@types';
import { api } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DeleteOrderProps {
    order: DataOrder;
}

export function DeleteOrderDialog({ order }: DeleteOrderProps) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState<boolean>(false);

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            await api.delete(`orders/${order.id}`);

            return;
        },
        mutationKey: ['delete-order'],
        onSuccess: () => {
            setOpen(false);
        },
        onError: () => {
            toast.error('Erro ao excluir o pedido, tente novamente mais tarde');
        },
    });

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="text-xs bg-red-100 text-red-700 px-2 w-full rounded-sm text-start py-2">
                    Excluir
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="space-y-0">
                    <DialogTitle className="text-lg font-semibold text-muted-foreground">
                        Confirmar exclusão
                    </DialogTitle>
                    <DialogDescription className="text-xs font-light text-muted-foreground/60">
                        Tem certeza que você deseja excluir esse pedido{' '}
                        {order.number} - {order.local}?
                    </DialogDescription>
                </DialogHeader>
                <Separator />
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
                        type="button"
                        onClick={() => mutate()}
                        variant="destructive"
                        disabled={isPending}
                        className="w-[120px]"
                    >
                        {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            'Excluir'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
