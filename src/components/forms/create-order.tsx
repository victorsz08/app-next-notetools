"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import moment from "moment";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {useState} from "react";
import {Button} from "../ui/button";
import {Plus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "../ui/form";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {Separator} from "../ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {formatCurrency} from "@/lib/utils";
import DatePicker from "../comp-490";

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

const timeOptions = [
    "08:00 - 12:00",
    "08:00 - 19:00",
    "12:00 - 15:00",
    "12:00 - 18:00",
    "15:00 - 18:00",
];

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

    function formatPrice(value: string) {
        const valuePrice = value.replace(/\D/g, "");

        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(valuePrice) / 100);
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
            <DialogContent className="space-y-4">
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
                    <form>
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="number"
                                render={({field}) => (
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
                                            className="h-10"
                                            type="text"
                                            {...field}
                                        />
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="local"
                                render={({field}) => (
                                    <FormItem className="group relative">
                                        <Label
                                            htmlFor="local"
                                            className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                                        >
                                            Cidade
                                        </Label>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger
                                                id="local"
                                                className="h-10"
                                            >
                                                <SelectValue placeholder="Selecione uma cidade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    React
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Next.js
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    Astro
                                                </SelectItem>
                                                <SelectItem value="4">
                                                    Gatsby
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
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
                                            className="h-10"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(
                                                    formatPrice(e.target.value)
                                                );
                                            }}
                                        />
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contact"
                                render={({field}) => (
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
                                            className="h-10"
                                            type="text"
                                            {...field}
                                        />
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="schedulingDate"
                                render={({field}) => (
                                    <FormItem className="group relative">
                                        <Label
                                            htmlFor="scheduling-date"
                                            className="bg-background text-foreground absolute start-1 top-0 z-10 
                                            block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                                        >
                                            Data de agendamento
                                        </Label>
                                        <DatePicker
                                            date={field.value}
                                            setDate={field.onChange}
                                        />
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="schedulingTime"
                                render={({field}) => (
                                    <FormItem className="group relative">
                                        <Label
                                            htmlFor="scheduling-time"
                                            className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                                        >
                                            Cidade
                                        </Label>
                                        <Select
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger
                                                id="scheduling-time"
                                                className="h-10"
                                            >
                                                <FormControl>
                                                    <SelectValue placeholder="Selecione uma cidade" />
                                                </FormControl>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {timeOptions.map(
                                                    (item, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex mt-4 items-center w-full gap-2 justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit">Criar</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
