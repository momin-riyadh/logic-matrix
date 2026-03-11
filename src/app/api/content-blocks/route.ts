import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const pages = await prisma.contentBlockPage.findMany({
            select: {
                id: true,
                heroTitle: true,
                slug: true,
                updatedAt: true,
            },
            orderBy: { updatedAt: 'desc' },
        });

        return NextResponse.json(pages);
    } catch (error) {
        console.error('[CONTENT_BLOCKS_GET]', error);
        return NextResponse.json(
            { error: 'Failed to fetch content pages' },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { heroTitle, slug, heroDescription, blocks } = body;

        const newPage = await prisma.contentBlockPage.create({
            data: {
                heroTitle,
                slug,
                heroDescription: heroDescription || '',
                blocks: {
                    create:
                        blocks?.map((block: any, index: number) => ({
                            title: block.title,
                            description: block.description,
                            imageUrl: block.imageUrl || null,
                            alignment: block.alignment || 'auto',
                            order: index + 1,
                        })) || [],
                },
            },
        });

        return NextResponse.json(newPage, { status: 201 });
    } catch (error) {
        console.error('[CONTENT_BLOCKS_POST]', error);
        return NextResponse.json(
            {
                error: 'Failed to create page. The slug might already be in use.',
            },
            { status: 500 },
        );
    }
}
