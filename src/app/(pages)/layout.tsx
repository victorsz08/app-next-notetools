'use client';

import AppSidebar from '@/components/sidebar/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { AvatarProfile } from '@/components/avatar/avata-profile';
import { BreadcrumbGroup } from '@/components/breadcrumb/breadcrumb';
import { AuthContextProvider } from '@/context/auth-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Layout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 3600 * 5,
            },
        },
    });
    return (
        <SidebarProvider>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <AppSidebar collapsible="icon" variant="sidebar" />
                    <main className="bg-background w-full">
                        <header className="bg-sidebar flex items-center justify-between w-full p-4 border-b border-b-muted-foreground/10">
                            <div className="flex items-center gap-3">
                                <SidebarTrigger />
                                <BreadcrumbGroup />
                            </div>
                            <AvatarProfile />
                        </header>
                        {children}
                        <Toaster richColors />
                    </main>
                </AuthContextProvider>
            </QueryClientProvider>
        </SidebarProvider>
    );
}
