import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

const FILE_SERVICE_URL =
    process.env.NEXT_PUBLIC_FILE_SERVICE_URL ||
    'https://ftp.alhikmahfoundation.com.bd';

const FILE_SERVICE_API_KEY = process.env.FILE_SERVICE_API_KEY;

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> },
) {
    const { path } = await params;
    const filePath = path.join('/');

    if (!FILE_SERVICE_API_KEY) {
        logger.error('[GET /api/images] FILE_SERVICE_API_KEY not configured');
        return NextResponse.json({ error: 'Not configured' }, { status: 500 });
    }

    try {
        const response = await fetch(`${FILE_SERVICE_URL}/${filePath}`, {
            headers: {
                Authorization: `Bearer ${FILE_SERVICE_API_KEY}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            logger.warn('[GET /api/images] Upstream failed', {
                path: filePath,
                status: response.status,
            });
            return NextResponse.json(
                { error: 'Failed to fetch image' },
                { status: response.status },
            );
        }

        const blob = await response.blob();
        const headers = new Headers();
        headers.set(
            'Content-Type',
            response.headers.get('Content-Type') || 'image/jpeg',
        );
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        return new NextResponse(blob, { headers });
    } catch (error) {
        logger.error('[GET /api/images] Error', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
