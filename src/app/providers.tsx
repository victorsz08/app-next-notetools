'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 3600 * 5,
            },
        },
    });

    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
}
