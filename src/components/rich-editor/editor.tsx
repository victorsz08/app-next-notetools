'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false, // This is crucial for preventing SSR issues
});

interface QuillEditorProps {
    value: string;
    onChange: (content: string) => void;
}

export function EditorText({ value, onChange }: QuillEditorProps) {
    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ direction: 'rtl' }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],
                ['link', 'image', 'video'],
                ['clean'],
            ],
            clipboard: {
                matchVisual: false,
            },
        }),
        []
    );

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'code-block',
        'list',
        'bullet',
        'script',
        'sub',
        'super',
        'indent',
        'direction',
        'size',
        'color',
        'background',
        'font',
        'align',
        'link',
        'image',
        'video',
        'clean',
    ];

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules} // Make sure to pass modules and formats
                formats={formats}
            />
        </div>
    );
}
