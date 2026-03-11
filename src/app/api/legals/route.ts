import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const docs = await prisma.legalDocument.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                effectiveDate: true,
                lastUpdated: true,
            },
            orderBy: { lastUpdated: 'desc' },
        });

        return NextResponse.json(docs);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch docs' },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { slug, title, introText, effectiveDate, sections } = body;

        const newDoc = await prisma.legalDocument.create({
            data: {
                slug,
                title,
                introText,
                effectiveDate,
                sections: {
                    create: sections.map((section: any, index: number) => ({
                        heading: section.heading,
                        content: section.content,
                        order: index + 1,
                    })),
                },
            },
            include: {
                sections: true,
            },
        });

        return NextResponse.json(newDoc, { status: 201 });
    } catch (error) {
        console.error('Error creating legal doc:', error);
        return NextResponse.json(
            { error: 'Failed to create document', details: error },
            { status: 500 },
        );
    }
}
