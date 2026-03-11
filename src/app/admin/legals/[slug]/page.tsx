'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

import api from '@/lib/axios';
import { legalPageSchema, LegalPageFormValues } from '@/schemas/legal';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { GeneralInfo } from './components/GeneralInfo';
import { SectionList } from './components/SectionList';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function LegalEditorPage({ params }: PageProps) {
    const { slug } = use(params);
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<LegalPageFormValues>({
        resolver: zodResolver(legalPageSchema),
        defaultValues: {
            title: '',
            slug: slug,
            introText: '',
            effectiveDate: '',
            sections: [],
        },
    });

    useEffect(() => {
        async function loadData() {
            try {
                const { data } = await api.get(`/legals/${slug}`);
                form.reset({
                    title: data.title || '',
                    slug: slug,
                    introText: data.introText || '',
                    effectiveDate: data.effectiveDate || '',
                    sections: data.sections || [],
                });
            } catch (error: any) {
                if (error.response?.status === 404) {
                    toast.info('Creating a new document...');
                } else {
                    toast.error('Failed to load document.');
                }
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, [slug, form]);

    const onSubmit = async (data: LegalPageFormValues) => {
        try {
            await api.put(`/legals/${slug}`, data);
            toast.success('Document saved successfully!');
            router.refresh();
        } catch (error) {
            toast.error('Failed to save changes.');
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <Loader2 className='animate-spin' />
            </div>
        );
    }

    return (
        <div className='min-h-screen max-w-7xl mx-auto'>
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
                                            Manage your legal page content.
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

                    <SectionList />
                </form>
            </FormProvider>
        </div>
    );
}
