'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Blog, BlogsResponse } from '@/types/blog';
import { BlogsTable } from './components/BlogsTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
    PenLine,
    Search,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    FileText,
    Globe,
    LayoutGrid,
} from 'lucide-react';

function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

type StatusFilter = 'ALL' | 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
type TypeFilter = 'ALL' | 'internal' | 'external';

export default function BlogsAdminPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
    const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL');
    const [isLoading, setIsLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    const debouncedSearch = useDebounce(search, 400);

    const fetchBlogs = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                page: pagination.page.toString(),
                limit: pagination.limit.toString(),
            });
            if (debouncedSearch) params.set('search', debouncedSearch);
            if (statusFilter !== 'ALL') params.set('status', statusFilter);
            if (typeFilter !== 'ALL') params.set('type', typeFilter);

            const res = await fetch(`/api/blogs?${params}`);
            const data: BlogsResponse = await res.json();
            setBlogs(data.blogs);
            setPagination(prev => ({ ...prev, ...data.pagination }));
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        } finally {
            setIsLoading(false);
        }
    }, [
        pagination.page,
        pagination.limit,
        debouncedSearch,
        statusFilter,
        typeFilter,
        refreshKey,
    ]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    useEffect(() => {
        setPagination(prev => ({ ...prev, page: 1 }));
    }, [debouncedSearch, statusFilter, typeFilter]);

    return (
        <div className='min-h-screen bg-background'>
            <div className='max-w-7xl mx-auto py-8 space-y-8'>
                <div className='flex items-center justify-between gap-4 flex-wrap'>
                    <div>
                        <h1 className='text-2xl font-bold tracking-tight'>
                            Blog Posts
                        </h1>
                        <p className='text-sm text-muted-foreground mt-0.5'>
                            {isLoading
                                ? 'Loading...'
                                : `${pagination.total} post${pagination.total !== 1 ? 's' : ''} total`}
                        </p>
                    </div>
                    <Button asChild>
                        <Link href='/admin/blogs/new'>
                            <PenLine className='w-4 h-4 mr-2' />
                            New Post
                        </Link>
                    </Button>
                </div>

                <div className='grid grid-cols-3 gap-3'>
                    {[
                        {
                            label: 'All Posts',
                            icon: LayoutGrid,
                            filter: () => {
                                setTypeFilter('ALL');
                                setStatusFilter('ALL');
                            },
                        },
                        {
                            label: 'Internal',
                            icon: FileText,
                            filter: () => {
                                setTypeFilter('internal');
                            },
                        },
                        {
                            label: 'External',
                            icon: Globe,
                            filter: () => {
                                setTypeFilter('external');
                            },
                        },
                    ].map(({ label, icon: Icon, filter }) => (
                        <button
                            key={label}
                            onClick={filter}
                            className='rounded-lg border bg-card p-4 text-left hover:bg-muted/30 transition-colors'
                        >
                            <div className='flex items-center gap-2 text-sm text-muted-foreground mb-1'>
                                <Icon className='w-4 h-4' />
                                {label}
                            </div>
                            <p className='text-2xl font-bold'>
                                {isLoading ? '—' : pagination.total}
                            </p>
                        </button>
                    ))}
                </div>

                <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='relative flex-1 max-w-sm'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />
                        <Input
                            placeholder='Search posts...'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className='pl-9'
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        onValueChange={v => setStatusFilter(v as StatusFilter)}
                    >
                        <SelectTrigger className='w-[150px]'>
                            <SelectValue placeholder='Status' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='ALL'>All Status</SelectItem>
                            <SelectItem value='DRAFT'>Draft</SelectItem>
                            <SelectItem value='PUBLISHED'>Published</SelectItem>
                            <SelectItem value='ARCHIVED'>Archived</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={typeFilter}
                        onValueChange={v => setTypeFilter(v as TypeFilter)}
                    >
                        <SelectTrigger className='w-[150px]'>
                            <SelectValue placeholder='Type' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='ALL'>All Types</SelectItem>
                            <SelectItem value='internal'>Internal</SelectItem>
                            <SelectItem value='external'>External</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() => setRefreshKey(k => k + 1)}
                        title='Refresh'
                    >
                        <RefreshCw className='w-4 h-4' />
                    </Button>
                </div>

                {isLoading ? (
                    <div className='space-y-3'>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className='h-14 w-full rounded-lg'
                            />
                        ))}
                    </div>
                ) : (
                    <BlogsTable
                        blogs={blogs}
                        onRefresh={() => setRefreshKey(k => k + 1)}
                    />
                )}

                {!isLoading && pagination.totalPages > 1 && (
                    <div className='flex items-center justify-between'>
                        <p className='text-sm text-muted-foreground'>
                            Showing{' '}
                            {(pagination.page - 1) * pagination.limit + 1}–
                            {Math.min(
                                pagination.page * pagination.limit,
                                pagination.total,
                            )}{' '}
                            of {pagination.total}
                        </p>
                        <div className='flex gap-2'>
                            <Button
                                variant='outline'
                                size='sm'
                                disabled={pagination.page <= 1}
                                onClick={() =>
                                    setPagination(p => ({
                                        ...p,
                                        page: p.page - 1,
                                    }))
                                }
                            >
                                <ChevronLeft className='w-4 h-4 mr-1' />
                                Previous
                            </Button>
                            <Button
                                variant='outline'
                                size='sm'
                                disabled={
                                    pagination.page >= pagination.totalPages
                                }
                                onClick={() =>
                                    setPagination(p => ({
                                        ...p,
                                        page: p.page + 1,
                                    }))
                                }
                            >
                                Next
                                <ChevronRight className='w-4 h-4 ml-1' />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
