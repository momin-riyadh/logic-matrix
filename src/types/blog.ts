export type BlogStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    coverImage: string | null;
    status: BlogStatus;
    tags: string[];
    author: string;
    isExternal: boolean;
    sourceUrl: string | null;
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface BlogsResponse {
    blogs: Blog[];
    pagination: PaginationMeta;
}
