import { Suspense } from 'react';
import { UsersClient } from './_components/users-client';
import { Skeleton } from '@/components/ui/skeleton';

export default function UsersPage() {
    return (
        <div className='max-w-7xl mx-auto py-8 space-y-8'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold'>User Management</h1>
                    <p className='text-muted-foreground text-sm mt-1'>
                        View, create, edit, and manage user accounts.
                    </p>
                </div>
            </div>
            <Suspense fallback={<UsersTableSkeleton />}>
                <UsersClient />
            </Suspense>
        </div>
    );
}

function UsersTableSkeleton() {
    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <Skeleton className='h-9 w-72' />
                <Skeleton className='h-9 w-32' />
            </div>
            <div className='rounded-lg border'>
                <div className='divide-y'>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className='flex items-center gap-4 px-4 py-3'
                        >
                            <Skeleton className='h-9 w-9 rounded-full' />
                            <div className='flex-1 space-y-1.5'>
                                <Skeleton className='h-3.5 w-32' />
                                <Skeleton className='h-3 w-48' />
                            </div>
                            <Skeleton className='h-5 w-16 rounded-full' />
                            <Skeleton className='h-3), w-20' />
                            <Skeleton className='h-8 w-8 rounded-md' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
