import { brandLogos, stats } from './landing-data';

export default function CompanySection() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-sky-50 via-sky-50 to-white'>
      <div className='pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl'></div>
      <div className='pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl'></div>

      <div className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
        <p className='reveal text-center text-xs font-semibold uppercase tracking-[0.4em] text-sky-600'>Our Company</p>
        <h1 className='reveal delay-1 mt-4 text-center text-3xl font-semibold text-sky-700 md:text-4xl'>
          9+ Years of Proven Excellence in Software Development
        </h1>
        <p className='reveal delay-2 mx-auto mt-4 max-w-3xl text-center text-base text-slate-600 md:text-lg'>
          Logic Matrix has helped many global brands optimize their conversion. Here are some of them:
        </p>

        <div className='reveal delay-3 mt-10 grid gap-6 text-center sm:grid-cols-3'>
          {stats.map((stat) => (
            <div className='rounded-2xl bg-white/70 p-6 shadow-sm shadow-sky-100 ring-1 ring-sky-100' key={stat.label}>
              <div className='text-3xl font-semibold text-slate-700 md:text-4xl'>{stat.value}</div>
              <div className='mt-1 text-sm font-medium text-slate-500'>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className='reveal delay-4 mt-14 text-center'>
          <h2 className='text-2xl font-semibold text-sky-700 md:text-3xl'>Brands we&apos;ve worked with</h2>
          <p className='mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base'>
            Logic Matrix has helped many global brands optimize their conversion. Here are some of them:
          </p>
        </div>

        <div className='mt-8 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7'>
          {brandLogos.map((logo, index) => {
            const delay = (index % 8) + 1;
            return (
              <img
                className={`reveal delay-${delay} h-7 w-auto max-w-[140px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-9`}
                src={logo.src}
                alt={logo.alt}
                key={logo.alt}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
