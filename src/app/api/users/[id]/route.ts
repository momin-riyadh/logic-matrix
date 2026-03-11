import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, context: RouteContext) {
    try {
        const authResult = await requireAuth();
        if (!authResult.authorized) return authResult.response;

        const { id } = await context.params;
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: { blogs: true },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
    try {
        const authResult = await requireAuth();
        if (!authResult.authorized) return authResult.response;

        const { id } = await context.params;
        const body = await req.json();
        const { name, email } = body;

        const existing = await prisma.user.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            );
        }

        if (email && email !== existing.email) {
            const emailTaken = await prisma.user.findUnique({
                where: { email },
            });
            if (emailTaken) {
                return NextResponse.json(
                    { error: 'Email already in use' },
                    { status: 409 },
                );
            }
        }

        const user = await prisma.user.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(email !== undefined && { email }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
                image: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
    try {
        const authResult = await requireAuth();
        if (!authResult.authorized) return authResult.response;

        const { id } = await context.params;

        const existing = await prisma.user.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            );
        }

        // Prevent self-deletion
        if (id === authResult.user?.id) {
            return NextResponse.json(
                { error: 'You cannot delete your own account' },
                { status: 400 },
            );
        }

        await prisma.user.delete({ where: { id } });

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
