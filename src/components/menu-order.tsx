import { EllipsisIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UpdateStatusOrder } from './forms/update-status-order';
import { DataOrder } from '@/@types';
import { UpdateSchedulingOrder } from './forms/update-scheduling-order';
import { UpdateOrder } from './forms/update-order';
import { DeleteOrderDialog } from './forms/delete-order';

export default function MenuOrder({ order }: { order: DataOrder }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full shadow-none"
                    aria-label="Open edit menu"
                >
                    <EllipsisIcon size={16} aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col justify-start items-start">
                <DropdownMenuItem asChild>
                    <UpdateStatusOrder order={order} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <UpdateSchedulingOrder order={order} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <UpdateOrder order={order} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <DeleteOrderDialog order={order} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
