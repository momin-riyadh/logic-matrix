import { z } from 'zod';

export const BlogStatus = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

const imageField = z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
        val => {
            if (!val || val === '') return true;
            // allow base64 data URIs
            if (val.startsWith('data:image/')) return true;
            // allow regular URLs
            try {
                new URL(val);
                return true;
            } catch {
                return false;
            }
        },
        { message: 'Must be a valid URL or uploaded image' },
    );

const baseSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(200, 'Title must be under 200 characters'),
    excerpt: z
        .string()
        .max(500, 'Excerpt must be under 500 characters')
        .optional()
        .or(z.literal('')),
    coverImage: imageField,
    status: BlogStatus,
    tags: z.array(z.string().min(1).max(30)).max(10, 'Maximum 10 tags allowed'),
    author: z
        .string()
        .min(2, 'Author name must be at least 2 characters')
        .max(100, 'Author name must be under 100 characters'),
    isExternal: z.boolean(),
});

const internalBlogSchema = baseSchema.extend({
    isExternal: z.literal(false),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    sourceUrl: z.string().optional().or(z.literal('')),
});

const externalBlogSchema = baseSchema.extend({
    isExternal: z.literal(true),
    sourceUrl: z
        .string()
        .url('Must be a valid URL')
        .min(1, 'Source URL is required for external blogs'),
    content: z.string().optional().or(z.literal('')),
});

export const blogFormSchema = z.discriminatedUnion('isExternal', [
    internalBlogSchema,
    externalBlogSchema,
]);

export type BlogFormValues = z.infer<typeof blogFormSchema>;

export const ogMetaSchema = z.object({
    title: z.string().optional(),
    excerpt: z.string().optional(),
    coverImage: z.string().optional(),
    author: z.string().optional(),
    siteName: z.string().optional(),
});

export type OgMeta = z.infer<typeof ogMetaSchema>;
