'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getMenuList } from '@/menu-list';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

interface MenuProps {
    isAdmin?: boolean;
}

export function Menu({ isAdmin }: MenuProps) {
    const pathname = usePathname();
    const menuList = getMenuList(pathname, isAdmin);

    return (
        <>
            {menuList.map((group, index) => (
                <SidebarGroup key={index}>
                    <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.menus.map((item, i) => (
                            <SidebarMenuItem key={i}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={item.active}
                                    tooltip={item.label}
                                >
                                    <Link href={item.href}>
                                        <item.icon className='size-4' />
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
