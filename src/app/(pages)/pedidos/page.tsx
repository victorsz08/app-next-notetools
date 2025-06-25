import { OrderPage } from '@/components/data-order/data-order';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Meus pedidos',
};

export default function PedidosPage() {
    return (
        <main className="p-4 space-y-6">
            <section className="flex flex-col">
                <h1 className="text-xl font-bold text-muted-foreground/80">
                    Meus Pedidos
                </h1>
                <small className="text-xs font-light text-mute-foreground/40">
                    Gerencie todos os seus pedidos
                </small>
            </section>
            <OrderPage />
        </main>
    );
}
