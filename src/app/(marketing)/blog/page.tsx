import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import BlogIntro from '@/components/blog/BlogIntro';
import BlogFilters from '@/components/blog/BlogFilters';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogPagination from '@/components/blog/BlogPagination';
import BlogCTA from '@/components/blog/BlogCTA';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        badge="Blogs"
        title="Blogs"
        description="Looking for Experienced Software Team Leadership? Get in touch for great job opportunities."
        primaryAction={{ label: 'Hire Us', href: '#' }}
        secondaryAction={{ label: 'Book a Meeting', href: '#' }}
        backgroundSrc="/logicmatrix/hero-bg.png"
        heightVariant="compact"
      />

      <BlogIntro />
      <BlogFilters />
      <BlogGrid />
      <BlogPagination />
      <BlogCTA />
    </main>
  );
}
