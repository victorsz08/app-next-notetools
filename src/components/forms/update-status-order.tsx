"use client";

import { DataOrder, StatusType } from "@/@types";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { StatusBadge } from "../status/status-badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";




const updateStatusOrder = z.object({
    status: z.string().nonempty("Status é obrigatório"),
});

type UpdateStatusForm = z.infer<typeof updateStatusOrder>;


const statusOptions = [
    { value: "PENDENTE" as StatusType } ,
    { value: "CONECTADO"  as StatusType },
    { value: "CANCELADO"  as StatusType },
];


export function UpdateStatusOrder({ order } : { order: DataOrder }) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState<boolean>(false);


    const form = useForm<UpdateStatusForm>({
        resolver: zodResolver(updateStatusOrder),
        defaultValues: {
            status: order.status ,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UpdateStatusForm) => {
            await api.put(`orders/status/${order.id}`, {
                status: data.status
            })
        },
        mutationKey: ["update-status-order"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            setOpen(false);
        }
    });

    function onSubmit(data: UpdateStatusForm) {
        mutate(data);
    }


    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger className="text-sm px-2 py-1">
                Atualizar status
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="space-y-0">
                    <DialogTitle className="text-lg font-semibold text-muted-foreground">
                        Atualizar status
                    </DialogTitle>
                    <DialogDescription className="text-xs font-light text-muted-foreground/60">
                        Atualize o status do pedido.
                    </DialogDescription>
                </DialogHeader>
                <Separator/>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-0">
                                    <Label className="text-xs">Status</Label>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="h-12">
                                            <FormControl>
                                                <SelectValue placeholder="Selecione uma opção" />
                                            </FormControl>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions.map((item, index) => (
                                                <SelectItem key={index} value={item.value}>
                                                    <StatusBadge status={item.value}/>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-[10px]"/>
                                </FormItem>
                            )}

                        />
                        <div className="flex justify-end gap-2 items-center">
                            <DialogClose asChild>
                                <Button type="button" variant="outline" className="w-[120px]">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending} className="w-[120px]">
                                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Atualizar"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}