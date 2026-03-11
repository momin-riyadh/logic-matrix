'use client';

import { Command } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { Menu } from './menu';
import { NavUser } from './nav-user';
import { Role } from '@prisma/client';

export function AdminSidebar({ session, ...props }: any) {
    const isAdmin = session?.user?.role === Role.ADMIN;

    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size='lg' asChild>
                            <a href='/admin'>
                                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                    <Command className='size-4' />
                                </div>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-semibold'>
                                        Logic Matrix
                                    </span>
                                    <span className='truncate text-xs'>
                                        Admin Dashboard
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <Menu isAdmin={isAdmin} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={session?.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
