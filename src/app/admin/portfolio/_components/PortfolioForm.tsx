'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ImageUploader,
    type UploadedImage,
} from '@/components/admin/ImageUploader';
import {
    Plus,
    Trash2,
    X,
    ArrowLeft,
    Loader2,
    Sparkles,
    Save,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';
import { Slider } from '@/components/ui/slider';
import IconPicker from '@/components/admin/IconPicker';

const featureSchema = z.object({
    title: z.string().min(1, 'Feature title is required'),
    description: z.string().optional(),
});

const statSchema = z.object({
    label: z.string().min(1, 'Stat label is required'),
    value: z.string().min(1, 'Stat value is required'),
    icon: z.string().optional(),
});

const portfolioSchema = z
    .object({
        title: z
            .string()
            .min(1, 'Title is required')
            .max(100, 'Title must be 100 characters or less'),

        slug: z
            .string()
            .min(1, 'Slug is required')
            .max(100, 'Slug must be 100 characters or less')
            .regex(
                /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                'Slug must be lowercase letters, numbers, and hyphens only',
            ),

        category: z.string().min(1, 'Category is required'),

        description: z
            .string()
            .min(10, 'Description must be at least 10 characters')
            .max(5000, 'Description must be 5000 characters or less'),

        client: z
            .string()
            .max(100, 'Client name must be 100 characters or less')
            .optional(),

        progress: z
            .number()
            .min(0, 'Progress must be at least 0')
            .max(100, 'Progress must be at most 100'),

        coverImage: z.custom<UploadedImage>().nullable(),

        images: z
            .array(z.custom<UploadedImage>())
            .max(10, 'Maximum 10 additional images'),

        tags: z.array(z.string()),

        status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),

        featured: z.boolean(),

        liveUrl: z
            .string()
            .max(500)
            .refine(
                v => !v || /^https?:\/\/.+/.test(v),
                'Live URL must start with http:// or https://',
            )
            .optional(),

        githubUrl: z
            .string()
            .max(500)
            .refine(
                v => !v || /^https?:\/\/.+/.test(v),
                'GitHub URL must start with http:// or https://',
            )
            .optional(),

        completedAt: z.string().optional(),

        features: z.array(featureSchema),

        stats: z.array(statSchema),
    })
    .superRefine((data, ctx) => {
        if (data.coverImage === null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['coverImage'],
                message: 'Cover image is required',
            });
        }
    });

type PortfolioSchema = z.infer<typeof portfolioSchema>;
type FormErrors = Partial<Record<string, string>>;

function flattenZodErrors(error: z.ZodError): FormErrors {
    const result: FormErrors = {};
    for (const issue of error.issues) {
        const key = issue.path.join('.');
        if (!result[key]) result[key] = issue.message;
    }
    return result;
}

const INITIAL_DATA: PortfolioSchema = {
    title: '',
    slug: '',
    category: '',
    description: '',
    client: '',
    progress: 0,
    coverImage: null,
    images: [],
    tags: [],
    status: 'DRAFT',
    featured: false,
    liveUrl: '',
    githubUrl: '',
    completedAt: '',
    features: [],
    stats: [],
};

const CATEGORIES = [
    'Web Development',
    'Mobile App',
    'E-Commerce',
    'UI/UX Design',
    'Branding',
    'Real Estate',
    'SaaS',
    'Other',
];

type RawInitialData = Omit<
    Partial<PortfolioSchema>,
    'coverImage' | 'images' | 'stats'
> & {
    coverImage?: string;
    images?: string[];
    stats?: Array<{
        label: string;
        value: string;
        icon?: string;
    }>;
};

interface PortfolioFormProps {
    mode: 'create' | 'edit';
    portfolioId?: string;
    initialData?: RawInitialData;
}

export function PortfolioForm({
    mode,
    portfolioId,
    initialData,
}: PortfolioFormProps) {
    const router = useRouter();

    const processedData: PortfolioSchema = {
        ...INITIAL_DATA,
        ...(initialData as Partial<PortfolioSchema>),
        coverImage: initialData?.coverImage
            ? {
                  url: initialData.coverImage,
                  name: 'Cover Image',
                  source: 'external',
              }
            : null,
        images:
            initialData?.images?.map(url => ({
                url,
                name: 'Gallery Image',
                source: 'external',
            })) ?? [],
        stats: initialData?.stats ?? [],
    };

    const [form, setForm] = useState<PortfolioSchema>(processedData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [saving, setSaving] = useState(false);
    const [tagInput, setTagInput] = useState('');

    function set<K extends keyof PortfolioSchema>(
        key: K,
        value: PortfolioSchema[K],
    ) {
        setForm(prev => ({ ...prev, [key]: value }));
    }

    function generateSlug() {
        const slug = form.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        set('slug', slug);
    }

    function addTag() {
        const trimmed = tagInput.trim();
        if (trimmed && !form.tags.includes(trimmed)) {
            set('tags', [...form.tags, trimmed]);
            setTagInput('');
        }
    }

    function addFeature() {
        set('features', [...form.features, { title: '', description: '' }]);
    }

    function updateFeature(
        index: number,
        field: keyof (typeof form.features)[0],
        value: string,
    ) {
        const updated = [...form.features];
        updated[index] = { ...updated[index], [field]: value };
        set('features', updated);
    }

    function addStat() {
        set('stats', [...form.stats, { label: '', value: '', icon: '' }]);
    }

    function updateStat(
        index: number,
        field: keyof (typeof form.stats)[0],
        value: string,
    ) {
        const updated = [...form.stats];
        updated[index] = { ...updated[index], [field]: value };
        set('stats', updated);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);

        const result = portfolioSchema.safeParse(form);
        if (!result.success) {
            setErrors(flattenZodErrors(result.error));
            toast.error('Please fix the validation errors');
            return;
        }

        setErrors({});
        setSaving(true);

        try {
            type PortfolioPayload = Omit<
                PortfolioSchema,
                'coverImage' | 'images'
            > & {
                coverImage: string;
                images: string[];
            };

            const payload: PortfolioPayload = {
                ...result.data,
                coverImage: result.data.coverImage!.url,
                images: result.data.images.map(img => img.url),
            };

            const url =
                mode === 'create'
                    ? '/api/portfolio'
                    : `/api/portfolio/${portfolioId}`;
            const method = mode === 'create' ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to save');
            }

            toast.success(
                mode === 'create'
                    ? 'Portfolio created successfully'
                    : 'Portfolio updated successfully',
            );
            router.push('/admin/portfolio');
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setSaving(false);
        }
    }

    const progressColor =
        form.progress === 100
            ? 'text-green-600'
            : form.progress >= 75
              ? 'text-blue-600'
              : form.progress >= 50
                ? 'text-yellow-600'
                : 'text-orange-600';

    return (
        <div className='min-h-screen'>
            {/* Header */}
            <div className='sticky top-0 z-20 border-b bg-white/80 backdrop-blur-lg'>
                <div className='container max-w-7xl mx-auto px-6 py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <Button
                                variant='ghost'
                                size='icon'
                                asChild
                                className='rounded-full'
                            >
                                <Link href='/admin/portfolio'>
                                    <ArrowLeft className='w-4 h-4' />
                                </Link>
                            </Button>
                            <div>
                                <h1 className='text-xl font-bold tracking-tight'>
                                    {mode === 'create'
                                        ? 'Create Portfolio'
                                        : 'Edit Portfolio'}
                                </h1>
                                <p className='text-sm text-muted-foreground'>
                                    {mode === 'create'
                                        ? 'Add a new project to your portfolio'
                                        : 'Update project details and settings'}
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Button
                                variant='outline'
                                onClick={() => router.back()}
                                disabled={saving}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={saving}
                                className='gap-2'
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className='w-4 h-4 animate-spin' />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className='w-4 h-4' />
                                        {mode === 'create' ? 'Create' : 'Save'}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className='container max-w-7xl mx-auto px-6 py-8'>
                <div className='grid lg:grid-cols-3 gap-6'>
                    {/* Main Content - 2 columns */}
                    <div className='lg:col-span-2 space-y-6'>
                        {/* Basic Info */}
                        <Card className='border-0 shadow-sm'>
                            <CardHeader className='border-b bg-gradient-to-br from-slate-50 to-white'>
                                <CardTitle className='text-base'>
                                    Project Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='p-6 space-y-5'>
                                <div className='space-y-2'>
                                    <Label
                                        htmlFor='title'
                                        className='text-sm font-medium'
                                    >
                                        Project Title{' '}
                                        <span className='text-destructive'>
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id='title'
                                        value={form.title}
                                        onChange={e =>
                                            set('title', e.target.value)
                                        }
                                        placeholder='Enter project name'
                                        className={cn(
                                            'h-11',
                                            errors.title &&
                                                'border-destructive',
                                        )}
                                    />
                                    {errors.title && (
                                        <p className='text-xs text-destructive'>
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <div className='flex items-center justify-between'>
                                        <Label
                                            htmlFor='slug'
                                            className='text-sm font-medium'
                                        >
                                            URL Slug{' '}
                                            <span className='text-destructive'>
                                                *
                                            </span>
                                        </Label>
                                        <Button
                                            type='button'
                                            variant='ghost'
                                            size='sm'
                                            onClick={generateSlug}
                                            className='h-7 text-xs'
                                        >
                                            <Sparkles className='w-3 h-3 mr-1' />
                                            Generate
                                        </Button>
                                    </div>
                                    <Input
                                        id='slug'
                                        value={form.slug}
                                        onChange={e =>
                                            set('slug', e.target.value)
                                        }
                                        placeholder='project-url-slug'
                                        className={cn(
                                            'h-11 font-mono text-sm',
                                            errors.slug && 'border-destructive',
                                        )}
                                    />
                                    {errors.slug && (
                                        <p className='text-xs text-destructive'>
                                            {errors.slug}
                                        </p>
                                    )}
                                </div>

                                <div className='grid md:grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <Label
                                            htmlFor='category'
                                            className='text-sm font-medium'
                                        >
                                            Category{' '}
                                            <span className='text-destructive'>
                                                *
                                            </span>
                                        </Label>
                                        <Select
                                            value={form.category}
                                            onValueChange={v =>
                                                set('category', v)
                                            }
                                        >
                                            <SelectTrigger
                                                id='category'
                                                className={cn(
                                                    'h-11',
                                                    errors.category &&
                                                        'border-destructive',
                                                )}
                                            >
                                                <SelectValue placeholder='Select category' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CATEGORIES.map(cat => (
                                                    <SelectItem
                                                        key={cat}
                                                        value={cat}
                                                    >
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category && (
                                            <p className='text-xs text-destructive'>
                                                {errors.category}
                                            </p>
                                        )}
                                    </div>

                                    <div className='space-y-2'>
                                        <Label
                                            htmlFor='client'
                                            className='text-sm font-medium'
                                        >
                                            Client Name
                                        </Label>
                                        <Input
                                            id='client'
                                            value={form.client}
                                            onChange={e =>
                                                set('client', e.target.value)
                                            }
                                            placeholder='Client or company'
                                            className='h-11'
                                        />
                                    </div>
                                </div>

                                <div className='space-y-2'>
                                    <Label
                                        htmlFor='description'
                                        className='text-sm font-medium'
                                    >
                                        Description{' '}
                                        <span className='text-destructive'>
                                            *
                                        </span>
                                    </Label>
                                    <Textarea
                                        id='description'
                                        value={form.description}
                                        onChange={e =>
                                            set('description', e.target.value)
                                        }
                                        placeholder='Describe the project, goals, and key outcomes...'
                                        rows={6}
                                        className={cn(
                                            'resize-none',
                                            errors.description &&
                                                'border-destructive',
                                        )}
                                    />
                                    {errors.description && (
                                        <p className='text-xs text-destructive'>
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className='grid md:grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <Label
                                            htmlFor='liveUrl'
                                            className='text-sm font-medium'
                                        >
                                            Live URL
                                        </Label>
                                        <Input
                                            id='liveUrl'
                                            type='url'
                                            value={form.liveUrl}
                                            onChange={e =>
                                                set('liveUrl', e.target.value)
                                            }
                                            placeholder='https://example.com'
                                            className='h-11'
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <Label
                                            htmlFor='githubUrl'
                                            className='text-sm font-medium'
                                        >
                                            GitHub URL
                                        </Label>
                                        <Input
                                            id='githubUrl'
                                            type='url'
                                            value={form.githubUrl}
                                            onChange={e =>
                                                set('githubUrl', e.target.value)
                                            }
                                            placeholder='https://github.com/...'
                                            className='h-11'
                                        />
                                    </div>
                                </div>

                                <div className='grid md:grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                        <Label
                                            htmlFor='completedAt'
                                            className='text-sm font-medium'
                                        >
                                            Completion Date
                                        </Label>
                                        <Input
                                            id='completedAt'
                                            type='date'
                                            value={form.completedAt}
                                            onChange={e =>
                                                set(
                                                    'completedAt',
                                                    e.target.value,
                                                )
                                            }
                                            className='h-11'
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <Label className='text-sm font-medium flex items-center justify-between'>
                                            <span>Project Progress</span>
                                            <span
                                                className={cn(
                                                    'text-base font-bold tabular-nums',
                                                    progressColor,
                                                )}
                                            >
                                                {form.progress}%
                                            </span>
                                        </Label>
                                        <div className='flex items-center gap-3'>
                                            <Slider
                                                value={[form.progress]}
                                                onValueChange={([value]) =>
                                                    set('progress', value)
                                                }
                                                max={100}
                                                step={5}
                                                className='flex-1'
                                            />
                                            <Input
                                                type='number'
                                                value={form.progress}
                                                onChange={e =>
                                                    set(
                                                        'progress',
                                                        Math.max(
                                                            0,
                                                            Math.min(
                                                                100,
                                                                parseInt(
                                                                    e.target
                                                                        .value,
                                                                ) || 0,
                                                            ),
                                                        ),
                                                    )
                                                }
                                                min={0}
                                                max={100}
                                                className='w-20 h-11 text-center'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Images */}
                        <Card className='border-0 shadow-sm'>
                            <CardHeader className='border-b bg-gradient-to-br from-slate-50 to-white'>
                                <CardTitle className='text-base'>
                                    Media
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='p-6 space-y-5'>
                                <div className='space-y-2'>
                                    <Label className='text-sm font-medium'>
                                        Cover Image{' '}
                                        <span className='text-destructive'>
                                            *
                                        </span>
                                    </Label>
                                    <ImageUploader
                                        value={
                                            form.coverImage
                                                ? [form.coverImage]
                                                : []
                                        }
                                        onChange={imgs =>
                                            set('coverImage', imgs[0] || null)
                                        }
                                        multiple={false}
                                        maxImages={1}
                                    />
                                    {errors.coverImage && (
                                        <p className='text-xs text-destructive'>
                                            {errors.coverImage}
                                        </p>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <Label className='text-sm font-medium'>
                                        Gallery Images{' '}
                                        <span className='text-xs text-muted-foreground'>
                                            (max 10)
                                        </span>
                                    </Label>
                                    <ImageUploader
                                        value={form.images}
                                        onChange={imgs => set('images', imgs)}
                                        maxImages={10}
                                        multiple
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <Card className='border-0 shadow-sm'>
                            <CardHeader className='border-b bg-gradient-to-br from-slate-50 to-white'>
                                <div className='flex items-center justify-between'>
                                    <CardTitle className='text-base'>
                                        Key Features
                                    </CardTitle>
                                    <Button
                                        type='button'
                                        variant='outline'
                                        size='sm'
                                        onClick={addFeature}
                                        className='h-8'
                                    >
                                        <Plus className='w-3 h-3 mr-1' />
                                        Add
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className='p-6'>
                                {form.features.length === 0 ? (
                                    <div className='text-center py-8 text-sm text-muted-foreground'>
                                        No features added yet. Click "Add" to
                                        create one.
                                    </div>
                                ) : (
                                    <div className='space-y-3'>
                                        {form.features.map((feature, i) => (
                                            <div
                                                key={i}
                                                className='group p-4 border rounded-lg hover:border-primary/50 transition-colors bg-slate-50/50'
                                            >
                                                <div className='flex gap-3'>
                                                    <div className='flex-1 space-y-3'>
                                                        <Input
                                                            value={
                                                                feature.title
                                                            }
                                                            onChange={e =>
                                                                updateFeature(
                                                                    i,
                                                                    'title',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder='Feature title'
                                                            className={cn(
                                                                'h-10 bg-white',
                                                                errors[
                                                                    `features.${i}.title`
                                                                ] &&
                                                                    'border-destructive',
                                                            )}
                                                        />
                                                        <Textarea
                                                            value={
                                                                feature.description
                                                            }
                                                            onChange={e =>
                                                                updateFeature(
                                                                    i,
                                                                    'description',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder='Feature description (optional)'
                                                            rows={2}
                                                            className='resize-none bg-white'
                                                        />
                                                    </div>
                                                    <Button
                                                        type='button'
                                                        size='icon'
                                                        variant='ghost'
                                                        className='text-destructive opacity-0 group-hover:opacity-100 transition-opacity'
                                                        onClick={() =>
                                                            set(
                                                                'features',
                                                                form.features.filter(
                                                                    (_, j) =>
                                                                        j !== i,
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className='w-4 h-4' />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Stats */}
                        <Card className='border-0 shadow-sm'>
                            <CardHeader className='border-b bg-gradient-to-br from-slate-50 to-white'>
                                <div className='flex items-center justify-between'>
                                    <CardTitle className='text-base'>
                                        Project Stats
                                    </CardTitle>
                                    <Button
                                        type='button'
                                        variant='outline'
                                        size='sm'
                                        onClick={addStat}
                                        className='h-8'
                                    >
                                        <Plus className='w-3 h-3 mr-1' />
                                        Add
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className='p-6'>
                                {form.stats.length === 0 ? (
                                    <div className='text-center py-8 text-sm text-muted-foreground'>
                                        No stats added yet. Click "Add" to
                                        create one.
                                    </div>
                                ) : (
                                    <div className='space-y-3'>
                                        {form.stats.map((stat, i) => (
                                            <div
                                                key={i}
                                                className='group p-4 border rounded-lg hover:border-primary/50 transition-colors bg-slate-50/50'
                                            >
                                                <div className='flex gap-3'>
                                                    <div className='flex-1 space-y-3'>
                                                        <div className='grid grid-cols-2 gap-3'>
                                                            <Input
                                                                value={
                                                                    stat.label
                                                                }
                                                                onChange={e =>
                                                                    updateStat(
                                                                        i,
                                                                        'label',
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                placeholder='Label (e.g., Users)'
                                                                className={cn(
                                                                    'h-10 bg-white',
                                                                    errors[
                                                                        `stats.${i}.label`
                                                                    ] &&
                                                                        'border-destructive',
                                                                )}
                                                            />
                                                            <Input
                                                                value={
                                                                    stat.value
                                                                }
                                                                onChange={e =>
                                                                    updateStat(
                                                                        i,
                                                                        'value',
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                placeholder='Value (e.g., 10k+)'
                                                                className={cn(
                                                                    'h-10 bg-white',
                                                                    errors[
                                                                        `stats.${i}.value`
                                                                    ] &&
                                                                        'border-destructive',
                                                                )}
                                                            />
                                                        </div>
                                                        <IconPicker
                                                            value={stat.icon}
                                                            onChange={icon =>
                                                                updateStat(
                                                                    i,
                                                                    'icon',
                                                                    icon,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <Button
                                                        type='button'
                                                        size='icon'
                                                        variant='ghost'
                                                        className='text-destructive opacity-0 group-hover:opacity-100 transition-opacity'
                                                        onClick={() =>
                                                            set(
                                                                'stats',
                                                                form.stats.filter(
                                                                    (_, j) =>
                                                                        j !== i,
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className='w-4 h-4' />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className='space-y-6'>
                        {/* Publish Settings */}
                        <Card className='border-0 shadow-sm'>
                            <CardHeader className='border-b bg-gradient-to-br from-slate-50 to-white'>
                                <CardTitle className='text-base'>
                                    Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='p-6 space-y-5'>
                                <div className='space-y-2'>
                                    <Label className='text-sm font-medium'>
                                        Status
                                    </Label>
                                    <Select
                                        value={form.status}
                                        onValueChange={v =>
                                            set(
                                                'status',
                                                v as PortfolioSchema['status'],
                                            )
                                        }
                                    >
                                        <SelectTrigger className='h-10'>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='DRAFT'>
                                                <span className='flex items-center gap-2'>
                                                    <span className='w-2 h-2 rounded-full bg-slate-500' />
                                                    Draft
                                                </span>
                                            </SelectItem>
                                            <SelectItem value='PUBLISHED'>
                                                <span className='flex items-center gap-2'>
                                                    <span className='w-2 h-2 rounded-full bg-green-500' />
                                                    Published
                                                </span>
                                            </SelectItem>
                                            <SelectItem value='ARCHIVED'>
                                                <span className='flex items-center gap-2'>
                                                    <span className='w-2 h-2 rounded-full bg-red-500' />
                                                    Archived
                                                </span>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='flex items-center justify-between p-3 rounded-lg border bg-slate-50/50'>
                                    <div>
                                        <Label
                                            htmlFor='featured'
                                            className='text-sm font-medium cursor-pointer'
                                        >
                                            Featured Project
                                        </Label>
                                        <p className='text-xs text-muted-foreground mt-0.5'>
                                            Highlight on homepage
                                        </p>
                                    </div>
                                    <Switch
                                        id='featured'
                                        checked={form.featured}
                                        onCheckedChange={v =>
                                            set('featured', v)
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tags */}
                        <Card className='border-0 shadow-sm'>
                            <CardHeader className='border-b bg-gradient-to-br from-slate-50 to-white'>
                                <CardTitle className='text-base'>
                                    Tags
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='p-6 space-y-3'>
                                <div className='flex gap-2'>
                                    <Input
                                        value={tagInput}
                                        onChange={e =>
                                            setTagInput(e.target.value)
                                        }
                                        placeholder='Add tag...'
                                        className='h-10'
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addTag();
                                            }
                                        }}
                                    />
                                    <Button
                                        type='button'
                                        variant='outline'
                                        size='icon'
                                        onClick={addTag}
                                        className='shrink-0'
                                    >
                                        <Plus className='w-4 h-4' />
                                    </Button>
                                </div>
                                {form.tags.length > 0 && (
                                    <div className='flex flex-wrap gap-2'>
                                        {form.tags.map(tag => (
                                            <Badge
                                                key={tag}
                                                variant='secondary'
                                                className='cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors'
                                                onClick={() =>
                                                    set(
                                                        'tags',
                                                        form.tags.filter(
                                                            t => t !== tag,
                                                        ),
                                                    )
                                                }
                                            >
                                                {tag}
                                                <X className='w-3 h-3 ml-1' />
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Error Summary */}
                        {submitted && Object.keys(errors).length > 0 && (
                            <Card className='border-destructive bg-destructive/5'>
                                <CardHeader className='pb-3'>
                                    <CardTitle className='text-sm text-destructive flex items-center gap-2'>
                                        <span className='w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold'>
                                            {Object.keys(errors).length}
                                        </span>
                                        Validation Error
                                        {Object.keys(errors).length > 1
                                            ? 's'
                                            : ''}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='pt-0'>
                                    <ul className='space-y-1 text-xs'>
                                        {Object.entries(errors)
                                            .slice(0, 5)
                                            .map(([key, msg]) => (
                                                <li
                                                    key={key}
                                                    className='text-destructive flex items-start gap-1.5'
                                                >
                                                    <span className='mt-0.5'>
                                                        •
                                                    </span>
                                                    <span>{msg}</span>
                                                </li>
                                            ))}
                                        {Object.keys(errors).length > 5 && (
                                            <li className='text-destructive/70'>
                                                ...and{' '}
                                                {Object.keys(errors).length - 5}{' '}
                                                more
                                            </li>
                                        )}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
