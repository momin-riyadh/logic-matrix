'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import api from '@/lib/axios';
import {
    contentBlockPageSchema,
    ContentBlockFormValues,
} from '@/schemas/content-block';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { GeneralInfo } from './components/GeneralInfo';
import { BlockList } from './components/BlockList';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function ContentBlockEditorPage({ params }: PageProps) {
    const { slug } = use(params);
    console.log('🚀 ~ ContentBlockEditorPage ~ slug:', slug);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<ContentBlockFormValues>({
        resolver: zodResolver(contentBlockPageSchema) as any,
        defaultValues: {
            title: '',
            slug: slug,
            heroDescription: '',
            blocks: [],
        },
    });

    useEffect(() => {
        async function loadData() {
            try {
                const { data } = await api.get(`/content-blocks/${slug}`);
                form.reset({
                    title: data.heroTitle || '',
                    slug: slug,
                    heroDescription: data.heroDescription || '',
                    blocks: data.blocks || [],
                });
            } catch (error: any) {
                toast.error('Failed to load page data.');
                router.push('/admin/content-blocks');
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, [slug, form, router]);

    const onSubmit = async (data: ContentBlockFormValues) => {
        try {
            await api.put(`/content-blocks/${slug}`, data);
            toast.success('Page updated successfully!');
            router.refresh();
        } catch (error) {
            toast.error('Failed to save changes.');
        }
    };

    if (isLoading) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <Loader2 className='animate-spin text-blue-600' />
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'
                >
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
                                        <Link href='/admin/legals'>
                                            <ArrowLeft className='w-4 h-4' />
                                        </Link>
                                    </Button>
                                    <div>
                                        <h1 className='text-xl font-bold tracking-tight'>
                                            {form.watch('title') ||
                                                'New Document'}
                                        </h1>
                                        <p className='text-sm text-muted-foreground'>
                                            /{slug}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <Button
                                        type='submit'
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting ? (
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        ) : (
                                            <Save className='mr-2 h-4 w-4' />
                                        )}
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <GeneralInfo />
                    <Separator />
                    <BlockList />
                </form>
            </FormProvider>
        </div>
    );
}
