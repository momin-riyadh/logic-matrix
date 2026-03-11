import { z } from 'zod';

export const contentBlockSchema = z.object({
    title: z.string().min(2, 'Title is required'),
    description: z.string().min(5, 'Description is too short'),
    imageUrl: z.string().optional().nullable(),
    alignment: z.enum(['auto', 'left', 'right']).default('auto'),
});

export const contentBlockPageSchema = z.object({
    title: z.string().min(2, 'Page title is required'),
    slug: z.string().min(2, 'Slug is required'),
    heroDescription: z.string().min(5, 'Hero description is required'),
    blocks: z
        .array(contentBlockSchema)
        .min(1, 'At least one content block is required'),
});

export type ContentBlockFormValues = z.infer<typeof contentBlockPageSchema>;
