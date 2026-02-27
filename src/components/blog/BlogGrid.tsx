import React from 'react';
import BlogCard from './BlogCard';
import { blogPosts } from './blog-data';

export default function BlogGrid() {
  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
