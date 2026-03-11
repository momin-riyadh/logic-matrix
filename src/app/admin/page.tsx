import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { Users, FileText, Mail, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

async function getStats() {
    const [totalUsers, verifiedUsers, totalPosts, totalMessages] =
        await Promise.all([
            prisma.user.count(),
            prisma.user.count({
                where: { emailVerified: { not: null } },
            }),
            prisma.blog.count(),
            prisma.contactMessage.count(),
        ]);

    return { totalUsers, verifiedUsers, totalPosts, totalMessages };
}

async function getRecentUsers() {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
    });
}

export default async function AdminDashboardPage() {
    const session = await auth();
    const [stats, recentUsers] = await Promise.all([
        getStats(),
        getRecentUsers(),
    ]);

    const statCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: Users,
            description: 'Registered accounts',
            className: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-950/40',
        },
        {
            title: 'Verified Users',
            value: stats.verifiedUsers,
            icon: ShieldCheck,
            description: `${stats.totalUsers > 0 ? Math.round((stats.verifiedUsers / stats.totalUsers) * 100) : 0}% verification rate`,
            className: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        },
        {
            title: 'Blog Posts',
            value: stats.totalPosts,
            icon: FileText,
            description: 'Published & drafts',
            className: 'text-violet-600 dark:text-violet-400',
            bg: 'bg-violet-50 dark:bg-violet-950/40',
        },
        {
            title: 'Messages',
            value: stats.totalMessages,
            icon: Mail,
            description: 'Contact submissions',
            className: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-50 dark:bg-amber-950/40',
        },
    ];

    return (
        <div className='max-w-7xl mx-auto space-y-8'>
            <div>
                <h1 className='text-3xl font-bold tracking-tight'>
                    Dashboard
                </h1>
                <p className='text-muted-foreground mt-1'>
                    Welcome back, {session?.user?.name || session?.user?.email}
                </p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {statCards.map((card) => (
                    <Card key={card.title} className='relative overflow-hidden'>
                        <CardHeader className='flex flex-row items-center justify-between pb-2'>
                            <CardTitle className='text-sm font-medium text-muted-foreground'>
                                {card.title}
                            </CardTitle>
                            <div
                                className={`rounded-lg p-2 ${card.bg}`}
                            >
                                <card.icon
                                    className={`h-4 w-4 ${card.className}`}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className='text-3xl font-bold'>
                                {card.value}
                            </div>
                            <p className='text-xs text-muted-foreground mt-1'>
                                {card.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className='text-lg'>Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        {recentUsers.map((user) => (
                            <div
                                key={user.id}
                                className='flex items-center justify-between'
                            >
                                <div className='flex items-center gap-3'>
                                    <Avatar className='h-9 w-9'>
                                        <AvatarFallback className='text-xs font-medium'>
                                            {(user.name || user.email)
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='min-w-0'>
                                        <p className='text-sm font-medium leading-none truncate'>
                                            {user.name || 'Unnamed'}
                                        </p>
                                        <p className='text-xs text-muted-foreground truncate mt-0.5'>
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Badge
                                        variant={
                                            user.emailVerified
                                                ? 'default'
                                                : 'secondary'
                                        }
                                        className='text-[11px]'
                                    >
                                        {user.emailVerified
                                            ? 'Verified'
                                            : 'Unverified'}
                                    </Badge>
                                    <span className='text-xs text-muted-foreground whitespace-nowrap'>
                                        {new Date(
                                            user.createdAt,
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {recentUsers.length === 0 && (
                            <p className='text-sm text-muted-foreground text-center py-4'>
                                No users found.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
