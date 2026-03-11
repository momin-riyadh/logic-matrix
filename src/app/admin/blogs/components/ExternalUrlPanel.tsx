'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BlogFormValues } from '@/schemas/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Globe,
    Loader2,
    Wand2,
    CheckCircle2,
    AlertCircle,
    ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';

interface ExternalUrlPanelProps {
    form: UseFormReturn<BlogFormValues>;
}

type FetchState = 'idle' | 'loading' | 'success' | 'error';

export function ExternalUrlPanel({ form }: ExternalUrlPanelProps) {
    const [fetchState, setFetchState] = useState<FetchState>('idle');
    const [fetchError, setFetchError] = useState('');
    const [siteName, setSiteName] = useState('');

    const sourceUrl = form.watch('sourceUrl' as keyof BlogFormValues) as string;

    const handleFetchMeta = async () => {
        if (!sourceUrl) {
            form.setError('sourceUrl' as never, {
                message: 'Enter a URL first',
            });
            return;
        }

        // url validation
        try {
            new URL(sourceUrl);
        } catch {
            form.setError('sourceUrl' as never, {
                message: 'Enter a valid URL',
            });
            return;
        }

        setFetchState('loading');
        setFetchError('');

        try {
            const res = await fetch(
                `/api/blogs/fetch-meta?url=${encodeURIComponent(sourceUrl)}`,
            );
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to fetch metadata');
            }

            // Auto-fill fields only if they are currently empty
            let filled = 0;

            if (data.title && !form.getValues('title')) {
                form.setValue('title', data.title, { shouldValidate: true });
                filled++;
            }
            if (data.excerpt && !form.getValues('excerpt')) {
                form.setValue('excerpt', data.excerpt, {
                    shouldValidate: true,
                });
                filled++;
            }
            if (data.coverImage && !form.getValues('coverImage')) {
                form.setValue('coverImage', data.coverImage, {
                    shouldValidate: true,
                });
                filled++;
            }
            if (data.author && !form.getValues('author')) {
                form.setValue('author', data.author, { shouldValidate: true });
                filled++;
            }
            if (data.siteName) setSiteName(data.siteName);

            setFetchState('success');
            toast.success(
                filled > 0
                    ? `${filled} field${filled !== 1 ? 's' : ''} auto-filled from metadata`
                    : 'Metadata fetched — fields already filled',
            );
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Unknown error';
            setFetchState('error');
            setFetchError(message);
            toast.error('Could not fetch metadata');
        }
    };

    return (
        <div className='space-y-4'>
            <div className='rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 p-4'>
                <div className='flex gap-3'>
                    <Globe className='w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5' />
                    <div className='text-sm text-blue-800 dark:text-blue-300'>
                        <p className='font-medium mb-0.5'>
                            External Blog Import
                        </p>
                        <p className='text-blue-700 dark:text-blue-400'>
                            Paste the URL of your existing blog post. We&apos;ll
                            try to auto-fill the title, excerpt, cover image,
                            and author from the page&apos;s metadata. You can
                            edit anything before saving.
                        </p>
                    </div>
                </div>
            </div>

            <FormField
                control={form.control}
                name={'sourceUrl' as never}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='flex items-center gap-1.5'>
                            <Globe className='w-3.5 h-3.5' />
                            Source URL *
                        </FormLabel>
                        <div className='flex gap-2'>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder='https://medium.com/your-article'
                                    type='url'
                                    className='flex-1'
                                />
                            </FormControl>
                            {/* <Button
                                type='button'
                                variant='outline'
                                onClick={handleFetchMeta}
                                disabled={
                                    fetchState === 'loading' || !sourceUrl
                                }
                                className='shrink-0 gap-2'
                            >
                                {fetchState === 'loading' ? (
                                    <>
                                        <Loader2 className='w-4 h-4 animate-spin' />
                                        Fetching...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className='w-4 h-4' />
                                        Auto-fill
                                    </>
                                )}
                            </Button> */}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Fetch status */}
            {fetchState === 'success' && (
                <Alert className='border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30'>
                    <CheckCircle2 className='w-4 h-4 text-emerald-600' />
                    <AlertDescription className='text-emerald-700 dark:text-emerald-400 text-sm'>
                        Metadata fetched successfully
                        {siteName && (
                            <span className='font-medium'>
                                {' '}
                                from {siteName}
                            </span>
                        )}
                        . Review the fields below and edit as needed.
                    </AlertDescription>
                </Alert>
            )}

            {fetchState === 'error' && (
                <Alert variant='destructive'>
                    <AlertCircle className='w-4 h-4' />
                    <AlertDescription className='text-sm'>
                        {fetchError}. Please fill in the fields manually.
                    </AlertDescription>
                </Alert>
            )}

            {/* External link preview */}
            {sourceUrl && fetchState === 'success' && (
                <a
                    href={sourceUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1.5 text-xs text-primary hover:underline'
                >
                    <ExternalLink className='w-3.5 h-3.5' />
                    Open original post
                </a>
            )}
        </div>
    );
}
