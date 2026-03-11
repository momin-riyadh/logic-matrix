import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(req: Request, { params }: RouteParams) {
    const { slug } = await params;
    try {
        const page = await prisma.contentBlockPage.findUnique({
            where: { slug },
            include: { blocks: { orderBy: { order: 'asc' } } },
        });
        if (!page)
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(page);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: RouteParams) {
    const { slug } = await params;
    const body = await req.json();
    const { title, heroDescription, blocks } = body;

    try {
        const result = await prisma.$transaction(async tx => {
            const page = await tx.contentBlockPage.update({
                where: { slug },
                data: { heroTitle: title, heroDescription },
            });

            await tx.contentBlock.deleteMany({ where: { pageId: page.id } });

            await tx.contentBlock.createMany({
                data: blocks.map((block: any, index: number) => ({
                    ...block,
                    pageId: page.id,
                    order: index + 1,
                })),
            });

            return page;
        });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
