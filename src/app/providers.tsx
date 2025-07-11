'use client';

import { AuthContextProvider } from '@/context/auth-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient({});

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={client}>
            <AuthContextProvider>{children}</AuthContextProvider>
        </QueryClientProvider>
    );
}
