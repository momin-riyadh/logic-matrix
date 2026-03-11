'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Eye, Star } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { DeleteAlert } from '@/components/admin/DeleteAlert';

type Portfolio = {
    id: string;
    title: string;
    slug: string;
    category: string;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    featured: boolean;
    coverImage: string;
    progress: number;
    createdAt: string;
};

const STATUS_COLORS = {
    DRAFT: 'secondary',
    PUBLISHED: 'default',
    ARCHIVED: 'destructive',
} as const;

export default function AdminPortfolioPage() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [search, setSearch] = useState('');

    const fetchPortfolios = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ limit: '100' });
            if (statusFilter !== 'all') params.set('status', statusFilter);
            const res = await fetch(`/api/portfolio?${params}`);
            const data = await res.json();
            setPortfolios(data.portfolios);
        } catch {
            toast.error('Failed to load portfolios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, [statusFilter]);

    const handleDelete = async (deleteId: string) => {
        try {
            const res = await fetch(`/api/portfolio/${deleteId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error();
            toast.success('Portfolio deleted');
            setPortfolios(prev => prev.filter(p => p.id !== deleteId));
        } catch {
            toast.error('Failed to delete portfolio');
        }
    };

    const filtered = portfolios.filter(
        p =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className='max-w-7xl mx-auto py-8 space-y-8'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold'>Portfolio</h1>
                    <p className='text-muted-foreground text-sm mt-1'>
                        Manage your portfolio projects
                    </p>
                </div>
                <Button asChild>
                    <Link href='/admin/portfolio/new'>
                        <Plus className='w-4 h-4 mr-2' />
                        Add Project
                    </Link>
                </Button>
            </div>

            {/* Filters */}
            <div className='flex gap-3'>
                <Input
                    placeholder='Search projects...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className='max-w-xs'
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className='w-40'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>All Status</SelectItem>
                        <SelectItem value='PUBLISHED'>Published</SelectItem>
                        <SelectItem value='DRAFT'>Draft</SelectItem>
                        <SelectItem value='ARCHIVED'>Archived</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className='border rounded-lg'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-16'>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className='text-right'>
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className='text-center py-12 text-muted-foreground'
                                >
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : filtered.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className='text-center py-12 text-muted-foreground'
                                >
                                    No portfolios found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map(portfolio => (
                                <TableRow key={portfolio.id}>
                                    <TableCell>
                                        <div className='w-12 h-12 relative rounded-md overflow-hidden bg-muted'>
                                            <Image
                                                src={portfolio.coverImage}
                                                alt={portfolio.title}
                                                fill
                                                className='object-cover'
                                                onError={e => {
                                                    (
                                                        e.target as HTMLImageElement
                                                    ).src =
                                                        'https://placehold.co/48x48?text=?';
                                                }}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className='font-medium'>
                                        {portfolio.title}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant='outline'>
                                            {portfolio.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                STATUS_COLORS[portfolio.status]
                                            }
                                        >
                                            {portfolio.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-16 h-2 bg-muted rounded-full overflow-hidden'>
                                                <div
                                                    className='h-full bg-primary transition-all'
                                                    style={{
                                                        width: `${portfolio.progress}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className='text-xs text-muted-foreground'>
                                                {portfolio.progress}%
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {portfolio.featured && (
                                            <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                                        )}
                                    </TableCell>
                                    <TableCell className='text-muted-foreground text-sm'>
                                        {new Date(
                                            portfolio.createdAt,
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex justify-end gap-1'>
                                            <Button
                                                size='icon'
                                                variant='ghost'
                                                asChild
                                            >
                                                <Link
                                                    href={`/portfolio/${portfolio.slug}`}
                                                    target='_blank'
                                                >
                                                    <Eye className='w-4 h-4' />
                                                </Link>
                                            </Button>
                                            <Button
                                                size='icon'
                                                variant='ghost'
                                                asChild
                                            >
                                                <Link
                                                    href={`/admin/portfolio/${portfolio.id}/edit`}
                                                >
                                                    <Pencil className='w-4 h-4' />
                                                </Link>
                                            </Button>
                                            <DeleteAlert
                                                title='Delete Portfolio?'
                                                description='This action cannot be undone. The portfolio project will be permanently deleted.'
                                                onDelete={() =>
                                                    handleDelete(portfolio.id)
                                                }
                                            />
                                            {/* <Button
                                                size='icon'
                                                variant='ghost'
                                                className='text-destructive hover:text-destructive'
                                                onClick={() =>
                                                    setDeleteId(portfolio.id)
                                                }
                                            >
                                                <Trash2 className='w-4 h-4' />
                                            </Button> */}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Confirmation */}
            {/* <AlertDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Portfolio?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. The portfolio project
                            will be permanently deleted.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                            onClick={handleDelete}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </div>
    );
}
