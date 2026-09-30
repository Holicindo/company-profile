'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { useEffect, useCallback } from 'react';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Quote, Link as LinkIcon, ImageIcon,
  AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, Heading3, Minus, Undo, Redo, Code,
  Table as TableIcon, Plus, Trash2, RowsIcon, Columns,
} from 'lucide-react';

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Tulis konten di sini...', minHeight = '400px' }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none px-5 py-4',
        style: `min-height: ${minHeight}`,
      },
    },
  });

  // Sync external value changes (e.g. when loading data)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes('link').href || '';
    const url = window.prompt('URL Link:', prev);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL Gambar (https://...):');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const insertTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) return null;

  const ToolbarBtn = ({
    onClick, active = false, disabled = false, title, children,
  }: {
    onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: React.ReactNode;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active
          ? 'bg-brand-500/20 text-brand-600'
          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );

  const Divider = () => <div className="w-px h-5 bg-slate-200 mx-1" />;

  const isInTable = editor.isActive('table');

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-brand-400 focus-within:border-transparent transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-neutral-100 bg-slate-50">
        {/* Undo/Redo */}
        <ToolbarBtn title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo size={15} />
        </ToolbarBtn>

        <Divider />

        {/* Headings */}
        <ToolbarBtn title="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 size={15} />
        </ToolbarBtn>

        <Divider />

        {/* Marks */}
        <ToolbarBtn title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Code" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code size={15} />
        </ToolbarBtn>

        <Divider />

        {/* Alignment */}
        <ToolbarBtn title="Rata Kiri" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
          <AlignLeft size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Rata Tengah" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
          <AlignCenter size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Rata Kanan" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
          <AlignRight size={15} />
        </ToolbarBtn>

        <Divider />

        {/* Lists */}
        <ToolbarBtn title="Bullet List" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Numbered List" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Blockquote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={15} />
        </ToolbarBtn>

        <Divider />

        {/* Link & Image */}
        <ToolbarBtn title="Insert Link" active={editor.isActive('link')} onClick={addLink}>
          <LinkIcon size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Insert Image (URL)" onClick={addImage}>
          <ImageIcon size={15} />
        </ToolbarBtn>

        <Divider />

        {/* Table */}
        <ToolbarBtn title="Insert Table (3×3)" active={isInTable} onClick={insertTable}>
          <TableIcon size={15} />
        </ToolbarBtn>

        {/* Table context actions — hanya muncul kalau cursor di dalam tabel */}
        {isInTable && (
          <>
            <ToolbarBtn title="Tambah Baris di Bawah" onClick={() => editor.chain().focus().addRowAfter().run()}>
              <span className="flex items-center gap-0.5 text-[11px] font-semibold"><RowsIcon size={13} /><Plus size={11} /></span>
            </ToolbarBtn>
            <ToolbarBtn title="Tambah Kolom di Kanan" onClick={() => editor.chain().focus().addColumnAfter().run()}>
              <span className="flex items-center gap-0.5 text-[11px] font-semibold"><Columns size={13} /><Plus size={11} /></span>
            </ToolbarBtn>
            <ToolbarBtn title="Hapus Baris" onClick={() => editor.chain().focus().deleteRow().run()}>
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-red-400"><RowsIcon size={13} /><Trash2 size={11} /></span>
            </ToolbarBtn>
            <ToolbarBtn title="Hapus Kolom" onClick={() => editor.chain().focus().deleteColumn().run()}>
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-red-400"><Columns size={13} /><Trash2 size={11} /></span>
            </ToolbarBtn>
            <ToolbarBtn title="Hapus Tabel" onClick={() => editor.chain().focus().deleteTable().run()}>
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-red-500"><TableIcon size={13} /><Trash2 size={11} /></span>
            </ToolbarBtn>
          </>
        )}
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />

      {/* Table styles */}
      <style jsx global>{`
        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
          overflow: hidden;
          border-radius: 6px;
        }
        .ProseMirror td, .ProseMirror th {
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          vertical-align: top;
          min-width: 80px;
          position: relative;
        }
        .ProseMirror th {
          background: #f8f9fa;
          font-weight: 600;
          text-align: left;
        }
        .ProseMirror .selectedCell::after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(201, 168, 76, 0.15);
          pointer-events: none;
        }
        .ProseMirror .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0; bottom: 0;
          width: 4px;
          background: #C9A84C;
          cursor: col-resize;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}
