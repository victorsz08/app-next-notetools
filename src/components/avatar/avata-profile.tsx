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
import { UserRound } from 'lucide-react';

export function AvatarProfile() {
    const { session } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="rounded-sm w-14 h-14">
                    <AvatarImage alt={session?.username} />
                    <AvatarFallback>
                        {session?.firstName.charAt(0)}
                        {session?.lastName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="text-muted-foreground/80 flex items-center gap-1">
                    <UserRound className="w-3 h-3" />
                    <Link href="/perfil" className="text-xs font-medium">
                        perfil
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
