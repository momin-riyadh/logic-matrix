'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Pencil, FileText, Loader2 } from 'lucide-react';
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
import { CreateLegalDocDialog } from './components/CreateLegalDocDialog';

type LegalDocSummary = {
    id: string;
    title: string;
    slug: string;
    lastUpdated: string;
};

export default function LegalDashboard() {
    const [docs, setDocs] = useState<LegalDocSummary[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDocs = async () => {
        try {
            const { data } = await api.get('/legals');
            setDocs(data);
        } catch (error) {
            toast.error('Failed to load legal documents.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocs();
    }, []);

    const handleDelete = async (slug: string) => {
        try {
            await api.delete(`/legals/${slug}`);
            toast.success('Document deleted.');
            fetchDocs();
        } catch (error) {
            toast.error('Failed to delete document.');
        }
    };

    if (loading)
        return (
            <div className='p-8 flex justify-center'>
                <Loader2 className='animate-spin' />
            </div>
        );

    return (
        <div className='max-w-7xl mx-auto py-8 space-y-8'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold'>Legal Documents</h1>
                    <p className='text-muted-foreground text-sm mt-1'>
                        Manage your policies, terms, and agreements.
                    </p>
                </div>
                <CreateLegalDocDialog onSuccess={fetchDocs} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Documents</CardTitle>
                </CardHeader>
                <CardContent>
                    {docs.length === 0 ? (
                        <div className='text-center py-12 text-muted-foreground'>
                            <FileText className='mx-auto h-12 w-12 opacity-20 mb-4' />
                            <p>No legal documents found.</p>
                            <CreateLegalDocDialog onSuccess={fetchDocs} />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='w-[40%]'>
                                        Title
                                    </TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead className='text-right'>
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {docs.map(doc => (
                                    <TableRow key={doc.id}>
                                        <TableCell className='font-medium'>
                                            <div className='flex items-center gap-2'>
                                                <FileText className='h-4 w-4 text-primary' />
                                                {doc.title}
                                            </div>
                                        </TableCell>
                                        <TableCell className='text-muted-foreground'>
                                            <span className='bg-secondary px-2 py-1 rounded text-xs font-mono'>
                                                /{doc.slug}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {format(
                                                new Date(doc.lastUpdated),
                                                'MMM d, yyyy',
                                            )}
                                        </TableCell>
                                        <TableCell className='text-right'>
                                            <div className='flex justify-end items-center gap-2'>
                                                <Link
                                                    href={`/admin/legals/${doc.slug}`}
                                                >
                                                    <Button
                                                        variant='ghost'
                                                        size='sm'
                                                    >
                                                        <Pencil className='h-4 w-4 mr-1' />{' '}
                                                        Edit
                                                    </Button>
                                                </Link>

                                                <DeleteAlert
                                                    title='Delete Legal Document?'
                                                    description={
                                                        <span>
                                                            This will
                                                            permanently delete{' '}
                                                            <strong>
                                                                {doc.title}
                                                            </strong>{' '}
                                                            and all its
                                                            sections.
                                                        </span>
                                                    }
                                                    onDelete={() =>
                                                        handleDelete(doc.slug)
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
