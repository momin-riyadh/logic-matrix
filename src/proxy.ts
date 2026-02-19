import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Public routes that don't require authentication
    const publicRoutes = [
        '/',
        '/auth/login',
        '/auth/register',
        '/auth/forgot-password',
        '/auth/reset-password',
        '/auth/verify-email',
    ];

    const publicApiRoutes = ['/api/auth'];

    // Check if current path is public
    const isPublicRoute = publicRoutes.some(route =>
        pathname.startsWith(route),
    );
    const isPublicApiRoute = publicApiRoutes.some(route =>
        pathname.startsWith(route),
    );

    // Allow public routes and API routes
    if (isPublicRoute || isPublicApiRoute) {
        return NextResponse.next();
    }

    // Protected routes
    const isProtectedRoute = pathname.startsWith('/dashboard');

    // For protected routes, let the page component handle auth check
    // This avoids async issues in middleware
    if (isProtectedRoute) {
        return NextResponse.next();
    }

    // Root is public (landing page)
    if (pathname === '/') {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
