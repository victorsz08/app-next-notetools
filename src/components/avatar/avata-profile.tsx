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
import { LogOut, UserRound } from 'lucide-react';
import { Separator } from '../ui/separator';

export function AvatarProfile() {
    const { session, logout } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="border-3 cursor-pointer hover:bg-muted-foreground/80 border-primary text-muted-foregorund/80 w-10 h-10">
                    <AvatarImage
                        src={session?.avatarUrl}
                        alt={session?.username}
                    />
                    <AvatarFallback className="font-semibold text-sm text-muted-foreground/70">
                        {session?.firstName.charAt(0)}
                        {session?.lastName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
                <DropdownMenuItem className="flex flex-col items-start gap-0">
                    <span className="text-xs font-semibold text-muted-foreground/80">
                        {session?.firstName} {session?.lastName}
                    </span>
                    <span className="text-xs font-light text-muted-foreground/60">
                        @{session?.username}
                    </span>
                </DropdownMenuItem>
                <Separator className="mb-1" />
                <Link
                    href="/perfil"
                    className="text-xs font-medium cursor-pointer"
                >
                    <DropdownMenuItem className="text-muted-foreground/80 cursor-pointer flex items-center gap-1">
                        <UserRound className="w-3 h-3" />
                        <span className="text-xs font-light">Perfil</span>
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                    onClick={() => logout()}
                    className="text-red-700 cursor-pointer mt-1 bg-red-100 w-full flex items-center gap-1"
                >
                    <LogOut className="w-3 h-3 text-red-700" />
                    <span className="text-xs font-light">Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
