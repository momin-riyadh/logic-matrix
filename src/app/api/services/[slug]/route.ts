import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';
import { serviceSchema } from '@/lib/validations/schemas';
import { ZodError } from 'zod';

type Params = { params: Promise<{ slug: string }> };

/**
 * @swagger
 * /api/services/{slug}:
 *   get:
 *     tags: [Services]
 *     summary: Get service by slug
 *     description: Returns service details with related projects.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Service object with projects
 *       404:
 *         description: Not found
 *   put:
 *     tags: [Services]
 *     summary: Update service
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
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
 *       200:
 *         description: Updated service
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags: [Services]
 *     summary: Delete service
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       401:
 *         description: Unauthorized
 */
export async function GET(_req: NextRequest, { params }: Params) {
    try {
        const { slug } = await params;
        const service = await prisma.service.findUnique({
            where: { slug },
            include: { projects: true },
        });

        if (!service) {
            return NextResponse.json(
                { error: 'Service not found' },
                { status: 404 },
            );
        }

        return NextResponse.json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}

// PUT /api/services/[slug] — Admin: Update service
export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const authResult = await requireAuth();
        if (!authResult.authorized) return authResult.response;

        const { slug } = await params;
        const body = await req.json();
        const data = serviceSchema.parse(body);

        const service = await prisma.service.update({
            where: { slug },
            data,
        });

        return NextResponse.json(service);
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 },
            );
        }
        console.error('Error updating service:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}

// DELETE /api/services/[slug] — Admin: Delete service
export async function DELETE(_req: NextRequest, { params }: Params) {
    try {
        const authResult = await requireAuth();
        if (!authResult.authorized) return authResult.response;

        const { slug } = await params;
        await prisma.service.delete({ where: { slug } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
