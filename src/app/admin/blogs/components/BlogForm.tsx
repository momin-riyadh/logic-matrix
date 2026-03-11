'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogFormSchema, BlogFormValues } from '@/schemas/blog';
import { Blog } from '@/types/blog';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import { RichTextEditor } from './RichTextEditor';
import { ExternalUrlPanel } from './ExternalUrlPanel';
import { BlogPreviewDialog } from './BlogPreviewDialog';

import {
    Eye,
    Save,
    Send,
    X,
    Plus,
    Loader2,
    ArrowLeft,
    Globe,
    PenLine,
} from 'lucide-react';
import { toast } from 'sonner';
import '@/styles/rte.css';
import { CoverImageUpload } from './CoverImageUpload';

interface BlogFormProps {
    blog?: Blog;
    mode: 'create' | 'edit';
}

function getDefaultValues(blog?: Blog): BlogFormValues {
    if (!blog) {
        return {
            title: '',
            excerpt: '',
            content: '',
            coverImage: '',
            status: 'DRAFT',
            tags: [],
            author: '',
            isExternal: false,
            sourceUrl: '',
        } as BlogFormValues;
    }

    if (blog.isExternal) {
        return {
            title: blog.title,
            excerpt: blog.excerpt || '',
            content: '',
            coverImage: blog.coverImage || '',
            status: blog.status,
            tags: blog.tags,
            author: blog.author,
            isExternal: true,
            sourceUrl: blog.sourceUrl || '',
        };
    }

    return {
        title: blog.title,
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        coverImage: blog.coverImage || '',
        status: blog.status,
        tags: blog.tags,
        author: blog.author,
        isExternal: false,
        sourceUrl: '',
    };
}

export function BlogForm({ blog, mode }: BlogFormProps) {
    const router = useRouter();
    const [tagInput, setTagInput] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitAction, setSubmitAction] = useState<'draft' | 'publish'>(
        'draft',
    );
    const [isSaved, setIsSaved] = useState(false);

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: getDefaultValues(blog),
        mode: 'onChange',
    });

    const isExternal = form.watch('isExternal');
    const watchedValues = form.watch();

    // Reset relevant fields when toggling external/internal
    const handleExternalToggle = (checked: boolean) => {
        form.setValue('isExternal', checked, { shouldValidate: false });
        // Clear discriminated union dependent fields
        if (checked) {
            form.setValue('content' as never, '' as never);
        } else {
            form.setValue('sourceUrl' as never, '' as never);
        }
        form.clearErrors();
    };

    // Build preview blog from form state
    const previewBlog: Blog | null = watchedValues.title
        ? {
              id: blog?.id || 'preview',
              slug: blog?.slug || 'preview',
              publishedAt: blog?.publishedAt || null,
              createdAt: blog?.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              title: watchedValues.title || '',
              excerpt: watchedValues.excerpt || null,
              content: isExternal ? null : watchedValues.content || null,
              coverImage: watchedValues.coverImage || null,
              status: watchedValues.status || 'DRAFT',
              tags: watchedValues.tags || [],
              author: watchedValues.author || '',
              isExternal: isExternal || false,
              sourceUrl:
                  (watchedValues as { sourceUrl?: string }).sourceUrl || null,
          }
        : null;

    const addTag = () => {
        const tag = tagInput.trim().toLowerCase().replace(/\s+/g, '-');
        const current = form.getValues('tags');
        if (tag && !current.includes(tag) && current.length < 10) {
            form.setValue('tags', [...current, tag], { shouldValidate: true });
        }
        setTagInput('');
    };

    const removeTag = (tag: string) => {
        form.setValue(
            'tags',
            form.getValues('tags').filter(t => t !== tag),
            { shouldValidate: true },
        );
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        }
    };

    const onSubmit = async (
        data: BlogFormValues,
        statusOverride?: 'DRAFT' | 'PUBLISHED',
    ) => {
        setIsSubmitting(true);
        const payload = { ...data, status: statusOverride || data.status };

        try {
            const url =
                mode === 'create' ? '/api/blogs' : `/api/blogs/${blog!.id}`;
            const method = mode === 'create' ? 'POST' : 'PATCH';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                if (result.issues) {
                    // Map Zod server issues to fields
                    result.issues.forEach(
                        (issue: { path: string[]; message: string }) => {
                            const path = issue.path.join(
                                '.',
                            ) as keyof BlogFormValues;
                            form.setError(path as never, {
                                message: issue.message,
                            });
                        },
                    );
                    toast.error('Please fix the validation errors');
                    return;
                }
                throw new Error(result.error || 'Something went wrong');
            }

            toast.success(
                mode === 'create'
                    ? 'Blog created successfully!'
                    : 'Blog updated successfully!',
            );
            setIsSaved(true);
            router.push('/admin/blogs');
            router.refresh();
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : 'An error occurred',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveDraft = form.handleSubmit(data => onSubmit(data, 'DRAFT'));
    const handlePublish = form.handleSubmit(data =>
        onSubmit(data, 'PUBLISHED'),
    );

    const formHasErrors = Object.keys(form.formState.errors).length > 0;

    return (
        <div className='min-h-screen bg-background'>
            {/* Sticky Header */}
            <div className='sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-3 min-w-0'>
                        <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={() => router.back()}
                            className='shrink-0'
                        >
                            <ArrowLeft className='w-4 h-4' />
                        </Button>
                        <div className='min-w-0'>
                            <h1 className='text-sm font-semibold leading-none truncate'>
                                {mode === 'create'
                                    ? 'New Blog Post'
                                    : 'Edit Blog Post'}
                            </h1>
                            {watchedValues.title && (
                                <p className='text-xs text-muted-foreground mt-0.5 truncate'>
                                    {watchedValues.title}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center gap-2 shrink-0'>
                        {formHasErrors && (
                            <span className='text-xs text-destructive hidden sm:block'>
                                Fix errors before saving
                            </span>
                        )}
                        <Button
                            type='button'
                            variant='outline'
                            size='sm'
                            onClick={() => setPreviewOpen(true)}
                            disabled={!watchedValues.title}
                        >
                            <Eye className='w-4 h-4 mr-1.5' />
                            Preview
                        </Button>
                        <Button
                            type='button'
                            variant='outline'
                            size='sm'
                            onClick={() => {
                                setSubmitAction('draft');
                                handleSaveDraft();
                            }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting && submitAction === 'draft' ? (
                                <Loader2 className='w-4 h-4 mr-1.5 animate-spin' />
                            ) : (
                                <Save className='w-4 h-4 mr-1.5' />
                            )}
                            Save Draft
                        </Button>
                        <Button
                            type='button'
                            size='sm'
                            onClick={() => {
                                setSubmitAction('publish');
                                handlePublish();
                            }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting && submitAction === 'publish' ? (
                                <Loader2 className='w-4 h-4 mr-1.5 animate-spin' />
                            ) : (
                                <Send className='w-4 h-4 mr-1.5' />
                            )}
                            Publish
                        </Button>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form
                    onSubmit={e => e.preventDefault()}
                    className='max-w-7xl mx-auto px-4 sm:px-6 py-8'
                >
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* Left side */}
                        <div className='lg:col-span-2 space-y-6'>
                            <div className='flex items-center justify-between rounded-lg border bg-card p-4'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-950 flex items-center justify-center shrink-0'>
                                        <Globe className='w-4 h-4 text-violet-600 dark:text-violet-400' />
                                    </div>
                                    <div>
                                        <p className='text-sm font-medium'>
                                            External Blog Post
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            Import from an external URL with
                                            auto metadata
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Label
                                        htmlFor='external-toggle'
                                        className='text-xs text-muted-foreground sr-only'
                                    >
                                        External
                                    </Label>
                                    <Switch
                                        id='external-toggle'
                                        checked={isExternal}
                                        onCheckedChange={handleExternalToggle}
                                    />
                                </div>
                            </div>

                            {/* External URL Panel */}
                            {isExternal && (
                                <ExternalUrlPanel form={form as never} />
                            )}

                            {/* Title */}
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title *</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Enter an engaging blog title...'
                                                className='text-lg h-12'
                                            />
                                        </FormControl>
                                        <div className='flex justify-between'>
                                            <FormMessage />
                                            <span
                                                className={`text-xs ml-auto ${field.value.length > 180 ? 'text-destructive' : 'text-muted-foreground'}`}
                                            >
                                                {field.value.length}/200
                                            </span>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Excerpt */}
                            <FormField
                                control={form.control}
                                name='excerpt'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Excerpt</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder='A short summary shown in blog listings...'
                                                rows={3}
                                                className='resize-none'
                                            />
                                        </FormControl>
                                        <div className='flex justify-between items-start'>
                                            <FormDescription>
                                                Used in blog listings and meta
                                                description.
                                            </FormDescription>
                                            <span
                                                className={`text-xs shrink-0 ml-2 ${(field.value?.length || 0) > 450 ? 'text-destructive' : 'text-muted-foreground'}`}
                                            >
                                                {field.value?.length || 0}/500
                                            </span>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Editor */}
                            {!isExternal && (
                                <FormField
                                    control={form.control}
                                    name={'content' as never}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Content *</FormLabel>
                                            <FormControl>
                                                <RichTextEditor
                                                    value={
                                                        (
                                                            field as {
                                                                value: string;
                                                            }
                                                        ).value || ''
                                                    }
                                                    onChange={field.onChange}
                                                    error={
                                                        !!form.formState.errors
                                                            .content
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        {/* Right side */}
                        <div className='space-y-5'>
                            <div className='rounded-lg border bg-card p-5 space-y-5'>
                                <h3 className='font-semibold text-sm text-foreground'>
                                    Post Settings
                                </h3>

                                <FormField
                                    control={form.control}
                                    name='author'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Author *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='Author name'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='status'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='DRAFT'>
                                                        Draft
                                                    </SelectItem>
                                                    <SelectItem value='PUBLISHED'>
                                                        Published
                                                    </SelectItem>
                                                    <SelectItem value='ARCHIVED'>
                                                        Archived
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* cover image */}
                            {/* <div className='rounded-lg border bg-card p-5 space-y-3'>
                                <h3 className='font-semibold text-sm'>
                                    Cover Image
                                </h3>
                                <FormField
                                    control={form.control}
                                    name='coverImage'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='sr-only'>
                                                Cover Image URL
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='https://example.com/image.jpg'
                                                    type='url'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {watchedValues.coverImage && (
                                    <div className='rounded-md overflow-hidden aspect-video bg-muted border'>
                                        <img
                                            src={watchedValues.coverImage}
                                            alt='Cover preview'
                                            className='w-full h-full object-cover'
                                            onError={e => {
                                                (
                                                    e.currentTarget
                                                        .parentElement as HTMLElement
                                                ).style.display = 'none';
                                            }}
                                            onLoad={e => {
                                                (
                                                    e.currentTarget
                                                        .parentElement as HTMLElement
                                                ).style.display = '';
                                            }}
                                        />
                                    </div>
                                )}
                            </div> */}
                            <CoverImageUpload
                                value={form.watch('coverImage')}
                                isSaved={isSaved}
                                onChange={src =>
                                    form.setValue('coverImage', src ?? '')
                                }
                            />

                            {/* Tags Card */}
                            <div className='rounded-lg border bg-card p-5 space-y-3'>
                                <h3 className='font-semibold text-sm'>Tags</h3>
                                <div className='flex gap-2'>
                                    <Input
                                        placeholder='Add a tag...'
                                        value={tagInput}
                                        onChange={e =>
                                            setTagInput(e.target.value)
                                        }
                                        onKeyDown={handleTagKeyDown}
                                        className='flex-1'
                                        maxLength={30}
                                    />
                                    <Button
                                        type='button'
                                        variant='outline'
                                        size='icon'
                                        onClick={addTag}
                                        disabled={
                                            !tagInput.trim() ||
                                            form.getValues('tags').length >= 10
                                        }
                                    >
                                        <Plus className='w-4 h-4' />
                                    </Button>
                                </div>
                                <p className='text-xs text-muted-foreground'>
                                    Press Enter or comma ·{' '}
                                    {form.watch('tags').length}/10
                                </p>
                                {form.formState.errors.tags && (
                                    <p className='text-xs text-destructive'>
                                        {form.formState.errors.tags.message}
                                    </p>
                                )}
                                {form.watch('tags').length > 0 && (
                                    <div className='flex flex-wrap gap-1.5'>
                                        {form.watch('tags').map(tag => (
                                            <Badge
                                                key={tag}
                                                variant='secondary'
                                                className='gap-1 pr-1 text-xs'
                                            >
                                                {tag}
                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        removeTag(tag)
                                                    }
                                                    className='rounded-sm hover:bg-destructive hover:text-destructive-foreground p-0.5 transition-colors ml-0.5'
                                                    aria-label={`Remove tag ${tag}`}
                                                >
                                                    <X className='w-2.5 h-2.5' />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Validation summary */}
                            {formHasErrors && (
                                <div className='rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-1.5'>
                                    <p className='text-xs font-semibold text-destructive'>
                                        Please fix these errors:
                                    </p>
                                    {Object.entries(form.formState.errors).map(
                                        ([key, error]) => (
                                            <p
                                                key={key}
                                                className='text-xs text-destructive/80'
                                            >
                                                ·{' '}
                                                {(error as { message?: string })
                                                    ?.message ||
                                                    'Invalid value'}
                                            </p>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </Form>

            <BlogPreviewDialog
                blog={previewBlog}
                open={previewOpen}
                onOpenChange={setPreviewOpen}
            />
        </div>
    );
}
