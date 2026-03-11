'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
    Search,
    Plus,
    MoreHorizontal,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Loader2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

interface User {
    id: string;
    name: string | null;
    email: string;
    emailVerified: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    _count?: { blogPosts: number };
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export function UsersClient() {
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // Dialog states
    const [createOpen, setCreateOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);
    const [saving, setSaving] = useState(false);

    // Form states
    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');

    const fetchUsers = useCallback(
        async (page = 1, searchQuery = search) => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: '10',
                });
                if (searchQuery) params.set('search', searchQuery);

                const res = await fetch(`/api/users?${params}`);
                if (!res.ok) throw new Error('Failed to fetch users');

                const data = await res.json();
                setUsers(data.data);
                setPagination(data.pagination);
            } catch {
                toast.error('Failed to load users');
            } finally {
                setLoading(false);
            }
        },
        [search],
    );

    useEffect(() => {
        fetchUsers(1, search);
    }, [fetchUsers, search]);

    // Debounced search
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // Create user
    const handleCreate = async () => {
        if (!formEmail || !formPassword) {
            toast.error('Email and password are required');
            return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formName,
                    email: formEmail,
                    password: formPassword,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to create user');
            toast.success('User created successfully');
            setCreateOpen(false);
            resetForm();
            fetchUsers(pagination.page);
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : 'Failed to create user',
            );
        } finally {
            setSaving(false);
        }
    };

    // Edit user
    const handleEdit = async () => {
        if (!editUser) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/users/${editUser.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formName,
                    email: formEmail,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to update user');
            toast.success('User updated successfully');
            setEditUser(null);
            resetForm();
            fetchUsers(pagination.page);
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : 'Failed to update user',
            );
        } finally {
            setSaving(false);
        }
    };

    // Delete user
    const handleDelete = async () => {
        if (!deleteUser) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/users/${deleteUser.id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to delete user');
            toast.success('User deleted successfully');
            setDeleteUser(null);
            fetchUsers(pagination.page);
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : 'Failed to delete user',
            );
        } finally {
            setSaving(false);
        }
    };

    const resetForm = () => {
        setFormName('');
        setFormEmail('');
        setFormPassword('');
    };

    const openEdit = (user: User) => {
        setFormName(user.name || '');
        setFormEmail(user.email);
        setEditUser(user);
    };

    return (
        <div className='space-y-4'>
            {/* Toolbar */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
                <div className='relative w-full sm:w-72'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input
                        placeholder='Search users...'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className='pl-9'
                    />
                </div>
                <Button onClick={() => { resetForm(); setCreateOpen(true); }}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add User
                </Button>
            </div>

            {/* Table */}
            <div className='rounded-lg border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[280px]'>User</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Posts</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className='w-[50px]' />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell colSpan={5}>
                                        <div className='flex items-center gap-3 animate-pulse'>
                                            <div className='h-9 w-9 rounded-full bg-muted' />
                                            <div className='space-y-1.5'>
                                                <div className='h-3.5 w-28 rounded bg-muted' />
                                                <div className='h-3 w-40 rounded bg-muted' />
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className='h-32 text-center text-muted-foreground'
                                >
                                    {search
                                        ? 'No users match your search.'
                                        : 'No users found.'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className='flex items-center gap-3'>
                                            <Avatar className='h-9 w-9'>
                                                <AvatarFallback className='text-xs font-medium'>
                                                    {(
                                                        user.name || user.email
                                                    )
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
                                    </TableCell>
                                    <TableCell>
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
                                    </TableCell>
                                    <TableCell className='text-sm text-muted-foreground'>
                                        {user._count?.blogPosts ?? 0}
                                    </TableCell>
                                    <TableCell className='text-sm text-muted-foreground whitespace-nowrap'>
                                        {new Date(
                                            user.createdAt,
                                        ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'
                                                    className='h-8 w-8'
                                                >
                                                    <MoreHorizontal className='h-4 w-4' />
                                                    <span className='sr-only'>
                                                        Actions
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end'>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        openEdit(user)
                                                    }
                                                >
                                                    <Pencil className='mr-2 h-4 w-4' />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className='text-destructive focus:text-destructive'
                                                    onClick={() =>
                                                        setDeleteUser(user)
                                                    }
                                                >
                                                    <Trash2 className='mr-2 h-4 w-4' />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-muted-foreground'>
                        Showing{' '}
                        {(pagination.page - 1) * pagination.limit + 1} –{' '}
                        {Math.min(
                            pagination.page * pagination.limit,
                            pagination.total,
                        )}{' '}
                        of {pagination.total} users
                    </p>
                    <div className='flex items-center gap-2'>
                        <Button
                            variant='outline'
                            size='icon'
                            className='h-8 w-8'
                            disabled={pagination.page <= 1}
                            onClick={() => fetchUsers(pagination.page - 1)}
                        >
                            <ChevronLeft className='h-4 w-4' />
                        </Button>
                        <span className='text-sm text-muted-foreground min-w-[80px] text-center'>
                            Page {pagination.page} of {pagination.totalPages}
                        </span>
                        <Button
                            variant='outline'
                            size='icon'
                            className='h-8 w-8'
                            disabled={
                                pagination.page >= pagination.totalPages
                            }
                            onClick={() => fetchUsers(pagination.page + 1)}
                        >
                            <ChevronRight className='h-4 w-4' />
                        </Button>
                    </div>
                </div>
            )}

            {/* Create User Dialog */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create User</DialogTitle>
                        <DialogDescription>
                            Add a new user account. They will be marked as
                            verified automatically.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='create-name'>Name</Label>
                            <Input
                                id='create-name'
                                placeholder='John Doe'
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='create-email'>
                                Email <span className='text-destructive'>*</span>
                            </Label>
                            <Input
                                id='create-email'
                                type='email'
                                placeholder='john@example.com'
                                value={formEmail}
                                onChange={(e) => setFormEmail(e.target.value)}
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='create-password'>
                                Password{' '}
                                <span className='text-destructive'>*</span>
                            </Label>
                            <Input
                                id='create-password'
                                type='password'
                                placeholder='••••••••'
                                value={formPassword}
                                onChange={(e) => setFormPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant='outline'
                            onClick={() => setCreateOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleCreate} disabled={saving}>
                            {saving && (
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            )}
                            Create User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog
                open={!!editUser}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditUser(null);
                        resetForm();
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Update user information.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='edit-name'>Name</Label>
                            <Input
                                id='edit-name'
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='edit-email'>Email</Label>
                            <Input
                                id='edit-email'
                                type='email'
                                value={formEmail}
                                onChange={(e) => setFormEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant='outline'
                            onClick={() => {
                                setEditUser(null);
                                resetForm();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleEdit} disabled={saving}>
                            {saving && (
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            )}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog
                open={!!deleteUser}
                onOpenChange={(open) => {
                    if (!open) setDeleteUser(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>
                                {deleteUser?.name || deleteUser?.email}
                            </strong>
                            ? This action cannot be undone and will remove all
                            associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                            disabled={saving}
                        >
                            {saving && (
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            )}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
