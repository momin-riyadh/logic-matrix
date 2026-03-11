import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        const portfolio = await prisma.portfolio.findUnique({
            where: { id },
            include: {
                features: true,
                stats: true,
            },
        });

        if (!portfolio) {
            return NextResponse.json(
                { error: 'Portfolio not found' },
                { status: 404 },
            );
        }

        return NextResponse.json({ portfolio });
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json(
            { error: 'Failed to fetch portfolio' },
            { status: 500 },
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Check if portfolio exists
        const existing = await prisma.portfolio.findUnique({
            where: { id },
        });

        if (!existing) {
            return NextResponse.json(
                { error: 'Portfolio not found' },
                { status: 404 },
            );
        }

        // If slug is being changed, check if new slug already exists
        if (body.slug && body.slug !== existing.slug) {
            const slugExists = await prisma.portfolio.findUnique({
                where: { slug: body.slug },
            });

            if (slugExists) {
                return NextResponse.json(
                    { error: 'Slug already exists' },
                    { status: 400 },
                );
            }
        }

        // Delete existing features and stats
        await prisma.portfolioFeature.deleteMany({
            where: { portfolioId: id },
        });

        await prisma.portfolioStat.deleteMany({
            where: { portfolioId: id },
        });

        // Update portfolio with new data
        const portfolio = await prisma.portfolio.update({
            where: { id },
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
                status: body.status,
                featured: body.featured,
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

        return NextResponse.json({ portfolio });
    } catch (error) {
        console.error('Error updating portfolio:', error);
        return NextResponse.json(
            { error: 'Failed to update portfolio' },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        // Check if portfolio exists
        const existing = await prisma.portfolio.findUnique({
            where: { id },
        });

        if (!existing) {
            return NextResponse.json(
                { error: 'Portfolio not found' },
                { status: 404 },
            );
        }

        // Delete portfolio (cascade will delete features and stats)
        await prisma.portfolio.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        return NextResponse.json(
            { error: 'Failed to delete portfolio' },
            { status: 500 },
        );
    }
}
