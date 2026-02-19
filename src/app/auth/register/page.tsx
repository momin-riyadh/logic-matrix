'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterInput) => {
        setError('');
        setSuccess(false);
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Registration failed');
            } else {
                setSuccess(true);
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
                            Create an account
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                            Enter your information to get started
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
                                    Registration successful! Check your email to
                                    verify your account. Redirecting to login...
                                </span>
                            </div>
                        )}

                        <div className='space-y-2'>
                            <label
                                htmlFor='name'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Full Name
                            </label>
                            <input
                                id='name'
                                type='text'
                                placeholder='Your Name'
                                disabled={isLoading || success}
                                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className='text-sm text-destructive'>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

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
                                disabled={isLoading || success}
                                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className='text-sm text-destructive'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <label
                                htmlFor='password'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Password
                            </label>
                            <input
                                id='password'
                                type='password'
                                placeholder='••••••••'
                                disabled={isLoading || success}
                                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className='text-sm text-destructive'>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <label
                                htmlFor='confirmPassword'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Confirm Password
                            </label>
                            <input
                                id='confirmPassword'
                                type='password'
                                placeholder='••••••••'
                                disabled={isLoading || success}
                                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <p className='text-sm text-destructive'>
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type='submit'
                            disabled={isLoading || success}
                            className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full'
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Creating account...
                                </>
                            ) : (
                                'Sign up'
                            )}
                        </button>

                        <div className='pt-4'>
                            <p className='text-sm text-center text-muted-foreground'>
                                Already have an account?{' '}
                                <Link
                                    href='/auth/login'
                                    className='text-primary underline-offset-4 hover:underline'
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
