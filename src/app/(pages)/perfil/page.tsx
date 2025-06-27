import { Profile } from '@/components/profile/profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Perfil',
};

export default function ProfilePage() {
    return (
        <main className="p-4">
            <section className="flex flex-col">
                <h1 className="text-2xl font-semibold text-muted-foreground/90">
                    Meu Perfil
                </h1>
                <small className="text-xs font-light text-muted-foreground/60">
                    Gerencie seus dados.
                </small>
            </section>
            <Profile />
        </main>
    );
}
