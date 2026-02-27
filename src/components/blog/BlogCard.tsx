import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from './blog-data';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
      <div className="relative h-64 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h4>
        <p className="text-sm text-slate-400 mb-4">{post.date}</p>
        <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
          {post.description}
        </p>
        <Link
          href={post.href}
          className="inline-flex items-center px-4 py-1.5 border border-slate-300 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-blue-600 hover:text-blue-600 transition-all"
        >
          See more
        </Link>
      </div>
    </div>
  );
}
