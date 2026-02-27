import React from 'react';

export default function BlogCTA() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 max-w-4xl mx-auto leading-tight">
          <span className="text-blue-600">Building Insights,</span> Bricking by Bricking
        </h2>
        <p className="max-w-4xl mx-auto text-slate-600 leading-relaxed text-lg mb-10">
          Dive into expert advice on navigating the project planning process, discover innovative eco-friendly building materials, 
          explore the rising stars of architectural design, and get a behind-the-scenes look at Logic Matrix&apos;s own remarkable projects. 
          We&apos;ll also answer your burning questions, debunk common construction myths, and share inspiring stories of 
          individuals who have transformed their dream spaces into stunning realities.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
            href="#"
          >
            Hire Us
          </a>
          <a
            className="text-base font-semibold text-slate-700 underline decoration-2 underline-offset-8 transition hover:text-slate-900"
            href="#"
          >
            Book a Meeting
          </a>
        </div>
      </div>
    </section>
  );
}
