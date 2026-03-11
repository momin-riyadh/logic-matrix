'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import ImageResize from 'tiptap-extension-resize-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { useEffect, useCallback, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    Bold,
    Italic,
    UnderlineIcon,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link as LinkIcon,
    Minus,
    Code2,
    ImageIcon,
    Upload,
    Globe,
} from 'lucide-react';

function TBtn({
    onClick,
    active,
    disabled,
    tip,
    children,
}: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    tip: string;
    children: React.ReactNode;
}) {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        type='button'
                        aria-label={tip}
                        disabled={disabled}
                        onMouseDown={e => {
                            e.preventDefault();
                            onClick();
                        }}
                        className={[
                            'inline-flex items-center justify-center rounded-md w-8 h-8 transition-colors',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'disabled:pointer-events-none disabled:opacity-40 text-sm',
                            active
                                ? 'bg-accent text-accent-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                        ].join(' ')}
                    >
                        {children}
                    </button>
                </TooltipTrigger>
                <TooltipContent side='top' className='text-xs px-2 py-1'>
                    {tip}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

function ImageDialog({
    open,
    onClose,
    onInsert,
}: {
    open: boolean;
    onClose: () => void;
    onInsert: (src: string, alt: string) => void;
}) {
    const [urlSrc, setUrlSrc] = useState('');
    const [urlAlt, setUrlAlt] = useState('');
    const [uploadSrc, setUploadSrc] = useState<string | null>(null);
    const [uploadAlt, setUploadAlt] = useState('');
    const [dragging, setDragging] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const reset = () => {
        setUrlSrc('');
        setUrlAlt('');
        setUploadSrc(null);
        setUploadAlt('');
        setDragging(false);
    };
    const close = () => {
        reset();
        onClose();
    };
    const insertUrl = () => {
        if (!urlSrc.trim()) return;
        onInsert(urlSrc.trim(), urlAlt.trim());
        close();
    };
    const insertUpload = () => {
        if (!uploadSrc) return;
        onInsert(uploadSrc, uploadAlt.trim());
        close();
    };

    const readFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = e => {
            setUploadSrc(e.target?.result as string);
            if (!uploadAlt) setUploadAlt(file.name.replace(/\.[^/.]+$/, ''));
        };
        reader.readAsDataURL(file);
    };

    return (
        <Dialog open={open} onOpenChange={v => !v && close()}>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-2 text-base'>
                        <ImageIcon className='w-4 h-4' /> Insert Image
                    </DialogTitle>
                </DialogHeader>
                <Tabs defaultValue='url' className='mt-1'>
                    <TabsList className='w-full'>
                        <TabsTrigger
                            value='url'
                            className='flex-1 gap-1.5 text-xs'
                        >
                            <Globe className='w-3.5 h-3.5' /> From URL
                        </TabsTrigger>
                        <TabsTrigger
                            value='upload'
                            className='flex-1 gap-1.5 text-xs'
                        >
                            <Upload className='w-3.5 h-3.5' /> Upload
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='url' className='space-y-3 pt-3'>
                        <div className='space-y-1.5'>
                            <Label htmlFor='img-url' className='text-xs'>
                                Image URL
                            </Label>
                            <Input
                                id='img-url'
                                autoFocus
                                placeholder='https://example.com/photo.jpg'
                                value={urlSrc}
                                onChange={e => setUrlSrc(e.target.value)}
                                onKeyDown={e =>
                                    e.key === 'Enter' && insertUrl()
                                }
                            />
                        </div>
                        <div className='space-y-1.5'>
                            <Label htmlFor='img-alt' className='text-xs'>
                                Alt text{' '}
                                <span className='text-muted-foreground font-normal'>
                                    (optional)
                                </span>
                            </Label>
                            <Input
                                id='img-alt'
                                placeholder='Describe the image…'
                                value={urlAlt}
                                onChange={e => setUrlAlt(e.target.value)}
                            />
                        </div>
                        {urlSrc && (
                            <div className='rounded-lg border bg-muted/30 aspect-video overflow-hidden flex items-center justify-center'>
                                <img
                                    src={urlSrc}
                                    alt={urlAlt || 'preview'}
                                    className='max-w-full max-h-full object-contain'
                                    onError={e => {
                                        e.currentTarget.style.display = 'none';
                                        (
                                            e.currentTarget
                                                .nextElementSibling as HTMLElement
                                        )?.classList.remove('hidden');
                                    }}
                                />
                                <p className='hidden text-xs text-muted-foreground'>
                                    Could not load preview
                                </p>
                            </div>
                        )}
                        <DialogFooter className='pt-1'>
                            <Button variant='outline' size='sm' onClick={close}>
                                Cancel
                            </Button>
                            <Button
                                size='sm'
                                onClick={insertUrl}
                                disabled={!urlSrc.trim()}
                            >
                                Insert
                            </Button>
                        </DialogFooter>
                    </TabsContent>
                    <TabsContent value='upload' className='space-y-3 pt-3'>
                        <div
                            onClick={() => fileRef.current?.click()}
                            onDragOver={e => {
                                e.preventDefault();
                                setDragging(true);
                            }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={e => {
                                e.preventDefault();
                                setDragging(false);
                                const f = e.dataTransfer.files?.[0];
                                if (f) readFile(f);
                            }}
                            className={[
                                'rounded-lg border-2 border-dashed cursor-pointer transition-colors',
                                'flex flex-col items-center justify-center gap-3 py-8 px-4 text-center',
                                dragging
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/40 hover:bg-muted/20',
                            ].join(' ')}
                        >
                            {uploadSrc ? (
                                <img
                                    src={uploadSrc}
                                    alt='preview'
                                    className='max-h-36 max-w-full rounded-md object-contain'
                                />
                            ) : (
                                <>
                                    <div className='w-11 h-11 rounded-full bg-muted flex items-center justify-center'>
                                        <Upload className='w-5 h-5 text-muted-foreground' />
                                    </div>
                                    <div>
                                        <p className='text-sm font-medium'>
                                            Drop an image or click to browse
                                        </p>
                                        <p className='text-xs text-muted-foreground mt-0.5'>
                                            PNG, JPG, GIF, WebP
                                        </p>
                                    </div>
                                </>
                            )}
                            <input
                                ref={fileRef}
                                type='file'
                                accept='image/*'
                                className='sr-only'
                                onChange={e => {
                                    const f = e.target.files?.[0];
                                    if (f) readFile(f);
                                }}
                            />
                        </div>
                        {uploadSrc && (
                            <>
                                <div className='space-y-1.5'>
                                    <Label htmlFor='up-alt' className='text-xs'>
                                        Alt text{' '}
                                        <span className='text-muted-foreground font-normal'>
                                            (optional)
                                        </span>
                                    </Label>
                                    <Input
                                        id='up-alt'
                                        placeholder='Describe the image…'
                                        value={uploadAlt}
                                        onChange={e =>
                                            setUploadAlt(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setUploadSrc(null);
                                        setUploadAlt('');
                                        if (fileRef.current)
                                            fileRef.current.value = '';
                                    }}
                                    className='text-xs text-muted-foreground hover:text-foreground underline'
                                >
                                    Choose different image
                                </button>
                            </>
                        )}
                        <DialogFooter className='pt-1'>
                            <Button variant='outline' size='sm' onClick={close}>
                                Cancel
                            </Button>
                            <Button
                                size='sm'
                                onClick={insertUpload}
                                disabled={!uploadSrc}
                            >
                                Insert
                            </Button>
                        </DialogFooter>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

function Toolbar({
    editor,
    openImage,
}: {
    editor: Editor;
    openImage: () => void;
}) {
    const setLink = useCallback(() => {
        const prev = editor.getAttributes('link').href as string | undefined;
        const url = window.prompt('Enter link URL', prev ?? '');
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
    }, [editor]);

    return (
        <div className='flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b bg-muted/20'>
            <TBtn
                tip='Undo (⌘Z)'
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
            >
                <Undo className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Redo (⌘⇧Z)'
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
            >
                <Redo className='w-3.5 h-3.5' />
            </TBtn>
            <Separator orientation='vertical' className='mx-1 h-5' />
            <TBtn
                tip='Heading 1'
                active={editor.isActive('heading', { level: 1 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
            >
                <Heading1 className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Heading 2'
                active={editor.isActive('heading', { level: 2 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
            >
                <Heading2 className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Heading 3'
                active={editor.isActive('heading', { level: 3 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
            >
                <Heading3 className='w-3.5 h-3.5' />
            </TBtn>
            <Separator orientation='vertical' className='mx-1 h-5' />
            <TBtn
                tip='Bold (⌘B)'
                active={editor.isActive('bold')}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Italic (⌘I)'
                active={editor.isActive('italic')}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Underline (⌘U)'
                active={editor.isActive('underline')}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                <UnderlineIcon className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Strikethrough'
                active={editor.isActive('strike')}
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Inline code'
                active={editor.isActive('code')}
                onClick={() => editor.chain().focus().toggleCode().run()}
            >
                <Code className='w-3.5 h-3.5' />
            </TBtn>
            <Separator orientation='vertical' className='mx-1 h-5' />
            <TBtn
                tip='Align left'
                active={editor.isActive({ textAlign: 'left' })}
                onClick={() =>
                    editor.chain().focus().setTextAlign('left').run()
                }
            >
                <AlignLeft className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Align center'
                active={editor.isActive({ textAlign: 'center' })}
                onClick={() =>
                    editor.chain().focus().setTextAlign('center').run()
                }
            >
                <AlignCenter className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Align right'
                active={editor.isActive({ textAlign: 'right' })}
                onClick={() =>
                    editor.chain().focus().setTextAlign('right').run()
                }
            >
                <AlignRight className='w-3.5 h-3.5' />
            </TBtn>
            <Separator orientation='vertical' className='mx-1 h-5' />
            <TBtn
                tip='Bullet list'
                active={editor.isActive('bulletList')}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Ordered list'
                active={editor.isActive('orderedList')}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className='w-3.5 h-3.5' />
            </TBtn>
            <Separator orientation='vertical' className='mx-1 h-5' />
            <TBtn
                tip='Blockquote'
                active={editor.isActive('blockquote')}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <Quote className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Code block'
                active={editor.isActive('codeBlock')}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
                <Code2 className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn
                tip='Horizontal rule'
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <Minus className='w-3.5 h-3.5' />
            </TBtn>
            <Separator orientation='vertical' className='mx-1 h-5' />
            <TBtn
                tip='Insert / edit link'
                active={editor.isActive('link')}
                onClick={setLink}
            >
                <LinkIcon className='w-3.5 h-3.5' />
            </TBtn>
            <TBtn tip='Insert image' onClick={openImage}>
                <ImageIcon className='w-3.5 h-3.5' />
            </TBtn>
        </div>
    );
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = 'Start writing your blog post…',
    disabled = false,
    error = false,
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
}) {
    const [imgOpen, setImgOpen] = useState(false);
    // Track whether the last HTML change came from the editor itself (user typing)
    // or from an external value prop change (e.g. form reset / edit page load).
    const isInternalChange = useRef(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                bulletList: { keepMarks: true, keepAttributes: false },
                orderedList: { keepMarks: true, keepAttributes: false },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
            }),
            ImageResize.configure({
                inline: false,
            }),
            Placeholder.configure({ placeholder }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: value || '',
        editable: !disabled,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            isInternalChange.current = true;
            onChange(editor.getHTML());
        },
    });

    // Sync external value changes into the editor (e.g. on edit page load).
    // The key fix: only call setContent when the value truly differs AND
    // the change is coming from outside (not from the user typing).
    // Without the isInternalChange guard, every keystroke triggers setContent
    // which resets cursor position and drops images.
    useEffect(() => {
        if (!editor) return;
        if (isInternalChange.current) {
            // This update was caused by the editor itself — don't re-set content
            isInternalChange.current = false;
            return;
        }
        // External change (edit page load, form reset, etc.)
        // Only update if content actually differs to avoid unnecessary re-renders
        const current = editor.getHTML();
        if (value !== current) {
            editor.commands.setContent(value || '', { emitUpdate: false });
        }
    }, [value, editor]);

    const handleInsertImage = useCallback(
        (src: string, alt: string) => {
            if (editor) {
                (editor.chain().focus() as any).setImage({ src, alt }).run();
            }
        },
        [editor],
    );

    if (!editor) return null;

    const words = editor.getText().split(/\s+/).filter(Boolean).length;

    return (
        <>
            <div
                className={[
                    'rte-root rounded-lg border bg-background transition-all',
                    error
                        ? 'border-destructive ring-1 ring-destructive'
                        : 'border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring',
                    disabled
                        ? 'opacity-60 pointer-events-none select-none'
                        : '',
                ].join(' ')}
            >
                <Toolbar editor={editor} openImage={() => setImgOpen(true)} />
                <EditorContent editor={editor} className='rte-body' />
                <div className='flex justify-between items-center px-4 py-2 border-t bg-muted/10 text-xs text-muted-foreground select-none'>
                    <span className='truncate max-w-[60%]'>
                        {editor.isActive('link') &&
                            `🔗 ${editor.getAttributes('link').href}`}
                    </span>
                    <span>
                        {words} {words === 1 ? 'word' : 'words'}
                    </span>
                </div>
            </div>
            <ImageDialog
                open={imgOpen}
                onClose={() => setImgOpen(false)}
                onInsert={handleInsertImage}
            />
        </>
    );
}
