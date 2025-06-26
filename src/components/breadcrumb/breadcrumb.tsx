'use client';

import { usePathname } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { House } from 'lucide-react';
import { Fragment } from 'react';

export function BreadcrumbGroup() {
    const pathname = usePathname();
    const pathnames = pathname.split('/').filter((path) => path !== '');

    return (
        <Breadcrumb>
            <BreadcrumbList className="text-muted-foreground/40 text-xs flex items-center">
                <House className="w-4 h-4" />
                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                <BreadcrumbItem>Operacao</BreadcrumbItem>
                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                {pathnames.map((path, index) => (
                    <Fragment key={index}>
                        <BreadcrumbItem
                            className={`${
                                pathname.endsWith(path) &&
                                'text-muted-foreground/90 font-medium'
                            }`}
                        >
                            {path.charAt(0).toUpperCase() + path.slice(1)}
                        </BreadcrumbItem>
                        {pathnames.length - 1 > index && (
                            <BreadcrumbSeparator> / </BreadcrumbSeparator>
                        )}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
