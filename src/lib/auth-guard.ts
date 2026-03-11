import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function requireAuth() {
    const session = await auth();

    if (!session?.user) {
        return {
            authorized: false,
            response: NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            ),
        };
    }

    return {
        authorized: true,
        user: session.user,
    };
}
