import { Users, Settings, Bookmark, LayoutGrid, BookAIcon } from 'lucide-react';

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: any;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string, isAdmin?: boolean): Group[] {
    const routes = [
        {
            groupLabel: '',
            menus: [
                {
                    href: '/admin',
                    label: 'Dashboard',
                    active: pathname === '/admin',
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: 'Manage',
            menus: [
                {
                    href: '/admin/legals',
                    label: 'Legal Docs',
                    active: pathname.includes('/admin/legals'),
                    icon: BookAIcon,
                    submenus: [],
                },
                {
                    href: '/admin/content-blocks',
                    label: 'Content Blocks',
                    active: pathname.includes('/admin/content-blocks'),
                    icon: Bookmark,
                    submenus: [],
                },
                {
                    href: '/admin/blogs',
                    label: 'Blogs',
                    active: pathname.includes('/admin/blogs'),
                    icon: Bookmark,
                    submenus: [],
                },
                {
                    href: '/admin/portfolio',
                    label: 'Portfolio',
                    active: pathname.includes('/admin/portfolio'),
                    icon: Bookmark,
                    submenus: [],
                },
            ],
        },
    ];

    if (isAdmin) {
        routes.push({
            groupLabel: 'Settings',
            menus: [
                {
                    href: '/admin/users',
                    label: 'Users',
                    active: pathname.includes('/users'),
                    icon: Users,
                    submenus: [],
                },
                {
                    href: '/admin/settings',
                    label: 'Settings',
                    active: pathname.includes('/admin/settings'),
                    icon: Settings,
                    submenus: [],
                },
            ],
        });
    }

    return routes;
}
