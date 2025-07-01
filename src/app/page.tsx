'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { session } = useAuth();
    const router = useRouter();

    if (!session) {
        router.push('/auth/login');
    }

    router.push('/dashboard');
}
