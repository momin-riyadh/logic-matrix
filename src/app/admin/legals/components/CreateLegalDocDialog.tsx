'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from '@/components/ui/field';

const createSchema = z.object({
    title: z.string().min(2, 'Title is too short'),
    slug: z.string().min(2, 'Slug is required'),
});

type CreateFormValues = z.infer<typeof createSchema>;

interface CreateLegalDocDialogProps {
    onSuccess: () => void;
}

export function CreateLegalDocDialog({ onSuccess }: CreateLegalDocDialogProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, setValue, reset } =
        useForm<CreateFormValues>({
            resolver: zodResolver(createSchema),
            defaultValues: { title: '', slug: '' },
        });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    };

    const onSubmit = async (data: CreateFormValues) => {
        setIsSubmitting(true);
        try {
            await api.post('/legals', {
                ...data,
                introText: '',
                effectiveDate: new Date().toISOString(),
                sections: [],
            });

            toast.success('Document created successfully!');
            setOpen(false);
            reset();
            onSuccess();
            router.push(`/admin/legals/${data.slug}`);
        } catch (error) {
            toast.error('Failed to create document. Slug might be taken.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className='mr-2 h-4 w-4' /> Create New
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Legal Document</DialogTitle>
                    <DialogDescription>
                        Add a new policy page to your website.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup className='py-4 space-y-4'>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Document Title</FieldLabel>
                                    <Input
                                        {...field}
                                        placeholder='e.g. Cookie Policy'
                                        onChange={e => {
                                            field.onChange(e);
                                            setValue(
                                                'slug',
                                                generateSlug(e.target.value),
                                            );
                                        }}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name='slug'
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>URL Slug</FieldLabel>
                                    <div className='flex items-center'>
                                        <span className='bg-muted px-3 py-2 border border-r-0 rounded-l-md text-sm text-muted-foreground'>
                                            /legals/
                                        </span>
                                        <Input
                                            {...field}
                                            placeholder='cookie-policy'
                                            className='rounded-l-none'
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <DialogFooter>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' disabled={isSubmitting}>
                            {isSubmitting && (
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            )}
                            Create & Edit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
