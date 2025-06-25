import { NotesApp } from '@/components/notes/app-notes';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Anotações',
};

export default function NotesPage() {
    return (
        <main className="bg-white">
            <NotesApp />
        </main>
    );
}
