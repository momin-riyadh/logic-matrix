import { NextRequest, NextResponse } from 'next/server';
import { forgotPasswordSchema } from '@/lib/validations/auth';
import { prisma } from '@/lib/prisma';
import { generatePasswordResetToken } from '@/lib/tokens';
import { sendPasswordResetEmail } from '@/lib/email';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate input
        const validatedFields = forgotPasswordSchema.parse(body);
        const { email } = validatedFields;

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Always return success to prevent email enumeration
        if (!user) {
            return NextResponse.json({
                success: true,
                message:
                    'If an account exists with this email, you will receive a password reset link.',
            });
        }

        // Generate password reset token
        const resetToken = await generatePasswordResetToken(email);

        // Send password reset email
        await sendPasswordResetEmail(email, resetToken);

        return NextResponse.json({
            success: true,
            message:
                'If an account exists with this email, you will receive a password reset link.',
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 },
            );
        }

        console.error('Forgot password error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 },
        );
    }
}
