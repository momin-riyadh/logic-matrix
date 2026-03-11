import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';
import { serviceSchema } from '@/lib/validations/schemas';
import { ZodError } from 'zod';

/**
 * @swagger
 * /api/services:
 *   get:
 *     tags: [Services]
 *     summary: List all services
 *     description: Returns all active services sorted by sortOrder.
 *     responses:
 *       200:
 *         description: Array of services
 *   post:
 *     tags: [Services]
 *     summary: Create service
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, slug, shortDescription, description]
 *             properties:
 *               title: { type: string }
 *               slug: { type: string }
 *               shortDescription: { type: string }
 *               description: { type: string }
 *               iconUrl: { type: string }
 *               coverImageUrl: { type: string }
 *               sortOrder: { type: integer }
 *               isActive: { type: boolean }
 *     responses:
 *       201:
 *         description: Created service
 *       401:
 *         description: Unauthorized
 */
export async function GET() {
    try {
        const services = await prisma.service.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });

        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}

// POST /api/services — Admin: Create service
export async function POST(req: NextRequest) {
    try {
        const authResult = await requireAuth();
        if (!authResult.authorized) return authResult.response;

        const body = await req.json();
        const data = serviceSchema.parse(body);

        const service = await prisma.service.create({ data });

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 },
            );
        }
        console.error('Error creating service:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
