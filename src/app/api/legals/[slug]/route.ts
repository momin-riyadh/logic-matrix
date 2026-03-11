import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteParams = {
    params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: RouteParams) {
    const { slug } = await params;

    try {
        const document = await prisma.legalDocument.findUnique({
            where: { slug },
            include: {
                sections: {
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
        });

        if (!document) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 },
            );
        }

        return NextResponse.json(document);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    const { slug } = await params;

    const body = await request.json();
    const { title, introText, effectiveDate, sections } = body;

    try {
        const updatedDoc = await prisma.$transaction(async tx => {
            const doc = await tx.legalDocument.update({
                where: { slug },
                data: {
                    title,
                    introText,
                    effectiveDate,
                    lastUpdated: new Date().toISOString(),
                },
            });

            // Wipe and rewrite sections
            await tx.legalSection.deleteMany({
                where: { pageId: doc.id },
            });

            if (sections && sections.length > 0) {
                await tx.legalSection.createMany({
                    data: sections.map((section: any, index: number) => ({
                        pageId: doc.id,
                        heading: section.heading,
                        content: section.content,
                        order: index + 1,
                    })),
                });
            }

            return await tx.legalDocument.findUnique({
                where: { id: doc.id },
                include: { sections: { orderBy: { order: 'asc' } } },
            });
        });

        return NextResponse.json(updatedDoc);
    } catch (error) {
        console.error('PUT Error:', error);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    const { slug } = await params;

    try {
        await prisma.legalDocument.delete({
            where: { slug },
        });

        return NextResponse.json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('DELETE Error:', error);
        return NextResponse.json(
            { error: 'Failed to delete' },
            { status: 500 },
        );
    }
}
