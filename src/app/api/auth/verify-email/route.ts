import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyEmailToken } from '@/lib/tokens';

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { error: 'Token is required' },
                { status: 400 },
            );
        }

        // Verify the token
        const verificationToken = await verifyEmailToken(token);

        if (!verificationToken) {
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 400 },
            );
        }

        // Update user's email verified status
        await prisma.user.update({
            where: { email: verificationToken.email },
            data: { emailVerified: new Date() },
        });

        // Delete the verification token
        await prisma.emailVerificationToken.delete({
            where: { token },
        });

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully! You can now log in.',
        });
    } catch (error) {
        console.error('Email verification error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 },
        );
    }
}
