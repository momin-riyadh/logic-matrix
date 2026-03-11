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
    heroTitle: z.string().min(2, 'Hero Title is too short'),
    slug: z.string().min(2, 'Slug is required'),
});

type CreateFormValues = z.infer<typeof createSchema>;

export function CreateContentPageDialog({
    onSuccess,
}: {
    onSuccess: () => void;
}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, setValue, reset } =
        useForm<CreateFormValues>({
            resolver: zodResolver(createSchema),
            defaultValues: { heroTitle: '', slug: '' },
        });

    const onSubmit = async (data: CreateFormValues) => {
        setIsSubmitting(true);
        try {
            await api.post('/content-blocks', {
                ...data,
                heroDescription: '',
                blocks: [],
            });

            toast.success('Page created successfully!');
            setOpen(false);
            reset();
            onSuccess();
            router.push(`/admin/content-blocks/${data.slug}`);
        } catch (error) {
            toast.error('Failed to create page. Slug might be taken.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className='mr-2 h-4 w-4' /> Create Content Page
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Content Page</DialogTitle>
                    <DialogDescription>
                        Setup the hero title and URL slug.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup className='py-4 space-y-4'>
                        <Controller
                            name='heroTitle'
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Hero Title</FieldLabel>
                                    <Input
                                        {...field}
                                        onChange={e => {
                                            field.onChange(e);
                                            const s = e.target.value
                                                .toLowerCase()
                                                .replace(/ /g, '-')
                                                .replace(/[^\w-]+/g, '');
                                            setValue('slug', s);
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
                                    <FieldLabel>Slug</FieldLabel>
                                    <Input {...field} />
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
                        <Button type='submit' disabled={isSubmitting}>
                            {isSubmitting && (
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            )}
                            Create & Continue
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
