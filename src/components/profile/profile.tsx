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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormMessage } from '../ui/form';
import { toast } from 'sonner';
import { AvatarSelector } from './avatar-selector';

type UserData = {
    username: string;
    firstName: string;
    lastName: string;
    avatarImageUrl: string;
};

const userSchema = z.object({
    username: z.string().nonempty('o campo username é obrigatório'),
    firstName: z.string().nonempty('o campo nome é obrigatório'),
    lastName: z.string().nonempty('o campo sobrenome é obrigatório'),
});

const updatePasswordSchema = z.object({
    currentPassword: z.string().nonempty('o campo senha atual é obrigatório'),
    newPassword: z
        .string()
        .nonempty('o campo nova senha é obrigatório')
        .min(8, 'a senha deve ter no mínimo 8 caracteres')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'a senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
        ),
    confirmNewPassword: z
        .string()
        .nonempty('o campo confirmar nova senha é obrigatório')
        .refine((data: any) => data.newPassword === data.confirmNewPassword, {
            message: 'as senhas não correspondem',
            path: ['confirmNewPassword'],
        }),
});

type updateUserForm = z.infer<typeof userSchema>;
type updatePasswordForm = z.infer<typeof updatePasswordSchema>;

export function Profile() {
    const { session } = useAuth();
    const userId = session?.id;

    const queryClient = useQueryClient();
    const [userData, setUserData] = useState<UserData>({
        username: session?.username || '',
        firstName: session?.firstName || '',
        lastName: session?.lastName || '',
        avatarImageUrl: session?.avatarUrl || '',
    });

    const form = useForm<updateUserForm>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: userData?.username,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
        },
    });

    const formPassword = useForm<updatePasswordForm>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
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

    const { mutate: updateUser, isPending: updateUserIsPending } = useMutation({
        mutationFn: async (data: updateUserForm) => {
            await api.put(`users/${userId}`, data);
            return;
        },
        mutationKey: ['updateUser'],
        onSuccess: () => {
            toast.success('Dados atualizados com sucesso');
        },
        onError: () => {
            toast.error('Erro ao atualizar dados');
        },
    });

    const { mutate: updateAvatarUser, isPending: updateAvatarIsPending } =
        useMutation({
            mutationFn: async (url: string) => {
                await api.put(`users/update-avatar/${userId}/`, {
                    avatarUrl: url,
                });
                return;
            },
            mutationKey: ['updateAvatar'],
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['session'] });
                toast.success('Avatar atualizado com sucesso');
            },
        });

    function handleAvatarChange(imageUrl: string) {
        updateAvatarUser(imageUrl);
        setUserData((prev) => ({
            ...prev,
            avatarImageUrl: imageUrl,
        }));
    }

    function updatePasswordSubmit(data: updatePasswordForm) {
        updatePassword(data);
    }

    function updateUserSubmit(data: updateUserForm) {
        updateUser(data);
    }

    const { mutate: updatePassword, isPending: updatePasswordIsPending } =
        useMutation({
            mutationFn: async (data: updatePasswordForm) => {
                await api.put(`users/update-password/${userId}/`, {
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                });

                return;
            },
            mutationKey: ['updatePassword'],
            onSuccess: () => {
                toast.success('Senha atualizada com sucesso');
            },
            onError: (error: any) => {
                error.response.data.details.forEach((error: any) => {
                    form.setError(error.issue, {
                        message: error.message,
                    });
                });
            },
        });

    return (
        <div className="w-full mt-4 space-y-6">
            <Card className="shadow-none w-full">
                <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>
                        Atualize seus dados pessoais e foto de perfil
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            className="space-y-6"
                            onSubmit={form.handleSubmit(updateUserSubmit)}
                        >
                            {/* Avatar */}
                            <AvatarSelector
                                currentAvatar={userData.avatarImageUrl}
                                fallbackText={getInitials(
                                    userData.firstName,
                                    userData.lastName
                                )}
                                onAvatarChange={handleAvatarChange}
                            />

                            <Separator />

                            {/* Campos do formulário */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <div className="space-y-0">
                                            <Label
                                                className="text-xs"
                                                htmlFor="firstName"
                                            >
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
                                        <div className="space-y-0">
                                            <Label
                                                className="text-xs"
                                                htmlFor="lastName"
                                            >
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
                                    <div className="space-y-0">
                                        <Label
                                            className="text-xs"
                                            htmlFor="username"
                                        >
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
                                disabled={updateUserIsPending}
                            >
                                <Save className="h-4 w-4" />
                                {updateUserIsPending
                                    ? 'Atualizando...'
                                    : 'Atualizar'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Seção de Alteração de Senha */}
            <Card className="shadow-none">
                <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>
                        Mantenha sua conta segura com uma senha forte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        className="space-y-4"
                        onSubmit={formPassword.handleSubmit(
                            updatePasswordSubmit
                        )}
                    >
                        <FormField
                            control={formPassword.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <div className="space-y-0">
                                    <Label
                                        className="text-xs"
                                        htmlFor="currentPassword"
                                    >
                                        Senha Atual
                                    </Label>
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
                                                togglePasswordVisibility(
                                                    'current'
                                                )
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
                            )}
                        />

                        <FormField
                            control={formPassword.control}
                            name="newPassword"
                            render={({ field }) => (
                                <div className="space-y-0">
                                    <Label
                                        className="text-xs"
                                        htmlFor="newPassword"
                                    >
                                        Nova Senha
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="newPassword"
                                            type={
                                                showPasswords.new
                                                    ? 'text'
                                                    : 'password'
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
                            )}
                        />

                        <div className="space-y-0">
                            <Label
                                className="text-xs"
                                htmlFor="confirmPassword"
                            >
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
                            disabled={updatePasswordIsPending}
                        >
                            <Save className="h-4 w-4" />
                            {updatePasswordIsPending
                                ? 'Atualizando...'
                                : 'Atualizar senha'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
