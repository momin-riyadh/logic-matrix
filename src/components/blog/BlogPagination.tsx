import React from 'react';

export default function BlogPagination() {
  return (
    <div className="flex items-center justify-center gap-2 py-12">
      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-primary hover:text-primary transition-all">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20">
        1
      </button>

      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-all font-medium">
        2
      </button>

      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-all font-medium">
        3
      </button>

      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-all font-medium">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
