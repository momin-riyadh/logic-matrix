// lib/file-service.ts
// Server-only. Import in Server Components, Server Actions, or Route Handlers.
// From Client Components, call /api/files/upload (POST) and /api/files/delete (DELETE).

import axios from 'axios';
import { logger } from '@/lib/logger';

const FILE_SERVICE_URL =
    process.env.NEXT_PUBLIC_FILE_SERVICE_URL ||
    'https://ftp.alhikmahfoundation.com.bd';

const FILE_SERVICE_API_KEY = process.env.FILE_SERVICE_API_KEY;

const FILE_SERVICE_USER_ID =
    process.env.NEXT_PUBLIC_FILE_SERVICE_USER_ID || 'lgm';

// Separate from the client-side `api` instance — this one targets the external
// file service directly with auth headers baked in.

const fileServiceClient = axios.create({
    baseURL: FILE_SERVICE_URL,
    headers: {
        Authorization: `Bearer ${FILE_SERVICE_API_KEY}`,
        'X-User-ID': FILE_SERVICE_USER_ID,
    },
});

// Log every request in dev so we can see exactly what's being sent
fileServiceClient.interceptors.request.use(config => {
    logger.info('[fileService] Request', {
        method: config.method?.toUpperCase(),
        url: `${config.baseURL}${config.url}`,
        hasAuth: !!config.headers?.Authorization,
    });
    return config;
});

fileServiceClient.interceptors.response.use(
    response => response,
    error => {
        if (axios.isAxiosError(error)) {
            logger.error('[fileService] Request failed', {
                method: error.config?.method?.toUpperCase(),
                url: error.config?.url,
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });
        }
        return Promise.reject(error);
    },
);

export interface UploadResult {
    name: string;
    url: string;
    fileId: string;
    size: number;
    mimeType: string;
}

export const extractFileId = (url: string): string | null => {
    if (!url) return null;
    const match = url.match(/\/files\/([a-f0-9-]+)/);
    return match ? match[1] : null;
};

export const getFileUrl = (fileId: string): string =>
    `${FILE_SERVICE_URL}/files/${fileId}`;

/**
 * Convert a file service URL to a proxied URL served through /api/images.
 * Use this for <img src> in Client Components so the auth header is added
 * server-side and the image actually loads in the browser.
 *
 * e.g. https://ftp.example.com/files/abc123
 *   →  /api/images/files/abc123
 */
export const getProxyImageUrl = (url: string): string => {
    if (!url) return url;
    try {
        const { pathname } = new URL(url);
        return `/api/images${pathname}`;
    } catch {
        return url;
    }
};

function parseUploadResponse(data: unknown): UploadResult | false {
    if (
        data &&
        typeof data === 'object' &&
        'file' in data &&
        data.file &&
        typeof data.file === 'object'
    ) {
        const f = data.file as Record<string, unknown>;
        if (f.id && f.name) {
            return {
                name: f.name as string,
                url: getFileUrl(f.id as string),
                fileId: f.id as string,
                size: (f.size as number) ?? 0,
                mimeType: (f.mimeType as string) ?? '',
            };
        }
    }
    return false;
}

export const upload = async (
    file: File | Blob,
    directory?: string,
): Promise<UploadResult | false> => {
    if (!file) return false;

    if (!FILE_SERVICE_API_KEY) {
        logger.error('[upload] FILE_SERVICE_API_KEY is not configured');
        return false;
    }

    try {
        const formData = new FormData();
        formData.append('file', file);
        if (directory) formData.append('directory', directory);

        const response = await fileServiceClient.post(
            '/files/upload',
            formData,
            {
                headers: {
                    // Let axios set Content-Type with the multipart boundary automatically
                    'Content-Type': 'multipart/form-data',
                },
            },
        );

        if (response.status === 201 && response.data?.file) {
            return parseUploadResponse(response.data);
        }

        logger.error('[upload] Unexpected response', {
            status: response.status,
            data: response.data,
        });
        return false;
    } catch (error) {
        // Interceptor already logs details — just return false
        return false;
    }
};

export const uploadMultiple = async (
    files: (File | Blob)[],
    directory?: string,
): Promise<UploadResult[]> => {
    const results: UploadResult[] = [];
    for (const file of files) {
        const result = await upload(file, directory);
        if (result) results.push(result);
    }
    return results;
};

export const deleteFile = async (urlOrFileId: string): Promise<boolean> => {
    if (!urlOrFileId) {
        logger.warn('[deleteFile] No URL or file ID provided');
        return false;
    }

    if (!FILE_SERVICE_API_KEY) {
        logger.error('[deleteFile] FILE_SERVICE_API_KEY is not configured');
        return false;
    }

    let fileId = urlOrFileId;
    if (urlOrFileId.includes('/files/') || urlOrFileId.startsWith('http')) {
        const extracted = extractFileId(urlOrFileId);
        if (!extracted) {
            logger.warn(
                `[deleteFile] Could not extract file ID from: ${urlOrFileId}`,
            );
            return false;
        }
        fileId = extracted;
    }

    try {
        logger.info(`[deleteFile] Deleting: ${fileId}`);

        await fileServiceClient.delete(`/files/${fileId}`);

        logger.info(`[deleteFile] Deleted: ${fileId}`);
        return true;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Got a response — not a network failure, just a non-2xx status
            logger.error('[deleteFile] Server rejected delete', {
                status: error.response.status,
                data: error.response.data,
                fileId,
            });
        }
        return false;
    }
};
