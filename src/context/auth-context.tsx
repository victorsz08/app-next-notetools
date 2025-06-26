'use client';

import Loading from '@/app/loading';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { createContext, use, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Session = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
};

type AuthContextType = {
    session?: Session;
};

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [session, setSession] = useState<Session>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getSession = async () => {
            try {
                const response = await api.get('/auth/session');
                if (response.status === 200) {
                    await api.get(`/users/${response.data.id}`).then((res) => {
                        setSession({
                            id: res.data.id,
                            username: res.data.username,
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                            role: res.data.role,
                        });
                    });
                }
            } catch (err: any) {
                if (err?.response?.status === 401) {
                    toast.error('Erro ao carregar sua sessão!');
                    router.push('/auth/login');
                } else {
                    setError(true);
                }
            } finally {
                setIsLoading(false);
            }
        };

        getSession();
    }, [router]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
