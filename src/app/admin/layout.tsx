// app/admin/layout.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';
import { AdminSidebar } from '@/components/layout/admin/sidebar';
import { ThemeProvider } from '@/providers/theme-provider';
import { ThemeToggle } from '@/components/layout/admin/theme-toggle';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect('/auth/login');
    }

    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider>
                <AdminSidebar session={session} />
                <SidebarInset>
                    <header className='flex h-16 shrink-0 items-center justify-between border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                        <div className='flex items-center gap-2'>
                            <SidebarTrigger className='-ml-1' />
                            <Separator
                                orientation='vertical'
                                className='mr-2 h-4'
                            />
                            <h1 className='text-sm font-medium'>
                                Admin Dashboard
                            </h1>
                        </div>

                        <div className='flex items-center gap-4'>
                            <ThemeToggle />
                        </div>
                    </header>
                    <main className='flex-1 p-6'>{children}</main>
                </SidebarInset>
                <Toaster richColors position='top-right' />
            </SidebarProvider>
        </ThemeProvider>
    );
}
