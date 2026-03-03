import Image from 'next/image';
import { PortfolioItem } from './landing-data';

type PortfolioGridProps = {
  title: string;
  items: PortfolioItem[];
  gridCols?: number;
};

/**
 * PortfolioGrid component
 * Renders a grid of portfolio items or blog posts
 */
export default function PortfolioGrid({ title, items, gridCols = 3 }: PortfolioGridProps) {
  // Determine grid columns based on props
  const gridClassName = gridCols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className='bg-white py-12'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* Section Header */}
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl font-bold text-slate-800'>{title}</h2>
          <a href="#" className='text-sm font-semibold text-primary flex items-center gap-1 hover:text-primary/80 transition'>
            View All
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Grid Layout */}
        <div className={`grid gap-10 ${gridClassName}`}>
          {items.map((item, index) => (
            <article key={index} className='flex flex-col group rounded-3xl bg-white p-2 shadow-md shadow-slate-100 ring-1 ring-slate-100 transition hover:shadow-lg'>
              {/* Card Image */}
              <div className='relative aspect-16/10 w-full overflow-hidden rounded-2xl mb-4'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-cover transition duration-300 group-hover:scale-105'
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Card Content */}
              <div className='flex flex-col flex-1 p-4'>
                <div className='flex items-center gap-2 text-orange-400 text-[12px] font-semibold uppercase tracking-wider mb-2'>
                  <span>{item.category}</span>
                  <span className="text-slate-300">—</span>
                  <span>{item.readTime}</span>
                </div>
                <h3 className='text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-primary transition'>
                  {item.title}
                </h3>
                <p className='text-slate-500 text-[13px] mb-3 font-medium'>
                  {item.date.includes('.') ? `Date: ${item.date}` : item.date}
                </p>
                <p className='text-slate-600 mb-6 text-sm leading-relaxed line-clamp-3'>
                  {item.description}
                </p>
                <div className='mt-auto'>
                  <a
                    href={item.href}
                    className='inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50'
                  >
                    Read more
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
