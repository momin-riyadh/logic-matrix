import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');

        const where =
            status && status !== 'all' ? { status: status as any } : {};

        const portfolios = await prisma.portfolio.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
            select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                status: true,
                featured: true,
                coverImage: true,
                progress: true,
                createdAt: true,
            },
        });

        return NextResponse.json({ portfolios });
    } catch (error) {
        console.error('Error fetching portfolios:', error);
        return NextResponse.json(
            { error: 'Failed to fetch portfolios' },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.slug || !body.category || !body.description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 },
            );
        }

        // Check if slug already exists
        const existing = await prisma.portfolio.findUnique({
            where: { slug: body.slug },
        });

        if (existing) {
            return NextResponse.json(
                { error: 'Slug already exists' },
                { status: 400 },
            );
        }

        const portfolio = await prisma.portfolio.create({
            data: {
                title: body.title,
                slug: body.slug,
                category: body.category,
                description: body.description,
                client: body.client || null,
                progress: body.progress || 0,
                coverImage: body.coverImage,
                images: body.images || [],
                tags: body.tags || [],
                status: body.status || 'DRAFT',
                featured: body.featured || false,
                liveUrl: body.liveUrl || null,
                githubUrl: body.githubUrl || null,
                completedAt: body.completedAt
                    ? new Date(body.completedAt)
                    : null,
                features: {
                    create: body.features || [],
                },
                stats: {
                    create: body.stats || [],
                },
            },
            include: {
                features: true,
                stats: true,
            },
        });

        return NextResponse.json({ portfolio }, { status: 201 });
    } catch (error) {
        console.error('Error creating portfolio:', error);
        return NextResponse.json(
            { error: 'Failed to create portfolio' },
            { status: 500 },
        );
    }
}
