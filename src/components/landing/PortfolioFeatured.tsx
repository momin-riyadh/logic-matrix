import Image from 'next/image';
import { featuredProject } from './landing-data';

/**
 * PortfolioFeatured component
 * Highlights a single featured project or blog post
 */
export default function PortfolioFeatured() {
  const item = featuredProject;

  return (
    <section className='bg-white py-12'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* Section Header */}
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl font-bold text-slate-800'>Featured</h2>
          <a href="#" className='text-sm font-semibold text-primary flex items-center gap-1 hover:text-primary/80 transition'>
            View All
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Featured Card */}
        <div className='grid gap-8 lg:grid-cols-2 lg:items-center'>
          <div className='relative aspect-16/10 w-full overflow-hidden rounded-3xl shadow-lg'>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className='object-cover'
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
          <div className='flex flex-col items-start'>
            <div className='flex items-center gap-2 text-primary text-[13px] font-semibold uppercase tracking-wider mb-3'>
              <span>{item.category}</span>
              <span className="text-slate-300">—</span>
              <span>{item.readTime}</span>
            </div>
            <h3 className='text-2xl lg:text-3xl font-bold text-slate-900 mb-3 leading-tight'>
              {item.title}
            </h3>
            <p className='text-slate-500 text-sm mb-4 font-medium'>
              {item.date}
            </p>
            <p className='text-slate-600 mb-8 leading-relaxed text-base lg:text-lg'>
              {item.description}
            </p>
            <a
              href={item.href}
              className='inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50'
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
