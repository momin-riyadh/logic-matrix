import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect('/auth/login');
    }

    return (
        <div className='min-h-screen bg-background'>
            <div className='border-b'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        <h1 className='text-2xl font-bold'>Dashboard</h1>
                        <form
                            action={async () => {
                                'use server';
                                const { signOut } = await import('@/auth');
                                await signOut({ redirectTo: '/auth/login' });
                            }}
                        >
                            <button
                                type='submit'
                                className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2'
                            >
                                <LogOut className='mr-2 h-4 w-4' />
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='space-y-6'>
                    <div className='bg-card rounded-lg border shadow-sm'>
                        <div className='p-6'>
                            <h3 className='text-xl font-semibold leading-none tracking-tight mb-4'>
                                Welcome back!
                            </h3>
                            <p className='text-sm text-muted-foreground mb-6'>
                                {`You're successfully logged in to your account`}
                            </p>

                            <div className='space-y-3'>
                                <div className='flex items-start'>
                                    <span className='text-sm font-medium min-w-[140px]'>
                                        Name:
                                    </span>
                                    <span className='text-sm text-muted-foreground'>
                                        {session.user?.name || 'Not provided'}
                                    </span>
                                </div>

                                <div className='flex items-start'>
                                    <span className='text-sm font-medium min-w-[140px]'>
                                        Email:
                                    </span>
                                    <span className='text-sm text-muted-foreground'>
                                        {session.user?.email}
                                    </span>
                                </div>

                                <div className='flex items-start'>
                                    <span className='text-sm font-medium min-w-[140px]'>
                                        Email Verified:
                                    </span>
                                    <span className='text-sm text-muted-foreground'>
                                        {session.user?.emailVerified
                                            ? new Date(
                                                  session.user.emailVerified,
                                              ).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric',
                                              })
                                            : 'Not verified'}
                                    </span>
                                </div>

                                <div className='flex items-start'>
                                    <span className='text-sm font-medium min-w-[140px]'>
                                        User ID:
                                    </span>
                                    <span className='text-sm text-muted-foreground font-mono'>
                                        {session.user?.id}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        <div className='bg-card rounded-lg border shadow-sm'>
                            <div className='p-6'>
                                <h4 className='text-sm font-medium mb-2'>
                                    Account Status
                                </h4>
                                <p className='text-2xl font-bold text-green-600 dark:text-green-400'>
                                    Active
                                </p>
                                <p className='text-xs text-muted-foreground mt-1'>
                                    Your account is in good standing
                                </p>
                            </div>
                        </div>

                        <div className='bg-card rounded-lg border shadow-sm'>
                            <div className='p-6'>
                                <h4 className='text-sm font-medium mb-2'>
                                    Security
                                </h4>
                                <p className='text-2xl font-bold'>
                                    {session.user?.emailVerified ? '✓' : '⚠'}{' '}
                                    Verified
                                </p>
                                <p className='text-xs text-muted-foreground mt-1'>
                                    {session.user?.emailVerified
                                        ? 'Your email is verified'
                                        : 'Please verify your email'}
                                </p>
                            </div>
                        </div>

                        <div className='bg-card rounded-lg border shadow-sm'>
                            <div className='p-6'>
                                <h4 className='text-sm font-medium mb-2'>
                                    Session
                                </h4>
                                <p className='text-2xl font-bold'>JWT</p>
                                <p className='text-xs text-muted-foreground mt-1'>
                                    Using secure token authentication
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <div className='bg-card rounded-lg border shadow-sm'>
                        <div className='p-6'>
                            <h3 className='text-lg font-semibold mb-4'>
                                Quick Actions
                            </h3>
                            <div className='flex flex-wrap gap-3'>
                                <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>
                                    Update Profile
                                </button>
                                <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
                                    Change Password
                                </button>
                                <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
                                    Security Settings
                                </button>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
