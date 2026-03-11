// app/admin/portfolio/[id]/edit/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PortfolioForm } from '../../_components/PortfolioForm';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPortfolioPage({ params }: PageProps) {
    const { id } = await params;
    const portfolio = await prisma.portfolio.findUnique({
        where: { id: id },
        include: { features: true, stats: true },
    });

    if (!portfolio) notFound();

    const initialData = {
        title: portfolio.title,
        slug: portfolio.slug,
        category: portfolio.category,
        description: portfolio.description,
        client: portfolio.client ?? '',
        progress: portfolio.progress ?? 0,
        coverImage: portfolio.coverImage,
        images: portfolio.images,
        tags: portfolio.tags,
        status: portfolio.status,
        featured: portfolio.featured,
        liveUrl: portfolio.liveUrl ?? '',
        githubUrl: portfolio.githubUrl ?? '',
        completedAt: portfolio.completedAt
            ? portfolio.completedAt.toISOString().split('T')[0]
            : '',
        features: portfolio.features.map(f => ({
            title: f.title,
            description: f.description ?? '',
        })),
        stats: portfolio.stats.map(s => ({
            label: s.label,
            value: s.value,
            icon: s.icon ?? '',
        })),
    };

    return (
        <PortfolioForm
            mode='edit'
            portfolioId={portfolio.id}
            initialData={initialData}
        />
    );
}
