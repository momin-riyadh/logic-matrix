'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home, MoveLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className='flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-md text-center'>
                <div className='relative mb-8 flex justify-center'>
                    <div className='absolute inset-0 flex items-center justify-center opacity-10 blur-3xl'>
                        <div className='h-32 w-32 rounded-full bg-primary' />
                    </div>
                    <div className='relative rounded-full bg-muted p-6'>
                        <FileQuestion
                            className='h-12 w-12 text-primary'
                            strokeWidth={1.5}
                        />
                    </div>
                </div>

                <h1 className='mt-4 text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl'>
                    404
                </h1>
                <p className='mt-4 text-lg font-medium text-muted-foreground'>
                    {`Oops! The page you're looking for seems to have vanished
                    into the digital void.`}
                </p>

                <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                    <Button
                        asChild
                        variant='default'
                        className='w-full sm:w-auto'
                    >
                        <Link href='/'>
                            <Home className='mr-2 h-4 w-4' />
                            Back to Home
                        </Link>
                    </Button>
                    <Button
                        variant='outline'
                        className='w-full sm:w-auto'
                        onClick={() => window.history.back()}
                    >
                        <MoveLeft className='mr-2 h-4 w-4' />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
