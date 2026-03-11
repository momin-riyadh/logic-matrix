import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { encode } from 'next-auth/jwt';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Sign in with email and password
 *     description: Authenticates a user and returns a session token. Designed for API clients like Postman.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, session cookie is set
 *       401:
 *         description: Invalid credentials or email not verified
 */
export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 },
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 },
            );
        }

        if (!user.emailVerified) {
            return NextResponse.json(
                { error: 'Please verify your email before logging in' },
                { status: 401 },
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 },
            );
        }

        // Build the JWT payload matching NextAuth's jwt callback
        const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET!;
        const isSecure =
            process.env.NEXTAUTH_URL?.startsWith('https://') ?? false;
        const cookieName = isSecure
            ? '__Secure-authjs.session-token'
            : 'authjs.session-token';

        const token = await encode({
            token: {
                name: user.name,
                email: user.email,
                sub: user.id,
                id: user.id,
                emailVerified: user.emailVerified,
            },
            secret,
            salt: cookieName,
            maxAge: 30 * 24 * 60 * 60, // 30 days
        });

        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

        // Set the session cookie so auth() picks it up
        response.cookies.set(cookieName, token, {
            httpOnly: true,
            secure: isSecure,
            sameSite: 'lax',
            path: '/',
            maxAge: 30 * 24 * 60 * 60,
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 },
        );
    }
}
