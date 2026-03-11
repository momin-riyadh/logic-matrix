import { z } from 'zod';

export const legalPageSchema = z.object({
    title: z
        .string()
        .min(2, { message: 'Title must be at least 2 characters.' }),
    slug: z.string().min(2, { message: 'Slug is required.' }),
    introText: z.string().optional(),
    effectiveDate: z
        .string()
        .min(1, { message: 'Effective date is required.' }),

    sections: z.array(
        z.object({
            heading: z.string().min(3, { message: 'Heading is too short.' }),
            content: z
                .string()
                .min(10, { message: 'Content must be descriptive.' }),
        }),
    ),
});

export type LegalPageFormValues = z.infer<typeof legalPageSchema>;
