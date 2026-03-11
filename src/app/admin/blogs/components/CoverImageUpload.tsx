'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, Upload, Globe, X, RefreshCw, Loader2 } from 'lucide-react';
import {
    extractFileId,
    getProxyImageUrl,
    type UploadResult,
} from '@/lib/file-service';
import { toast } from 'sonner';

interface CoverImageUploadProps {
    value?: string;
    onChange: (src: string | undefined) => void;
    label?: string;
    isSaved?: boolean;
}

function uploadFile(
    file: File,
    directory: string,
    onProgress: (pct: number) => void,
): Promise<
    { success: true; data: UploadResult } | { success: false; error: string }
> {
    return new Promise(resolve => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('directory', directory);

        const xhr = new XMLHttpRequest();

        // Cap at 90%
        xhr.upload.addEventListener('progress', e => {
            if (e.lengthComputable) {
                onProgress(Math.round((e.loaded / e.total) * 90));
            }
        });

        xhr.addEventListener('load', () => {
            try {
                const body = JSON.parse(xhr.responseText);
                if (xhr.status === 201 && body.success) {
                    resolve({ success: true, data: body.data });
                } else {
                    resolve({
                        success: false,
                        error: body.error ?? 'Upload failed',
                    });
                }
            } catch {
                resolve({ success: false, error: 'Invalid server response' });
            }
        });

        xhr.addEventListener('error', () =>
            resolve({ success: false, error: 'Network error' }),
        );
        xhr.addEventListener('abort', () =>
            resolve({ success: false, error: 'Upload aborted' }),
        );

        xhr.open('POST', '/api/files/upload');
        xhr.send(formData);
    });
}

async function deleteFileById(fileId: string): Promise<void> {
    await fetch('/api/files/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId }),
    });
}

export function CoverImageUpload({
    value,
    onChange,
    label = 'Cover Image',
    isSaved = false,
}: CoverImageUploadProps) {
    const [urlInput, setUrlInput] = useState('');
    const [urlError, setUrlError] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [tab, setTab] = useState<'upload' | 'url'>('upload');
    const fileRef = useRef<HTMLInputElement>(null);

    const valueRef = useRef<string | undefined>(value);
    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    const isSavedRef = useRef(isSaved);
    useEffect(() => {
        isSavedRef.current = isSaved;
    }, [isSaved]);

    const deleteIfOwned = useCallback(async (url: string) => {
        const fileId = extractFileId(url);
        if (!fileId) return;
        await deleteFileById(fileId);
    }, []);

    // sendBeacon on hard close
    const beaconDelete = useCallback((url: string) => {
        const fileId = extractFileId(url);
        if (!fileId) return;
        navigator.sendBeacon(
            '/api/files/delete',
            new Blob([JSON.stringify({ fileId })], {
                type: 'application/json',
            }),
        );
    }, []);

    useEffect(() => {
        const onUnload = () => {
            if (isSavedRef.current) return;
            const url = valueRef.current;
            if (url) beaconDelete(url);
        };
        window.addEventListener('beforeunload', onUnload);
        return () => window.removeEventListener('beforeunload', onUnload);
    }, [beaconDelete]);

    // soft-nav cleanup
    useEffect(() => {
        return () => {
            if (isSavedRef.current) return;
            const url = valueRef.current;
            if (url) deleteIfOwned(url);
        };
    }, [deleteIfOwned]);

    // file upload
    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        setUploading(true);
        setProgress(0);

        if (value) await deleteIfOwned(value);

        const result = await uploadFile(file, 'blogs', setProgress);

        setProgress(100);
        setTimeout(() => {
            setUploading(false);
            setProgress(0);
        }, 400);

        if (result.success) {
            onChange(result.data.url);
            toast.success('Cover image uploaded');
        } else {
            toast.error(result.error ?? 'Upload failed. Please try again.');
        }
    };

    const handleRemove = async () => {
        if (value) await deleteIfOwned(value);
        onChange(undefined);
        setUrlInput('');
        setUrlError(false);
        if (fileRef.current) fileRef.current.value = '';
    };

    const applyUrl = async () => {
        const trimmed = urlInput.trim();
        if (!trimmed) return;
        try {
            new URL(trimmed);
            setUrlError(false);
            if (value) await deleteIfOwned(value);
            onChange(trimmed);
            setUrlInput('');
        } catch {
            setUrlError(true);
        }
    };

    if (value) {
        return (
            <div className='space-y-2'>
                {label && <p className='text-sm font-medium'>{label}</p>}
                <div className='relative group rounded-xl overflow-hidden border border-border bg-muted/20'>
                    <div className='aspect-video w-full'>
                        <img
                            src={
                                extractFileId(value)
                                    ? getProxyImageUrl(value)
                                    : value
                            }
                            alt='Cover preview'
                            className='w-full h-full object-cover'
                            onError={() => {
                                toast.error('Could not load image');
                                onChange(undefined);
                            }}
                        />
                    </div>
                    <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3'>
                        <Button
                            type='button'
                            size='sm'
                            variant='secondary'
                            className='gap-1.5 text-xs'
                            onClick={() => {
                                onChange(undefined);
                                setTimeout(() => setTab('upload'), 50);
                            }}
                        >
                            <RefreshCw className='w-3.5 h-3.5' /> Replace
                        </Button>
                        <Button
                            type='button'
                            size='sm'
                            variant='destructive'
                            className='gap-1.5 text-xs'
                            onClick={handleRemove}
                        >
                            <X className='w-3.5 h-3.5' /> Remove
                        </Button>
                    </div>
                </div>
                <p className='text-xs text-muted-foreground'>
                    Hover to replace or remove.
                </p>
            </div>
        );
    }

    return (
        <div className='space-y-2'>
            {label && <p className='text-sm font-medium'>{label}</p>}
            <Tabs
                value={tab}
                onValueChange={v => setTab(v as 'upload' | 'url')}
            >
                <TabsList className='w-full h-9'>
                    <TabsTrigger
                        value='upload'
                        className='flex-1 gap-1.5 text-xs'
                    >
                        <Upload className='w-3.5 h-3.5' /> Upload file
                    </TabsTrigger>
                    <TabsTrigger value='url' className='flex-1 gap-1.5 text-xs'>
                        <Globe className='w-3.5 h-3.5' /> Paste URL
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='upload' className='mt-3'>
                    <div
                        onClick={() => !uploading && fileRef.current?.click()}
                        onDragOver={e => {
                            e.preventDefault();
                            if (!uploading) setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={e => {
                            e.preventDefault();
                            setDragging(false);
                            const f = e.dataTransfer.files?.[0];
                            if (f && !uploading) handleFileUpload(f);
                        }}
                        className={[
                            'relative flex flex-col items-center justify-center gap-3',
                            'w-full aspect-video rounded-xl border-2 border-dashed transition-all duration-150 text-center px-6',
                            uploading
                                ? 'border-primary/40 bg-primary/5 cursor-default'
                                : dragging
                                  ? 'border-primary bg-primary/5 scale-[0.99] cursor-copy'
                                  : 'border-border hover:border-primary/50 hover:bg-muted/30 cursor-pointer',
                        ].join(' ')}
                    >
                        {uploading ? (
                            <div className='flex flex-col items-center gap-3 w-full px-8'>
                                <Loader2 className='w-8 h-8 text-primary animate-spin' />
                                <div className='w-full space-y-1.5'>
                                    <div className='flex justify-between text-xs text-muted-foreground'>
                                        <span>
                                            {progress >= 90 && progress < 100
                                                ? 'Processing…'
                                                : 'Uploading…'}
                                        </span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className='w-full h-1.5 rounded-full bg-muted overflow-hidden'>
                                        <div
                                            className={[
                                                'h-full bg-primary rounded-full transition-all duration-300',
                                                progress >= 90 && progress < 100
                                                    ? 'animate-pulse'
                                                    : '',
                                            ].join(' ')}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center'>
                                    <ImageIcon className='w-5 h-5 text-muted-foreground' />
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-foreground'>
                                        {dragging
                                            ? 'Drop to upload'
                                            : 'Drag & drop or click to browse'}
                                    </p>
                                    <p className='text-xs text-muted-foreground mt-0.5'>
                                        PNG, JPG, GIF, WebP — recommended
                                        1200×630 px
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
                                if (f) handleFileUpload(f);
                                e.target.value = '';
                            }}
                        />
                    </div>
                </TabsContent>

                <TabsContent value='url' className='mt-3 space-y-3'>
                    <div className='flex flex-col items-center justify-center gap-3 w-full aspect-video rounded-xl border-2 border-dashed bg-muted/10 px-6 text-center'>
                        <div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center'>
                            <Globe className='w-5 h-5 text-muted-foreground' />
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            Paste a public image URL below
                        </p>
                    </div>
                    <div className='flex gap-2'>
                        <Input
                            placeholder='https://example.com/cover.png'
                            value={urlInput}
                            onChange={e => {
                                setUrlInput(e.target.value);
                                setUrlError(false);
                            }}
                            onKeyDown={e => e.key === 'Enter' && applyUrl()}
                            className={
                                urlError
                                    ? 'border-destructive focus-visible:ring-destructive'
                                    : ''
                            }
                        />
                        <Button
                            type='button'
                            onClick={applyUrl}
                            disabled={!urlInput.trim()}
                            className='shrink-0'
                        >
                            Apply
                        </Button>
                    </div>
                    {urlError && (
                        <p className='text-xs text-destructive'>
                            Please enter a valid URL (must start with https://)
                        </p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
