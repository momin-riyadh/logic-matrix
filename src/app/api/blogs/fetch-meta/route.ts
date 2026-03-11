import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL
    try {
        new URL(url);
    } catch {
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (compatible; BlogBot/1.0; +https://yourdomain.com)',
                Accept: 'text/html',
            },
            signal: AbortSignal.timeout(8000),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch URL: ${response.status}` },
                { status: 422 },
            );
        }

        const html = await response.text();

        // Extract OG- / meta-tags with regex (no cheerio dependency needed)
        const getMeta = (property: string): string | undefined => {
            // og: property
            const ogMatch = html.match(
                new RegExp(
                    `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`,
                    'i',
                ),
            );
            if (ogMatch) return ogMatch[1];
            // name= variant
            const nameMatch = html.match(
                new RegExp(
                    `<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`,
                    'i',
                ),
            );
            return nameMatch?.[1];
        };

        const getTitle = (): string | undefined => {
            const og = getMeta('og:title');
            if (og) return og;
            const twitterTitle = getMeta('twitter:title');
            if (twitterTitle) return twitterTitle;
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            return titleMatch?.[1]?.trim();
        };

        const getDescription = (): string | undefined => {
            return (
                getMeta('og:description') ||
                getMeta('twitter:description') ||
                getMeta('description')
            );
        };

        const getImage = (): string | undefined => {
            return getMeta('og:image') || getMeta('twitter:image');
        };

        const getAuthor = (): string | undefined => {
            return getMeta('author') || getMeta('article:author');
        };

        const getSiteName = (): string | undefined => {
            return getMeta('og:site_name');
        };

        const title = getTitle();
        const excerpt = getDescription();
        const coverImage = getImage();
        const author = getAuthor();
        const siteName = getSiteName();

        return NextResponse.json({
            title: title || undefined,
            excerpt: excerpt || undefined,
            coverImage: coverImage || undefined,
            author: author || undefined,
            siteName: siteName || undefined,
        });
    } catch (error) {
        if (error instanceof Error && error.name === 'TimeoutError') {
            return NextResponse.json(
                { error: 'Request timed out' },
                { status: 408 },
            );
        }
        console.error('fetch-meta error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch metadata' },
            { status: 500 },
        );
    }
}
