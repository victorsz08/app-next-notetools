"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import moment from "moment";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Dialog, DialogTrigger} from "../ui/dialog";
import {useState} from "react";
import {Button} from "../ui/button";
import {Plus} from "lucide-react";

const createOrderSchema = z.object({
    number: z.coerce.number().min(1, "número do contrato não pode ser vazio"),
    local: z.string().nonempty("o campo cidade é obrigatório"),
    schedulingDate: z.coerce
        .date()
        .min(
            moment().startOf("day").toDate(),
            "A data de agendamento deve ser maior ou igual a data atual"
        ),
    schedulingTime: z
        .string()
        .nonempty("o campo horário de agendamento é obrigatório"),
    price: z.string().nonempty("o campo valor é obrigatório"),
    contact: z.string().nonempty("o cmapo contato é obrigatório"),
});

type CreateOrderForm = z.infer<typeof createOrderSchema>;

export function CreateOrderForm() {
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<CreateOrderForm>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: {
            number: 0,
            local: "",
            schedulingDate: moment().toDate(),
            schedulingTime: "",
            price: "",
            contact: "",
        },
    });

    return (
        <Dialog modal>
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
        </Dialog>
    );
}
