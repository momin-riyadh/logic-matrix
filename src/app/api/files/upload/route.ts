import { NextRequest, NextResponse } from 'next/server';
import { upload } from '@/lib/file-service';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');
        const directory = formData.get('directory');

        if (!(file instanceof File)) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 },
            );
        }

        const result = await upload(
            file,
            typeof directory === 'string' ? directory : undefined,
        );

        if (!result) {
            return NextResponse.json(
                { success: false, error: 'Upload failed' },
                { status: 500 },
            );
        }

        logger.info('[POST /api/files/upload] Uploaded', {
            fileId: result.fileId,
        });
        return NextResponse.json(
            { success: true, data: result },
            { status: 201 },
        );
    } catch (error) {
        logger.error('[POST /api/files/upload] Error', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 },
        );
    }
}
