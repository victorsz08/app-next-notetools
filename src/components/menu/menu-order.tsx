'use client';

import { DataOrder } from '@/@types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Ellipsis } from 'lucide-react';

interface MenuOrderProps {
    order: DataOrder;
}

export function MenuOrder({ order }: MenuOrderProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost">
                    <Ellipsis className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start"></DropdownMenuContent>
        </DropdownMenu>
    );
}
