'use client';

import AppSidebar from '@/components/sidebar/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 60 * 60 * 5,
        },
    },
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SidebarProvider>
                <AppSidebar collapsible="icon" variant="sidebar" />
                <main className="bg-background w-full">
                    <header className="bg-sidebar w-full p-4 border-b border-b-muted-foreground/10">
                        <SidebarTrigger />
                    </header>
                    {children}
                    <Toaster richColors />
                </main>
            </SidebarProvider>
        </QueryClientProvider>
    );
}
