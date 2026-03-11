import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import crypto from 'crypto';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
];
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

function getExtension(mimeType: string): string {
    const map: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp',
        'image/gif': 'gif',
    };
    return map[mimeType] || 'jpg';
}

// POST /api/upload — accepts multipart/form-data with field "files" (one or many)
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No files provided' },
                { status: 400 },
            );
        }

        // Ensure upload directory exists
        if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
        }

        const uploaded: { url: string; name: string; size: number }[] = [];
        const errors: string[] = [];

        for (const file of files) {
            // Validate type
            if (!ALLOWED_TYPES.includes(file.type)) {
                errors.push(`${file.name}: unsupported type (${file.type})`);
                continue;
            }

            // Validate size
            if (file.size > MAX_FILE_SIZE) {
                errors.push(`${file.name}: exceeds 5MB limit`);
                continue;
            }

            // Generate unique filename
            const hash = crypto.randomBytes(8).toString('hex');
            const ext = getExtension(file.type);
            const filename = `${Date.now()}-${hash}.${ext}`;
            const filepath = path.join(UPLOAD_DIR, filename);

            // Write to disk
            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(filepath, buffer);

            uploaded.push({
                url: `/uploads/${filename}`,
                name: file.name,
                size: file.size,
            });
        }

        if (uploaded.length === 0 && errors.length > 0) {
            return NextResponse.json(
                { error: 'All uploads failed', errors },
                { status: 400 },
            );
        }

        return NextResponse.json({ uploaded, errors });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

// DELETE /api/upload — removes a file by its public URL path
export async function DELETE(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url || !url.startsWith('/uploads/')) {
            return NextResponse.json(
                { error: 'Invalid file URL' },
                { status: 400 },
            );
        }

        const filename = path.basename(url);
        // Prevent path traversal
        if (filename.includes('..') || filename.includes('/')) {
            return NextResponse.json(
                { error: 'Invalid filename' },
                { status: 400 },
            );
        }

        const { unlink } = await import('fs/promises');
        const filepath = path.join(UPLOAD_DIR, filename);
        if (existsSync(filepath)) {
            await unlink(filepath);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
