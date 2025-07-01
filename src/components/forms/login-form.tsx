'use client';

import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Lock, UserRound } from 'lucide-react';
import { Separator } from '../ui/separator';

const loginSchema = z.object({
    username: z.string().min(1, 'username ou senha inválidos'),
    password: z.string().min(1, 'username ou senha inválidos'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    async function onSubmit(data: LoginFormData) {
        try {
            const response = await api.post('auth/login', data);
            if (response.status === 200) {
                window.localStorage.setItem(
                    'nt.authtoken',
                    response.data.token
                );
                router.push('/dashboard');
            }
        } catch (error: any) {
            if (error.status === 400) {
                form.setError('username', {
                    message: 'Usuário ou senha inválidos',
                });
                form.setError('password', {
                    message: 'Usuário ou senha inválidos',
                });
            }
        }
    }

    return (
        <section className="h-screen w-full flex items-center justify-around p-12">
            <div>
                <Image
                    src="/session.svg"
                    width={512}
                    height={512}
                    alt="Session"
                />
            </div>
            <Card className="shadow-none min-w-[420px] py-16 px-10 gap-10">
                <CardHeader className="flex flex-col items-center justify-center">
                    <CardTitle>Login</CardTitle>
                    <CardDescription className="text-xs">
                        Faça login para continuar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="absolute top-3 left-2">
                                            <UserRound className="text-primary w-5 h-5" />
                                        </FormLabel>
                                        <Input
                                            className="py-5 pl-8"
                                            placeholder="username"
                                            {...field}
                                            type="text"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="absolute top-3 left-2">
                                            <Lock className="text-primary w-5 h-5" />
                                        </FormLabel>
                                        <Input
                                            className="py-5 pl-8"
                                            placeholder="*********"
                                            {...field}
                                            type="password"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={form.formState.isSubmitting}
                                type="submit"
                                className="w-full cursor-pointer"
                            >
                                Entrar
                            </Button>
                            <Separator />
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col gap-1 items-center justify-center">
                    <Image src="/logo.svg" width={28} height={28} alt="Logo" />
                    <p className="text-sm font-semibold text-foreground/80">
                        Notetools
                    </p>
                    <CardDescription className="text-[10px] font-light text-foreground/50">
                        © 2024 - 2025 Todos os direitos reservados
                    </CardDescription>
                </CardFooter>
            </Card>
        </section>
    );
}
