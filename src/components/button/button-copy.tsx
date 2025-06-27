'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CopyBadgeProps {
    text: string;
    className?: string;
    showText?: boolean;
}

export function CopyBadge({
    text,
    className,
    showText = false,
}: CopyBadgeProps) {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            toast.info('Copiado para área de transferência!');
            setTimeout(() => setIsCopied(false), 1500);
        } catch (err) {
            console.error('Falha ao copiar: ', err);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className={cn(
                'h-fit px-2 text-xs transition-all duration-200',
                isCopied
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'hover:bg-muted',
                !showText && 'w-6 p-0',
                className
            )}
            title={isCopied ? 'Copiado!' : `Copiar: ${text}`}
        >
            {isCopied ? (
                <>
                    <Check className="w-3 h-3" />
                    {showText && <span className="ml-1">OK</span>}
                </>
            ) : (
                <>
                    <Copy className="w-3 h-3" />
                    {showText && <span className="ml-1">Copiar</span>}
                </>
            )}
        </Button>
    );
}
