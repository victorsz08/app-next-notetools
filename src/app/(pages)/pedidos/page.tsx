import { OrderPage } from '@/components/data-order/data-order';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Meus pedidos',
};

export default function PedidosPage() {
    return (
        <main className="p-4 space-y-6">
            <section className="flex flex-col">
                <h1 className="text-2xl font-semibold text-muted-foreground/90">
                    Meus Pedidos
                </h1>
                <small className="text-xs font-light text-muted-foreground/60">
                    Gerencie suas informações pessoais e configurações de
                    segurança
                </small>
            </section>
            <OrderPage />
        </main>
    );
}
