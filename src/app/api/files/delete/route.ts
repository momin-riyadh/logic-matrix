import { NextRequest, NextResponse } from 'next/server';
import { deleteFile } from '@/lib/file-service';
import { logger } from '@/lib/logger';

// Regular DELETE from client code
export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const fileId: string | undefined = body?.fileId;

        if (!fileId) {
            return NextResponse.json(
                { success: false, error: 'fileId is required' },
                { status: 400 },
            );
        }

        const ok = await deleteFile(fileId);

        logger.info('[DELETE /api/files/delete]', { fileId, ok });
        return NextResponse.json({ success: ok }, { status: ok ? 200 : 500 });
    } catch (error) {
        logger.error('[DELETE /api/files/delete] Error', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 },
        );
    }
}

// navigator.sendBeacon on page unload — can only POST, no custom headers
export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const fileId: string | undefined = body?.fileId;

        if (!fileId) {
            return new NextResponse(null, { status: 400 });
        }

        // Fire-and-forget — browser doesn't read the response
        deleteFile(fileId).catch(() => {});

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        logger.error('[POST /api/files/delete] Beacon error', error);
        return new NextResponse(null, { status: 204 });
    }
}
