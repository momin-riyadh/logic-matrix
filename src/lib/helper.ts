const FILE_SERVICE_URL =
    process.env.NEXT_PUBLIC_FILE_SERVICE_URL ||
    'https://ftp.alhikmahfoundation.com.bd';

/**
 * Extract file ID from a file service URL
 */
export const extractFileId = (url: string): string | null => {
    if (!url) return null;
    const match = url.match(/\/files\/([a-f0-9-]+)/);
    return match ? match[1] : null;
};

/**
 * Get file URL (for viewing/downloading)
 */
export const getFileUrl = (fileId: string): string => {
    return `${FILE_SERVICE_URL}/files/${fileId}`;
};
