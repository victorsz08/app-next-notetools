'use client';

import type React from 'react';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Save, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormMessage } from '../ui/form';

type UserData = {
    username: string;
    firstName: string;
    lastName: string;
};

const userSchema = z.object({
    username: z.string().nonempty('o campo username é obrigatório'),
    firstName: z.string().nonempty('o campo nome é obrigatório'),
    lastName: z.string().nonempty('o campo sobrenome é obrigatório'),
});

type updateUserForm = z.infer<typeof userSchema>;

export function Profile() {
    const { session } = useAuth();
    const [userData, setUserData] = useState<UserData>({
        username: session?.username || '',
        firstName: session?.firstName || '',
        lastName: session?.lastName || '',
    });

    const form = useForm<updateUserForm>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: userData?.username,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
        },
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>
                        Atualize seus dados pessoais e foto de perfil
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-6">
                            {/* Avatar */}
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage alt="Avatar do usuário" />
                                    <AvatarFallback className="text-lg">
                                        {getInitials(
                                            userData.firstName,
                                            userData.lastName
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-2"></div>
                            </div>

                            <Separator />

                            {/* Campos do formulário */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">
                                                Nome
                                            </Label>
                                            <Input
                                                id="firstName"
                                                value={userData.firstName}
                                                onChange={field.onChange}
                                                placeholder="Seu nome"
                                            />
                                            <FormMessage className="text-[10px]" />
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">
                                                Sobrenome
                                            </Label>
                                            <Input
                                                id="lastName"
                                                value={userData.lastName}
                                                onChange={field.onChange}
                                                placeholder="Seu sobrenome"
                                            />
                                            <FormMessage className="text-[10px]" />
                                        </div>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="username">
                                            Nome de Usuário
                                        </Label>
                                        <Input
                                            id="username"
                                            value={userData.username}
                                            onChange={field.onChange}
                                            placeholder="Seu nome de usuário"
                                        />
                                        <FormMessage className="text-[10px]" />
                                    </div>
                                )}
                            />

                            <Button
                                type="submit"
                                className="flex items-center gap-2"
                            >
                                <Save className="h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Seção de Alteração de Senha */}
            <Card>
                <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>
                        Mantenha sua conta segura com uma senha forte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Senha Atual</Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    type={
                                        showPasswords.current
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Digite sua senha atual"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() =>
                                        togglePasswordVisibility('current')
                                    }
                                >
                                    {showPasswords.current ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newPassword">Nova Senha</Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={
                                        showPasswords.new ? 'text' : 'password'
                                    }
                                    placeholder="Digite sua nova senha"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() =>
                                        togglePasswordVisibility('new')
                                    }
                                >
                                    {showPasswords.new ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirmar Nova Senha
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={
                                        showPasswords.confirm
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Confirme sua nova senha"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() =>
                                        togglePasswordVisibility('confirm')
                                    }
                                >
                                    {showPasswords.confirm ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-medium mb-2">
                                Requisitos da senha:
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Mínimo de 8 caracteres</li>
                                <li>• Pelo menos uma letra maiúscula</li>
                                <li>• Pelo menos uma letra minúscula</li>
                                <li>• Pelo menos um número</li>
                                <li>• Pelo menos um caractere especial</li>
                            </ul>
                        </div>

                        <Button
                            type="submit"
                            className="flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
