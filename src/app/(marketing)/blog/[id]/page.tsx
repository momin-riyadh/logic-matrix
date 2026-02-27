import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import { blogPosts } from '@/components/blog/blog-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BlogSimilarPosts from '@/components/blog/BlogSimilarPosts';
import BlogCTA from '@/components/blog/BlogCTA';

export default async function BlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.id === resolvedParams.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        badge="Blog Details"
        title="Blog Details"
        description={`Explore our recent Web, eCommerce and Mobile app projects\n\nEffective Date: ${post.effectiveDate || '2nd Febuary 2026'}\nLast Updated: ${post.lastUpdated || '18th May 2026'}`}
        primaryAction={{ label: 'Hire Us', href: '#' }}
        secondaryAction={{ label: 'Book a Meeting', href: '#' }}
        backgroundSrc="/logicmatrix/hero-bg.png"
      />

      <article className="max-w-5xl mx-auto px-6 py-20">
        {/* Blog Header Info */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            {post.id === '1' ? (
              <>Plan Your Project with <span className="text-blue-600">Your</span> Software Development Model in Mind</>
            ) : post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {post.tags?.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-sky-50 text-blue-600 text-xs font-semibold rounded-md border border-sky-100">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              Last updated: {post.lastUpdated}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-12">
          {post.sections ? (
            post.sections.map((section, index) => (
              <div key={index} className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
                  {section.title}
                </h2>
                <div className="whitespace-pre-wrap">
                  {section.content}
                </div>
                {section.image && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg my-10 border border-slate-100">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="space-y-6">
              <p className="text-xl font-medium text-slate-800">
                {post.description}
              </p>
              <p>
                Detailed content for &quot;{post.title}&quot; is currently being prepared.
                Our team is working hard to bring you the most relevant and up-to-date information 
                regarding this topic. Please stay tuned for updates.
              </p>
            </div>
          )}
        </div>
      </article>

      <BlogSimilarPosts />
      <BlogCTA />
    </main>
  );
}
