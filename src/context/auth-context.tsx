'use client';

import Loading from '@/app/loading';
import { api } from '@/lib/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { se } from 'date-fns/locale';
import { redirect, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

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
    const {
        data: session,
        isPending,
        error,
    } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const { data, status } = await api.get('auth/session');
            if (status === 401) {
                return redirect('/auth/login');
            }

            const session = await api.get<Session>(`users/${data.id}`);
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

    if (error) {
        router.push('/auth/login');
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
        await api.post('auth/logout');
        queryClient.clear();
        router.push('/auth/login');
    };

    return {
        ...context,
        logout,
    };
};
