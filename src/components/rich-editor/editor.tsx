'use client';

import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useEffect, useMemo } from 'react';

const fonts = ['poppins', 'barlow', 'inter'];

// Forçando a tipagem correta
const Quill = ReactQuill.Quill;
const Font = Quill.import('formats/font') as {
    new (): any;
    whitelist: string[];
} as any;
Font.whitelist = fonts;
Quill.register(Font, true);

// Adiciona as classes de fonte manualmente
const fontStyle = `
  .ql-font-poppins { font-family: 'Poppins', sans-serif; }
  .ql-font-barlow { font-family: 'Barlow', sans-serif; }
  .ql-font-inter { font-family: 'Inter', sans-serif; }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="poppins"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="poppins"]::before {
    content: "Poppins";
    font-family: 'Poppins', sans-serif;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="barlow"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="barlow"]::before {
    content: "Barlow";
    font-family: 'Barlow', sans-serif;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="inter"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="inter"]::before {
    content: "Inter";
    font-family: 'Inter', sans-serif;
  }
`;

type TextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
};

export function TextEditor({ value, onChange, onBlur }: TextEditorProps) {
    const modules = useMemo(
        () => ({
            toolbar: [
                [{ font: fonts }],
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['clean'],
            ],
        }),
        []
    );

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = fontStyle;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="h-[75vh] overflow-y-scroll">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="h-[72vh] overflow-y-scroll border-muted"
                modules={modules}
            />
        </div>
    );
}
