import React from 'react';

export default function BlogIntro() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          Welcome to <span className="text-blue-600">Logic Matrix</span> Blog
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-8">Blogs</h3>
        
        <p className="max-w-4xl mx-auto text-slate-600 leading-relaxed text-lg">
          Welcome to the Logic Matrix blog, where we delve into the exciting world of technology and innovation! 
          Every week, we&apos;ll be your guide on a journey through the latest trends, industry insights, and practical 
          tips related to all things digital. Whether you&apos;re a seasoned developer, a budding entrepreneur, or 
          simply curious about the fascinating world of software, we have something for everyone.
        </p>
      </div>
    </section>
  );
}
