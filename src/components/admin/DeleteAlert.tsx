'use client';

import { useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteAlertProps {
    trigger?: React.ReactNode;
    title?: string;
    description?: React.ReactNode;
    onDelete: () => Promise<void> | void;
}

export function DeleteAlert({
    trigger,
    title = 'Are you absolutely sure?',
    description = 'This action cannot be undone. This will permanently delete this item.',
    onDelete,
}: DeleteAlertProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async (e: React.MouseEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            await onDelete();
            setOpen(false);
        } catch (error) {
            console.error('Delete failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {trigger || (
                    <Button
                        variant='ghost'
                        size='icon'
                        className='text-destructive hover:bg-destructive/10'
                    >
                        <Trash2 className='h-4 w-4' />
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-destructive'>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                        Cancel
                    </AlertDialogCancel>

                    <Button
                        variant='destructive'
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading && (
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        )}
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
