"use client"

import type { LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

type NavMenuType = {
  items: {
    title: string
    href: string
    icon: LucideIcon
  }[]
}

export function NavMenu({ items }: NavMenuType) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Navegação
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={pathname === item.href}
                className="transition-colors duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
