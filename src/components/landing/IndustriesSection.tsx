import { industries } from './landing-data';
import SectionHeading from './SectionHeading';

export default function IndustriesSection() {
  return (
    <section className='bg-white'>
      <div className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
        <SectionHeading
          eyebrow='Industries'
          title='Industries We Serve'
          description='We can assist any business with a computer or server. Here is a partial list of the industries we have recently serviced.'
        />

        <div className='mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
          {industries.map((industry, index) => (
            <article
              className={`reveal delay-${Math.min(index + 3, 6)} rounded-md aspect-square border border-slate-200 bg-white text-center shadow-sm flex flex-col justify-center items-center`}
              key={industry.title}
            >
              <span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-md ${industry.iconWrapperClassName}`}>
                {industry.icon}
              </span>
              <h3 className='mt-3 text-sm font-semibold text-slate-700'>{industry.title}</h3>
            </article>
          ))}
        </div>

        <div className='mt-10 text-center'>
          <button
            className='inline-flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50'
            type='button'
          >
            Learn more
            <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
              <path d='M5 12h14' />
              <path d='m13 5 7 7-7 7' />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
