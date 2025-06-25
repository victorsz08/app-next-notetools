import { OrderPage } from "@/components/data-order/data-order";
import { Metadata } from "next";




export const metadata: Metadata = {
    title: "Meus pedidos"
};


export default function PedidosPage() {
    return (
        <main>
            <OrderPage/>
        </main>
    )
}