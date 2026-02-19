'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

function VerifyEmailForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing verification token');
            return;
        }

        if (!isVerified) {
            verifyEmail();
        }
    }, [token, isVerified]);

    const verifyEmail = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Email verification failed');
            } else {
                setSuccess(true);
                setIsVerified(true);
                setTimeout(() => {
                    router.push('/auth/login');
                }, 3000);
            }
        } catch (error) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-background px-4 py-12'>
            <div className='w-full max-w-md'>
                <div className='bg-card rounded-lg border shadow-sm'>
                    <div className='p-6 space-y-1'>
                        <h3 className='text-2xl font-semibold leading-none tracking-tight'>
                            Email Verification
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                            {isLoading
                                ? 'Verifying your email address...'
                                : success
                                  ? 'Your email has been verified'
                                  : 'Verification status'}
                        </p>
                    </div>

                    <div className='p-6 pt-0 space-y-4'>
                        {isLoading && (
                            <div className='flex flex-col items-center gap-4 py-8'>
                                <Loader2 className='h-12 w-12 animate-spin text-primary' />
                                <p className='text-sm text-muted-foreground'>
                                    Please wait while we verify your email...
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className='flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md'>
                                <AlertCircle className='h-4 w-4' />
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className='flex flex-col items-center gap-4 py-8'>
                                <div className='rounded-full bg-green-100 dark:bg-green-900/20 p-3'>
                                    <CheckCircle2 className='h-12 w-12 text-green-600 dark:text-green-400' />
                                </div>
                                <div className='text-center space-y-2'>
                                    <p className='font-medium text-green-600 dark:text-green-400'>
                                        Email verified successfully!
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                        You can now log in to your account.
                                        Redirecting...
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className='flex justify-center pt-4'>
                            <Link href='/auth/login'>
                                <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
                                    Go to Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense
            fallback={
                <div className='min-h-screen flex items-center justify-center bg-background'>
                    <Loader2 className='h-8 w-8 animate-spin text-primary' />
                </div>
            }
        >
            <VerifyEmailForm />
        </Suspense>
    );
}
