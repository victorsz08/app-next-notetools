'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, FileText, Calendar } from 'lucide-react';
import { DataNote } from '@/@types';
import { useAuth } from '@/context/auth-context';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import moment from 'moment';
import ReactQuill from 'react-quill';
import { TextEditor } from '../rich-editor/editor';
import { toast } from 'sonner';

export function NotesApp() {
    const queryClient = useQueryClient();
    const { session } = useAuth();
    const userId = session?.id;

    const getNotes = async () => {
        const response = await api.get(`notes/list/${userId}?page=1&limit=100`);

        if (response.status !== 200) {
            toast.error('Erro ao carregar os suas anotações!');
        }

        const data: DataNote[] = response.data.notes;

        return data;
    };

    const { data: notes } = useQuery({
        queryFn: getNotes,
        queryKey: ['notes'],
        enabled: !!userId,
        refetchOnWindowFocus: false,
        initialData: [],
    });

    const [selectedNote, setSelectedNote] = useState<DataNote | null>(notes[0]);

    const { mutate: createNote } = useMutation({
        mutationFn: async () => {
            await api.post(`notes/${userId}`, {
                title: 'Nova nota',
                content: 'Comece a utilizar as notas...',
            });

            return;
        },
        mutationKey: ['create-note'],
        onSuccess: () => {
            setSelectedNote(notes[0]);
            toast.success('Anotação criada com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
        onError: () => {
            toast.error('Erro ao criar nova anotação!');
        },
    });

    const { mutate: updateNote } = useMutation({
        mutationFn: async (data: DataNote) => {
            await api.put(`notes/${data.id}`, {
                title: data.title,
                content: data.content,
            });

            return;
        },
        mutationKey: ['update-note'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            toast.success('Anotação criada com sucesso!');
        },
        onError: () => {
            toast.error('Erro ao atualizar anotação!');
        },
    });

    const { mutate: deleteNote } = useMutation({
        mutationFn: async (data: DataNote) => {
            await api.delete(`notes/${data.id}`);
            return;
        },
        mutationKey: ['delete-note'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            setSelectedNote(null);
            toast.success('Anotação deletada com sucesso!');
        },
        onError: () => {
            toast.error('Erro ao deletar anotação');
        },
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [editingTitle, setEditingTitle] = useState(false);

    const filteredNotes = notes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar - Lista de Notas */}
            <div className="w-80 border-r bg-muted/30">
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-semibold">Anotações</h1>
                        <Button
                            onClick={() => createNote()}
                            size="sm"
                            className="gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Nova anotação
                        </Button>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar anotações..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1 h-[calc(100vh-140px)]">
                    <div className="p-2">
                        {filteredNotes.length === 0 ? (
                            <div className="text-center text-sm py-8 text-muted-foreground/80">
                                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>Nenhuma anotação encontrada</p>
                            </div>
                        ) : (
                            filteredNotes.map((note) => (
                                <Card
                                    key={note.id}
                                    className={`flex mb-2 flex-col justify-between w-[300px] h-[150px] cursor-pointer transition-colors hover:bg-muted/50 ${
                                        selectedNote?.id === note.id
                                            ? 'ring-2 ring-primary bg-muted/50'
                                            : ''
                                    }`}
                                    onClick={() => setSelectedNote(note)}
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <h3 className="font-medium text-sm line-clamp-1">
                                                {note.title}
                                            </h3>
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {
                                                    formatDate(
                                                        moment(
                                                            note.updatedAt
                                                        ).toDate()
                                                    ).split(' ')[0]
                                                }
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <p className="text-xs mb-1 text-muted-foreground line-clamp-2">
                                            {note.content
                                                .replace(/<[^>]*>/g, '')
                                                .substring(20) ||
                                                'Sem conteúdo'}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(
                                                moment(note.updatedAt).toDate()
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Editor Principal */}
            <div className="flex-1 flex flex-col">
                {selectedNote ? (
                    <>
                        <div className="p-4 border-b bg-white">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    {editingTitle ? (
                                        <Input
                                            value={selectedNote.title}
                                            onChange={(e) =>
                                                setSelectedNote({
                                                    ...selectedNote,
                                                    title: e.target.value,
                                                })
                                            }
                                            onBlur={() => {
                                                setEditingTitle(false);
                                                updateNote(selectedNote);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    setEditingTitle(false);
                                                    updateNote(selectedNote);
                                                }
                                            }}
                                            className="text-xl font-semibold border-none p-0 h-auto focus-visible:ring-0"
                                            autoFocus
                                        />
                                    ) : (
                                        <h2
                                            className="text-lg font-semibold text-muted-foreground/80 cursor-pointer hover:text-muted-foreground"
                                            onClick={() =>
                                                setEditingTitle(true)
                                            }
                                        >
                                            {selectedNote.title}
                                        </h2>
                                    )}
                                    <p className="text-xs text-muted-foreground/70 mt-1">
                                        Criado em{' '}
                                        {formatDate(
                                            moment(
                                                selectedNote.createdAt
                                            ).toDate()
                                        )}{' '}
                                        • Atualizado em{' '}
                                        {formatDate(
                                            moment(
                                                selectedNote.updatedAt
                                            ).toDate()
                                        )}
                                    </p>
                                </div>

                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteNote(selectedNote)}
                                >
                                    Excluir
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 p-4">
                            <TextEditor
                                value={selectedNote.content}
                                onChange={(content) => {
                                    setSelectedNote({
                                        ...selectedNote,
                                        content: content,
                                    });
                                }}
                                key={selectedNote.id}
                                onBlur={() => {
                                    updateNote(selectedNote);
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-medium mb-0">
                                Selecione uma anotação
                            </h3>
                            <p className="text-xs font-light text-muted-foreground/70">
                                Escolha uma anotação da lista ou crie uma nova
                                para começar
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
