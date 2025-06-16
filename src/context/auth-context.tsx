'use client';

import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { createContext, use, useContext, useEffect, useState } from 'react';

type Session = {
  id: string
  username: string
  firstName: string
  lastName: string
  role: string
  iat: number
  exp: number
}

type AuthContextType = {
    session?: Session;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
const router = useRouter();
    const [session, setSession] = useState<Session>();
    const [isLoading, setIsLoading] = useState(true); // Começa como true por padrão
    const [error, setError] = useState(false); // Estado para erros não esperados

    useEffect(() => {
        const getSession = async () => {
            try {
                const response = await api.get('/auth/session');

                // Sucesso: Geralmente a API retorna 200 OK com dados.
                // Status 204 (No Content) significa que não há corpo na resposta.
                // Se a sua API retorna dados, o status deve ser 200.
                if (response.status === 200) {
                    setSession(response.data);
                }

            } catch (err: any) {
                // O erro é tratado aqui no catch.
                // Verificamos se o erro tem uma resposta e se o status é 401.
                if (err?.response?.status === 401) {
                    // Se for 401, o usuário não está logado. Redirecionamos.
                    router.push('/auth/login');
                } else {
                    // Para qualquer outro erro (ex: falha de rede, erro 500),
                    // ativamos o estado de erro para mostrar uma mensagem.
                    setError(true);
                }
            } finally {
                // O finally sempre será executado, seja no sucesso ou no erro.
                // É o lugar perfeito para garantir que o loading termine.
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
