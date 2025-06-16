import { LucideIcon } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { Collapsible } from "../ui/collapsible";
import Link from "next/link";





type NavMenuType = {
    items: {
        title: string;
        href: string;
        icon: LucideIcon;
    }[];
};


export function NavMenu({ items } : NavMenuType) {
    const path = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        className="group/data"
                    >
                        <Link href={item.href}>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    isActive={path === item.href}
                                    className="cursor-pointer"
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}