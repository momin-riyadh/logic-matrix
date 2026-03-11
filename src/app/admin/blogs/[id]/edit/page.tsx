import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Blog } from '@/types/blog';
import { BlogForm } from '../../components/BlogForm';

export const metadata = { title: 'Edit Blog Post | Admin' };

interface EditBlogPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({ where: { id } });

    if (!blog) notFound();

    const serialized: Blog = {
        ...blog,
        content: blog.content ?? null,
        sourceUrl: blog.sourceUrl ?? null,
        excerpt: blog.excerpt ?? null,
        coverImage: blog.coverImage ?? null,
        publishedAt: blog.publishedAt?.toISOString() ?? null,
        createdAt: blog.createdAt.toISOString(),
        updatedAt: blog.updatedAt.toISOString(),
    };

    return <BlogForm mode='edit' blog={serialized} />;
}
