"use client";

import type React from "react";

import {
    Clipboard,
    Home,
    Notebook,
    User,
    LogOut,
    UserCheck,
    CheckCircle,
    Wallet,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import {NavMenu} from "./nav-menu";
import Image from "next/image";
import {Separator} from "../ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {useAuth} from "@/context/auth-context";
import {NavLink} from "./nav-link";
import Link from 'next/link';

const items = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home,
    },
    {
        title: 'Contratos',
        href: '/pedidos',
        icon: Clipboard,
    },
    {
        title: 'Anotações',
        href: '/anotacoes',
        icon: Notebook,
    },
];
const links = [
    {
        title: 'Situação cadastral CPF',
        href: 'https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp',
        icon: UserCheck,
    },
    {
        title: 'Situação Cadastral CNPJ',
        href: 'https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_Solicitacao.asp',
        icon: CheckCircle,
    },
    {
        title: 'Negocia Fácil Claro',
        href: 'https://claro.negociafacil.com.br/',
        icon: Wallet,
    },
];

export default function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const { session, logout } = useAuth();

    return (
        <Sidebar {...props} className="border-r">
            <SidebarHeader className="py-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <Image
                            src="/logo.svg"
                            width={20}
                            height={20}
                            alt="Logo"
                            className="text-primary-foreground"
                        />
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                        <h1 className="text-lg font-semibold tracking-tight">
                            Notetools
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Gestão inteligente
                        </p>
                    </div>
                </div>
            </SidebarHeader>

            <Separator />

            <SidebarContent className="py-4">
                <NavMenu items={items} />
                <Separator />
                <NavLink items={links} />
                <Separator />
            </SidebarContent>

            <SidebarFooter className="p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <User className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {session?.firstName}{' '}
                                            {session?.lastName}
                                        </span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            @{session?.username}
                                        </span>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem>
                                    <Link
                                        href="/perfil"
                                        className="cursor-pointer flex items-center gap-1 w-full"
                                    >
                                        <User className="mr-2 h-4 w-4" />
                                        Perfil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => logout()}
                                    className="cursor-pointer text-red-600"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sair
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
