'use client';

import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { LogOut, Settings, UserRound } from 'lucide-react';
import { Separator } from '../ui/separator';

export function AvatarProfile() {
    const { session } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="rounded-md text-muted-foregorund/80 w-10 h-10">
                    <AvatarImage alt={session?.username} />
                    <AvatarFallback>
                        {session?.firstName.charAt(0)}
                        {session?.lastName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-3">
                <DropdownMenuItem className="flex flex-col items-start gap-0">
                    <span className="text-xs font-semibold text-muted-foreground/80">
                        {session?.firstName} {session?.lastName}
                    </span>
                    <span className="text-xs font-light text-muted-foreground/60">
                        {session?.firstName} {session?.lastName}
                    </span>
                </DropdownMenuItem>
                <Separator />
                <Link href="/perfil" className="text-xs font-medium">
                    <DropdownMenuItem className="text-muted-foreground/80 flex items-center gap-1">
                        <UserRound className="w-3 h-3" />
                        <span className="text-xs font-light">Perfil</span>
                    </DropdownMenuItem>
                </Link>
                <Link href="/settings">
                    <DropdownMenuItem className="text-muted-foreground/80 flex items-center gap-1">
                        <Settings className="w-3 h-3" />
                        <span className="text-xs font-light">
                            Configurações
                        </span>
                    </DropdownMenuItem>
                </Link>
                <Separator />
                <DropdownMenuItem className="text-red-700 mt-1 bg-red-100 w-full flex items-center gap-1">
                    <LogOut className="w-3 h-3" />
                    <span className="text-xs font-light">Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
