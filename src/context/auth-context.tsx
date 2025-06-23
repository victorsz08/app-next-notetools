'use client';

import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { createContext, use, useContext, useEffect, useState } from 'react';

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
    const [isLoading, setIsLoading] = useState(true); // Começa como true por padrão
    const [error, setError] = useState(false); // Estado para erros não esperados

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
                    router.push('/auth/login');
                } else {
                    setError(true);
                }
            } finally {
                setIsLoading(false);
            }
        };

        getSession();
    }, [router]); // Adicionado router como dependência, pois é usado no efeito.

    // Enquanto carrega, mostramos uma tela de loading.
    // Isso impede que os componentes filhos renderizem sem uma sessão.
    if (isLoading) {
        return <p>Carregando...</p>;
    }

    // Se ocorrer um erro que não seja de autenticação, mostramos uma tela de erro.
    if (error) {
        return <p>Ocorreu um erro ao carregar a aplicação.</p>;
    }

    // Apenas renderiza os filhos se não estiver carregando e não houver erro.
    // O redirecionamento do 401 já terá sido disparado.
    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
