'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, FileStack, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DeleteAlert } from '@/components/admin/DeleteAlert';
import { CreateContentPageDialog } from './components/CreateContentPageDialog';

type ContentPageSummary = {
    id: string;
    heroTitle: string;
    slug: string;
    updatedAt: string;
};

export default function ContentBlocksDashboard() {
    const [pages, setPages] = useState<ContentPageSummary[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPages = async () => {
        try {
            const { data } = await api.get('/content-blocks');
            setPages(data);
        } catch (error) {
            toast.error('Failed to load content pages.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleDelete = async (slug: string) => {
        try {
            await api.delete(`/content-blocks/${slug}`);
            toast.success('Page deleted successfully.');
            fetchPages();
        } catch (error) {
            toast.error('Failed to delete page.');
        }
    };

    if (loading) {
        return (
            <div className='p-8 flex justify-center items-center min-h-[400px]'>
                <Loader2 className='animate-spin h-8 w-8 text-primary' />
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto py-8 space-y-8'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold'>Content Block Pages</h1>
                    <p className='text-muted-foreground text-sm mt-1'>
                        {`Manage pages with layouts like "Our Approach" or
                        "Industries".`}
                    </p>
                </div>
                <CreateContentPageDialog onSuccess={fetchPages} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Pages</CardTitle>
                </CardHeader>
                <CardContent>
                    {pages.length === 0 ? (
                        <div className='text-center py-12 text-muted-foreground'>
                            <FileStack className='mx-auto h-12 w-12 opacity-20 mb-4' />
                            <p>No content pages found.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='w-[40%]'>
                                        Hero Title
                                    </TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead className='text-right'>
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pages.map(page => (
                                    <TableRow key={page.id} className='group'>
                                        <TableCell className='font-medium'>
                                            <div className='flex items-center gap-2'>
                                                <FileStack className='h-4 w-4 text-blue-600' />
                                                {page.heroTitle}
                                            </div>
                                        </TableCell>
                                        <TableCell className='text-muted-foreground'>
                                            <span className='bg-secondary px-2 py-1 rounded text-xs font-mono'>
                                                /{page.slug}
                                            </span>
                                        </TableCell>
                                        <TableCell className='text-right'>
                                            <div className='flex justify-end items-center gap-2'>
                                                <Link
                                                    href={`/admin/content-blocks/${page.slug}`}
                                                >
                                                    <Button
                                                        variant='ghost'
                                                        size='sm'
                                                    >
                                                        <Pencil className='h-4 w-4 mr-2' />
                                                        Edit
                                                    </Button>
                                                </Link>

                                                <DeleteAlert
                                                    title='Delete Content Page?'
                                                    description={
                                                        <span>
                                                            Are you sure you
                                                            want to delete{' '}
                                                            <strong>
                                                                {page.heroTitle}
                                                            </strong>
                                                            ? All blocks within
                                                            this page will be
                                                            permanently removed.
                                                        </span>
                                                    }
                                                    onDelete={() =>
                                                        handleDelete(page.slug)
                                                    }
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
