import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/validations/auth';
import { prisma } from '@/lib/prisma';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/email';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate input
        const validatedFields = registerSchema.parse(body);
        const { name, email, password } = validatedFields;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 },
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Generate verification token
        const verificationToken = await generateVerificationToken(email);

        // Send verification email
        await sendVerificationEmail(email, verificationToken);

        return NextResponse.json({
            success: true,
            message:
                'Registration successful! Please check your email to verify your account.',
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 },
            );
        }

        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 },
        );
    }
}
