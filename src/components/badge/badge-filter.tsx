'use client';

export interface BadgeFilterProps {
    children?: React.ReactNode;
}

export function BadgeStatus({ children }: BadgeFilterProps) {
    return (
        <div className="border border-muted-foreground/60 text-foreground rounded-full px-2 flex items-center gap-2 text-xs font-medium py-1">
            {children}
        </div>
    );
}
