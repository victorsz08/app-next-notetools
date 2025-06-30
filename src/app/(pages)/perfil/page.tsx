import { Profile } from '@/components/profile/profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Perfil',
};

export default function ProfilePage() {
    return (
        <main className="p-4">
            <Profile />
        </main>
    );
}
