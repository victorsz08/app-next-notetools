import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function CidadeCombobox({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    const { data: cities } = useQuery<string[]>({
        queryKey: ['cities'],
        queryFn: async () => {
            const response = await api.get('cities');
            const data = response.data;

            return data;
        },
        refetchOnWindowFocus: false,
        initialData: [],
    });

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filteredCities =
        search.length >= 3
            ? cities.filter((city) =>
                  city.toLowerCase().includes(search.toLowerCase())
              )
            : [];

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {
                    <button className="w-full border-muted-foreground/30 h-12 border rounded px-3 py-2 text-sm text-left">
                        {value}
                    </button>
                }
            </PopoverTrigger>
            <PopoverContent className="w-full  p-0">
                <Command>
                    <CommandInput
                        placeholder="Buscar cidade..."
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        <CommandEmpty>Nenhuma cidade encontrada</CommandEmpty>
                        {filteredCities.map((city) => (
                            <CommandItem
                                key={city}
                                onSelect={() => {
                                    onChange(city);
                                    setOpen(false);
                                }}
                            >
                                {city}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
