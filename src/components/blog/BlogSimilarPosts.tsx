import React from 'react';
import BlogCard from './BlogCard';
import { blogPosts } from './blog-data';
import Link from 'next/link';

export default function BlogSimilarPosts() {
  // Just show 3 posts as similar posts
  const similarPosts = blogPosts.slice(1, 4);

  return (
    <section className="px-6 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Our Another <span className="text-blue-600">Similar Post</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600">
            During early experiments with LORAN&apos;s skywaves, Jack Pierce noticed that at night 
            the reflective layer in the ionosphere was quite stable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {similarPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-2 border border-blue-600 rounded-md text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
          >
            See more
          </Link>
        </div>
      </div>
    </section>
  );
}
