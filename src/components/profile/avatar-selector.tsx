"use client"

import type React from "react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, Link, Check, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface AvatarSelectorProps {
    currentAvatar?: string;
    fallbackText: string;
    onAvatarChange: (avatarUrl: string) => void;
}

const predefinedAvatars = [
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Felix',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Aneka',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Bella',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Charlie',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Diana',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Edward',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Fluffy',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Garfield',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Harley',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Izzy',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Jack',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Kiki',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Luna',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Max',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Nala',
    'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Oscar',
];

export function AvatarSelector({
    currentAvatar,
    fallbackText,
    onAvatarChange,
}: AvatarSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || '');
    const [customUrl, setCustomUrl] = useState('');

    const handleUrlSubmit = () => {
        if (customUrl) {
            try {
                new URL(customUrl);
                setSelectedAvatar(customUrl);
                toast.success('URL do avatar adicionada!');
            } catch {
                toast.error('URL inválida. Verifique o link.');
            }
        }
    };

    const handleSaveAvatar = () => {
        if (selectedAvatar) {
            onAvatarChange(selectedAvatar);
            setIsOpen(false);
            toast.success('Avatar atualizado com sucesso!');
        }
    };

    const handleRemoveAvatar = () => {
        setSelectedAvatar('');
        onAvatarChange('');
        setIsOpen(false);
        toast.success('Avatar removido!');
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={currentAvatar} alt="Avatar do usuário" />
                    <AvatarFallback className="text-lg">
                        {fallbackText}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex flex-col justify-center min-w-[140px]">
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            {currentAvatar
                                ? 'Alterar Avatar'
                                : 'Adicionar Avatar'}
                            <Camera className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    {currentAvatar && (
                        <Button
                            variant="destructive"
                            onClick={handleRemoveAvatar}
                        >
                            Remover Avatar
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Escolher Avatar</DialogTitle>
                    <DialogDescription>
                        Selecione um avatar pré-definido, faça upload de uma
                        imagem ou use um link
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="predefined" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="predefined">
                            Pré-definidos
                        </TabsTrigger>
                        <TabsTrigger value="url">URL</TabsTrigger>
                    </TabsList>

                    <TabsContent value="predefined" className="space-y-4">
                        <div className="grid grid-cols-4 gap-4">
                            {predefinedAvatars.map((avatar, index) => (
                                <div
                                    key={index}
                                    className={`relative cursor-pointer rounded-lg border-2 p-2 transition-all hover:border-primary ${
                                        selectedAvatar === avatar
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border'
                                    }`}
                                    onClick={() => setSelectedAvatar(avatar)}
                                >
                                    <Avatar className="h-16 w-16 mx-auto">
                                        <AvatarImage
                                            src={avatar || '/placeholder.svg'}
                                            alt={`Avatar ${index + 1}`}
                                        />
                                        <AvatarFallback>
                                            A{index + 1}
                                        </AvatarFallback>
                                    </Avatar>
                                    {selectedAvatar === avatar && (
                                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                                            <Check className="h-3 w-3" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="url" className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="avatar-url">
                                    URL da Imagem
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="avatar-url"
                                        placeholder="https://exemplo.com/avatar.jpg"
                                        value={customUrl}
                                        onChange={(e) =>
                                            setCustomUrl(e.target.value)
                                        }
                                    />
                                    <Button
                                        onClick={handleUrlSubmit}
                                        variant="outline"
                                    >
                                        <Link className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            {selectedAvatar &&
                                selectedAvatar.startsWith('http') && (
                                    <div className="flex items-center justify-center">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage
                                                src={
                                                    selectedAvatar ||
                                                    '/placeholder.svg'
                                                }
                                                alt="Avatar da URL"
                                            />
                                            <AvatarFallback>URL</AvatarFallback>
                                        </Avatar>
                                    </div>
                                )}
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSaveAvatar}
                        disabled={!selectedAvatar}
                    >
                        Salvar Avatar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
