'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        setError('');
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/dashboard');
                router.refresh();
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
                            Welcome back
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                            Enter your credentials to access your account
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

                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor='password'
                                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                >
                                    Password
                                </label>
                                <Link
                                    href='/auth/forgot-password'
                                    className='text-sm text-primary underline-offset-4 hover:underline'
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                id='password'
                                type='password'
                                placeholder='••••••••'
                                disabled={isLoading}
                                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className='text-sm text-destructive'>
                                    {errors.password.message}
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
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>

                        <div className='pt-4'>
                            <p className='text-sm text-center text-muted-foreground'>
                                {`Don't have an account? `}
                                <Link
                                    href='/auth/register'
                                    className='text-primary underline-offset-4 hover:underline'
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
