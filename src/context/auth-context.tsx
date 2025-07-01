'use client';

import Loading from '@/app/loading';
import { api } from '@/lib/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect } from 'react';

type Session = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    avatarUrl: string;
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
    const { data: session, isPending } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const authResponse = await api.get('auth/session');
            if (authResponse.status === 401) {
                router.push('/auth/login');
            }
            const session = await api.get<Session>(
                `users/${authResponse.data.id}`
            );
            return session.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutos
        retry: 3,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
    });

    if (isPending) {
        return <Loading />;
    }

    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    const router = useRouter();
    const queryClient = useQueryClient();

    const logout = async () => {
        destroyCookie(null, 'nt.authtoken');
        queryClient.clear();
        router.push('/auth/login');
    };

    return {
        ...context,
        logout,
    };
};
