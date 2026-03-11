import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { blogFormSchema } from '@/schemas/blog';
import { ZodError } from 'zod';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const blog = await prisma.blog.findUnique({ where: { id } });
        if (!blog)
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(blog);
    } catch (error) {
        console.error('GET /api/blogs/[id]:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog' },
            { status: 500 },
        );
    }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const existing = await prisma.blog.findUnique({ where: { id } });
        if (!existing)
            return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const body = await request.json();
        const parsed = blogFormSchema.parse(body);

        const blog = await prisma.blog.update({
            where: { id },
            data: {
                title: parsed.title,
                excerpt: parsed.excerpt || null,
                content: parsed.isExternal ? null : (parsed.content ?? null),
                coverImage: parsed.coverImage || null,
                status: parsed.status,
                tags: parsed.tags,
                author: parsed.author,
                isExternal: parsed.isExternal,
                sourceUrl: parsed.isExternal ? parsed.sourceUrl : null,
                publishedAt:
                    parsed.status === 'PUBLISHED' && !existing.publishedAt
                        ? new Date()
                        : existing.publishedAt,
            },
        });

        return NextResponse.json(blog);
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', issues: error.issues },
                { status: 400 },
            );
        }
        console.error('PATCH /api/blogs/[id]:', error);
        return NextResponse.json(
            { error: 'Failed to update blog' },
            { status: 500 },
        );
    }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        await prisma.blog.delete({ where: { id } });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('DELETE /api/blogs/[id]:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog' },
            { status: 500 },
        );
    }
}
