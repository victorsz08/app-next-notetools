'use client';

import Loading from '@/app/loading';
import { api } from '@/lib/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createContext, useContext } from 'react';

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
        queryFn: async () => {
            const response = await api.get('auth/session');
            const user = await api.get(`users/${response.data.id}`);

            const session: Session = user.data;
            return session;
        },
        queryKey: ['session'],
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
