'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    forgotPasswordSchema,
    type ForgotPasswordInput,
} from '@/lib/validations/auth';
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordInput) => {
        setError('');
        setSuccess(false);
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Failed to send reset email');
            } else {
                setSuccess(true);
                reset();
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
                            Forgot password?
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                            {`Enter your email address and we'll send you a link
                            to reset your password`}
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='p-6 pt-0 space-y-4'
                    >
                        {error && (
                            <div className='flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md'>
                                <AlertCircle className='h-4 w-4' />
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className='flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-md'>
                                <CheckCircle2 className='h-4 w-4' />
                                <span>
                                    If an account exists with this email, you
                                    will receive a password reset link shortly.
                                </span>
                            </div>
                        )}

                        <div className='space-y-2'>
                            <label
                                htmlFor='email'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Email
                            </label>
                            <input
                                id='email'
                                type='email'
                                placeholder='you@example.com'
                                disabled={isLoading}
                                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className='text-sm text-destructive'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <button
                            type='submit'
                            disabled={isLoading}
                            className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full'
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Sending...
                                </>
                            ) : (
                                'Send reset link'
                            )}
                        </button>

                        <div className='pt-4'>
                            <Link
                                href='/auth/login'
                                className='flex items-center justify-center text-sm text-primary hover:underline underline-offset-4'
                            >
                                <ArrowLeft className='mr-2 h-4 w-4' />
                                Back to login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
