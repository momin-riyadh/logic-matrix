import React from 'react';

export default function BlogPagination() {
  return (
    <div className="flex items-center justify-center gap-2 py-12">
      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20">
        1
      </button>
      
      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-all font-medium">
        2
      </button>
      
      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-all font-medium">
        3
      </button>
      
      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
