"use client";

import AppSidebar from "@/components/sidebar/app-sidebar";
import {
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 60 * 60 * 5
    },
  },
})

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();

  

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
          <AppSidebar collapsible="icon" variant="sidebar" />
            <main className="bg-background w-full">
              <header className="bg-sidebar w-full p-4 border-b border-b-muted-foreground/10">
                <SidebarTrigger/>
              </header>
              {children}
            </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
