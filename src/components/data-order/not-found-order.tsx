"use client";

import {File} from "lucide-react";
import {CreateOrderForm} from "../forms/create-order";

export function NotFoundOrder() {
    return (
        <section className="flex w-full justify-center items-center h-[420px]">
            <div className="flex flex-col justify-center items-center gap-5">
                <File className="w-16 h-16 text-muted-foreground/80" />
                <div className="flex flex-col gap-0 justify-center items-center">
                    <h3 className="text-lg font-semibold text-muted-foreground/70 tracking-tight">
                        Nenhum pedido para hoje
                    </h3>
                    <p className="text-xs font-light tracking-tight text-muted-foreground/60">
                        Crie um novo pedido para começar.
                    </p>
                </div>
                <CreateOrderForm />
            </div>
        </section>
    );
}
