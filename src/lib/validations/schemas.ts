import * as z from 'zod';

export const companyInfoSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    mission: z.string().optional(),
    vision: z.string().optional(),
    foundedYear: z.number().int().optional(),
    logoUrl: z.string().url().optional(),
    coverImageUrl: z.string().url().optional(),
});

export const teamMemberSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    designation: z.string().min(1, 'Designation is required'),
    bio: z.string().optional(),
    imageUrl: z.string().optional(),
    email: z.string().email().optional(),
    linkedIn: z.string().url().optional(),
    github: z.string().url().optional(),
    sortOrder: z.number().int().optional(),
    isActive: z.boolean().optional(),
});

export const serviceSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    shortDescription: z.string().min(1, 'Short description is required'),
    description: z.string().min(1, 'Description is required'),
    iconUrl: z.string().optional(),
    coverImageUrl: z.string().optional(),
    sortOrder: z.number().int().optional(),
    isActive: z.boolean().optional(),
});

export const projectSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    clientName: z.string().optional(),
    shortDescription: z.string().min(1, 'Short description is required'),
    description: z.string().min(1, 'Description is required'),
    coverImageUrl: z.string().optional(),
    liveUrl: z.string().url().optional(),
    status: z.enum(['ONGOING', 'COMPLETED']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    serviceId: z.string().optional(),
    technologyIds: z.array(z.string()).optional(),
    images: z
        .array(
            z.object({
                imageUrl: z.string().min(1),
                altText: z.string().optional(),
                sortOrder: z.number().int().optional(),
            }),
        )
        .optional(),
    isFeatured: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
});

export const technologySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    iconUrl: z.string().optional(),
});

export const blogCategorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
});

export const blogTagSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
});

export const blogPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().optional(),
    content: z.string().min(1, 'Content is required'),
    coverImageUrl: z.string().optional(),
    status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
    publishedAt: z.string().datetime().optional(),
    categoryId: z.string().optional(),
    tagIds: z.array(z.string()).optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});

export const jobPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    department: z.string().optional(),
    location: z.string().optional(),
    jobType: z.enum([
        'FULL_TIME',
        'PART_TIME',
        'CONTRACT',
        'INTERNSHIP',
        'REMOTE',
    ]),
    experience: z.string().optional(),
    salaryRange: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
    requirements: z.string().min(1, 'Requirements is required'),
    benefits: z.string().optional(),
    isActive: z.boolean().optional(),
    deadline: z.string().datetime().optional(),
});

export const jobApplicationSchema = z.object({
    applicantName: z.string().min(1, 'Name is required'),
    applicantEmail: z.string().email('Valid email is required'),
    phone: z.string().optional(),
    coverLetter: z.string().optional(),
    resumeUrl: z.string().min(1, 'Resume is required'),
    portfolioUrl: z.string().url().optional(),
});

export const contactMessageSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(1, 'Message is required'),
});

export const socialLinkSchema = z.object({
    platform: z.string().min(1, 'Platform is required'),
    url: z.string().url('Valid URL is required'),
    iconUrl: z.string().optional(),
    sortOrder: z.number().int().optional(),
});

export const testimonialSchema = z.object({
    clientName: z.string().min(1, 'Client name is required'),
    clientDesignation: z.string().optional(),
    clientCompany: z.string().optional(),
    clientImageUrl: z.string().optional(),
    content: z.string().min(1, 'Testimonial content is required'),
    rating: z.number().int().min(1).max(5).optional(),
    isActive: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
});
