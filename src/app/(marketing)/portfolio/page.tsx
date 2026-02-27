import type { Metadata } from 'next';
import HeroSection from '@/components/landing/HeroSection';
import RecentWorkSection from '@/components/landing/RecentWorkSection';
import PortfolioFeatured from '@/components/landing/PortfolioFeatured';
import PortfolioGrid from '@/components/landing/PortfolioGrid';
import { latestBlogs, popularProjects } from '@/components/landing/landing-data';

export const metadata: Metadata = {
    title: 'Portfolio | LogicMatrix',
    description: 'Explore our recent Web, eCommerce and Mobile app projects and see how we help businesses grow with custom software solutions.',
};

/**
 * Portfolio page component
 * Displays the hero section, featured projects, latest blogs, and popular works
 */
export default function PortfolioPage() {
    return (
        <>
            {/* Hero Section: Updated to match the design's title and description */}
            <HeroSection
                badge=""
                title="Let's Explore Our Portfolio"
                description="Explore our recent Web, eCommerce and Mobile app projects"
                primaryAction={{ label: 'Hire Us', href: '/contact' }}
                secondaryAction={{ label: 'Book a Meeting', href: '/contact' }}
                backgroundSrc="/logicmatrix/hero-bg.png"
            />

            {/* Featured Section: Highlights the most important project */}
            <PortfolioFeatured />

            {/* Latest Blog Section: Shows recently published articles in a 2-column grid */}
            <PortfolioGrid title="Latest Blog" items={latestBlogs} gridCols={2} />

            {/* Most Popular Section: Displays popular works in a 3-column grid */}
            <PortfolioGrid title="Most Popular" items={popularProjects} gridCols={3} />

            {/* Recent Work Section: Shows the standard recent work cards without the contact form */}
            <RecentWorkSection showContactForm={false} />
        </>
    );
}
