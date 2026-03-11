import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { blogFormSchema } from '@/schemas/blog';
import { BlogStatus } from '@prisma/client';
import { ZodError } from 'zod';

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') as BlogStatus | null;
        const search = searchParams.get('search') || '';
        const type = searchParams.get('type');
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(50, parseInt(searchParams.get('limit') || '10'));
        const skip = (page - 1) * limit;

        const where: Record<string, unknown> = {};
        if (status) where.status = status;
        if (type === 'external') where.isExternal = true;
        if (type === 'internal') where.isExternal = false;
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { excerpt: { contains: search, mode: 'insensitive' } },
                { author: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [blogs, total] = await Promise.all([
            prisma.blog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.blog.count({ where }),
        ]);

        return NextResponse.json({
            blogs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('GET /api/blogs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = blogFormSchema.parse(body);

        let slug = generateSlug(parsed.title);
        const existing = await prisma.blog.findUnique({ where: { slug } });
        if (existing) slug = `${slug}-${Date.now()}`;

        const blog = await prisma.blog.create({
            data: {
                title: parsed.title,
                slug,
                excerpt: parsed.excerpt || null,
                content: parsed.isExternal ? null : (parsed.content ?? null),
                coverImage: parsed.coverImage || null,
                status: parsed.status,
                tags: parsed.tags,
                author: parsed.author,
                isExternal: parsed.isExternal,
                sourceUrl: parsed.isExternal ? parsed.sourceUrl : null,
                publishedAt: parsed.status === 'PUBLISHED' ? new Date() : null,
            },
        });

        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', issues: error.issues },
                { status: 400 },
            );
        }
        console.error('POST /api/blogs:', error);
        return NextResponse.json(
            { error: 'Failed to create blog' },
            { status: 500 },
        );
    }
}
