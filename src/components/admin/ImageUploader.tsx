// components/ui/image-uploader.tsx
'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
    Upload,
    X,
    Link2,
    ImageIcon,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Plus,
} from 'lucide-react';
import { toast } from 'sonner';

export type UploadedImage = {
    /** Public URL (either /uploads/xxx.jpg or an external https:// URL) */
    url: string;
    /** Display name */
    name: string;
    /** "uploaded" = stored on server | "external" = user-provided URL */
    source: 'uploaded' | 'external';
};

type ImageUploaderProps = {
    /** Current images */
    value: UploadedImage[];
    /** Called whenever the list changes */
    onChange: (images: UploadedImage[]) => void;
    /** Allow multiple images (default: true) */
    multiple?: boolean;
    /** Max number of images when multiple=true (default: 10) */
    maxImages?: number;
    /** Label shown above the uploader */
    label?: string;
    /** Mark field as required */
    required?: boolean;
    className?: string;
};

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isValidUrl(str: string) {
    try {
        const u = new URL(str);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
        return false;
    }
}

export function ImageUploader({
    value,
    onChange,
    multiple = false,
    maxImages = 10,
    label,
    required,
    className,
}: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [urlMode, setUrlMode] = useState(false);
    const [urlError, setUrlError] = useState('');

    const canAddMore = multiple
        ? value?.length < maxImages
        : value?.length === 0;

    const uploadFiles = useCallback(
        async (files: File[]) => {
            if (!canAddMore && !multiple) {
                toast.error(
                    'Remove the current image before uploading a new one',
                );
                return;
            }

            const remaining = multiple ? maxImages - value.length : 1;
            const toUpload = files.slice(0, remaining);

            if (toUpload.length === 0) {
                toast.error(`Maximum ${maxImages} images allowed`);
                return;
            }

            setUploading(true);
            try {
                const fd = new FormData();
                toUpload.forEach(f => fd.append('files', f));

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: fd,
                });
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || 'Upload failed');

                const newImages: UploadedImage[] = (
                    data.uploaded as { url: string; name: string }[]
                ).map(u => ({ url: u.url, name: u.name, source: 'uploaded' }));

                onChange(multiple ? [...value, ...newImages] : newImages);

                if (data.errors?.length) {
                    data.errors.forEach((e: string) => toast.error(e));
                } else {
                    toast.success(
                        `${newImages.length} image${newImages.length > 1 ? 's' : ''} uploaded`,
                    );
                }
            } catch (err) {
                toast.error(
                    err instanceof Error ? err.message : 'Upload failed',
                );
            } finally {
                setUploading(false);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        },
        [value, onChange, multiple, maxImages, canAddMore],
    );

    const removeImage = useCallback(
        async (index: number) => {
            const img = value[index];

            // Attempt to delete from server if it was uploaded
            if (img.source === 'uploaded') {
                try {
                    await fetch('/api/upload', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ url: img.url }),
                    });
                } catch {
                    // Non-fatal — file might already be gone
                }
            }

            onChange(value.filter((_, i) => i !== index));
        },
        [value, onChange],
    );

    const addUrl = useCallback(() => {
        const url = urlInput.trim();
        setUrlError('');

        if (!url) return;

        if (!isValidUrl(url)) {
            setUrlError(
                'Please enter a valid URL starting with http:// or https://',
            );
            return;
        }

        if (value.some(v => v.url === url)) {
            setUrlError('This URL is already added');
            return;
        }

        if (!canAddMore) {
            toast.error(`Maximum ${maxImages} images allowed`);
            return;
        }

        const newImage: UploadedImage = {
            url,
            name: url.split('/').pop() || 'external-image',
            source: 'external',
        };

        onChange(multiple ? [...value, newImage] : [newImage]);
        setUrlInput('');
        setUrlMode(false);
    }, [urlInput, value, onChange, multiple, maxImages, canAddMore]);

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };
    const onDragLeave = () => setDragging(false);
    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(f =>
            f.type.startsWith('image/'),
        );
        if (files.length) uploadFiles(files);
    };

    return (
        <div className={cn('space-y-3', className)}>
            {label && (
                <Label>
                    {label}
                    {required && (
                        <span className='text-destructive ml-1'>*</span>
                    )}
                </Label>
            )}

            {/* Drop zone — only show when more images can be added */}
            {canAddMore && (
                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={cn(
                        'relative border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer',
                        dragging
                            ? 'border-primary bg-primary/5 scale-[1.01]'
                            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/40',
                    )}
                    onClick={() => !urlMode && fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        multiple={multiple}
                        className='hidden'
                        onChange={e => {
                            const files = Array.from(e.target.files || []);
                            if (files.length) uploadFiles(files);
                        }}
                    />

                    <div className='flex flex-col items-center justify-center gap-2 py-8 px-4 text-center'>
                        {uploading ? (
                            <>
                                <Loader2 className='w-8 h-8 text-primary animate-spin' />
                                <p className='text-sm font-medium text-muted-foreground'>
                                    Uploading...
                                </p>
                            </>
                        ) : (
                            <>
                                <div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center'>
                                    <Upload className='w-5 h-5 text-muted-foreground' />
                                </div>
                                <div>
                                    <p className='text-sm font-medium'>
                                        Drop images here or{' '}
                                        <span className='text-primary underline underline-offset-2'>
                                            browse
                                        </span>
                                    </p>
                                    <p className='text-xs text-muted-foreground mt-0.5'>
                                        JPG, PNG, WEBP, GIF · max 5 MB each
                                        {multiple &&
                                            ` · up to ${maxImages} images`}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* URL input toggle */}
            {canAddMore && (
                <div className='space-y-2'>
                    <button
                        type='button'
                        onClick={() => {
                            setUrlMode(p => !p);
                            setUrlError('');
                            setUrlInput('');
                        }}
                        className='flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors'
                    >
                        <Link2 className='w-3.5 h-3.5' />
                        {urlMode
                            ? 'Hide URL input'
                            : 'Or add an external image URL'}
                    </button>

                    {urlMode && (
                        <div className='space-y-1.5'>
                            <div className='flex gap-2'>
                                <Input
                                    value={urlInput}
                                    onChange={e => {
                                        setUrlInput(e.target.value);
                                        setUrlError('');
                                    }}
                                    onKeyDown={e =>
                                        e.key === 'Enter' && addUrl()
                                    }
                                    placeholder='https://example.com/image.jpg'
                                    className={cn(
                                        urlError &&
                                            'border-destructive focus-visible:ring-destructive',
                                    )}
                                />
                                <Button
                                    type='button'
                                    variant='secondary'
                                    onClick={addUrl}
                                    disabled={!urlInput.trim()}
                                >
                                    <Plus className='w-4 h-4 mr-1' />
                                    Add
                                </Button>
                            </div>
                            {urlError && (
                                <p className='flex items-center gap-1 text-xs text-destructive'>
                                    <AlertCircle className='w-3 h-3' />
                                    {urlError}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Preview grid */}
            {value?.length > 0 && (
                <div
                    className={cn(
                        'grid gap-3',
                        multiple
                            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                            : 'grid-cols-1',
                    )}
                >
                    {value.map((img, i) => (
                        <ImagePreviewCard
                            key={`${img.url}-${i}`}
                            image={img}
                            single={!multiple}
                            onRemove={() => removeImage(i)}
                        />
                    ))}
                </div>
            )}

            {/* Counter */}
            {multiple && value?.length > 0 && (
                <p className='text-xs text-muted-foreground text-right'>
                    {value.length} / {maxImages} images
                </p>
            )}
        </div>
    );
}

type ImagePreviewCardProps = {
    image: UploadedImage;
    single: boolean;
    onRemove: () => void;
};

function ImagePreviewCard({ image, single, onRemove }: ImagePreviewCardProps) {
    const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

    return (
        <div
            className={cn(
                'group relative rounded-lg border bg-muted overflow-hidden',
                single ? 'h-48' : 'aspect-square',
            )}
        >
            {/* Image */}
            {status !== 'error' ? (
                <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw'
                    className={cn(
                        'object-cover transition-all duration-300',
                        status === 'loading'
                            ? 'opacity-0'
                            : 'opacity-100 group-hover:scale-105',
                    )}
                    onLoad={() => setStatus('ok')}
                    onError={() => setStatus('error')}
                    unoptimized={image.source === 'external'}
                />
            ) : (
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground'>
                    <ImageIcon className='w-8 h-8' />
                    <span className='text-xs'>Failed to load</span>
                </div>
            )}

            {/* Loading shimmer */}
            {status === 'loading' && (
                <div className='absolute inset-0 bg-muted animate-pulse' />
            )}

            {/* Overlay on hover */}
            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200' />

            {/* Remove button */}
            <button
                type='button'
                onClick={e => {
                    e.stopPropagation();
                    onRemove();
                }}
                className='absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive'
                aria-label='Remove image'
            >
                <X className='w-3.5 h-3.5' />
            </button>

            {/* Source badge */}
            <div className='absolute bottom-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity'>
                {image.source === 'uploaded' ? (
                    <span className='inline-flex items-center gap-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded-full'>
                        <CheckCircle2 className='w-2.5 h-2.5 text-green-400' />
                        Uploaded
                    </span>
                ) : (
                    <span className='inline-flex items-center gap-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded-full'>
                        <Link2 className='w-2.5 h-2.5 text-blue-400' />
                        External
                    </span>
                )}
            </div>

            {/* Name tooltip at bottom */}
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                <p className='text-white text-[10px] truncate'>{image.name}</p>
            </div>
        </div>
    );
}
