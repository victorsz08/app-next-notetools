"use client";

import { Clipboard, Home, Notebook } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "../ui/sidebar";
import { NavMenu } from "./nav-menu";
import Image from "next/image";
import { Separator } from "../ui/separator";

const items = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home
    },
    {
        title: "Contratos",
        href: "/contratos",
        icon: Clipboard
    },
    {
        title: "Anotações",
        href: "/anotacoes",
        icon: Notebook
    }
];

export default function AppSidebar({ ...props } : React.ComponentProps<typeof Sidebar>) {
  
    return (
        <Sidebar {...props} className="py-4">
            <SidebarHeader className="flex flex-row items-center">
                <Image src="/logo.svg" width={24} height={24} alt="Logo" />
                <h1 className="text-lg font-semibold group-data-[collapsible=icon]:hidden">Notetools</h1>
            </SidebarHeader>
            <Separator/>
            <SidebarContent>
                <NavMenu items={items}/>
            </SidebarContent>
            <SidebarFooter>

            </SidebarFooter>
        </Sidebar>
  );
}