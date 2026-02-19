import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className='relative isolate overflow-hidden bg-slate-100'>
      <div className='absolute inset-0'>
        <Image src='/logicmatrix/hero-bg.png' alt='' fill priority sizes='100vw' className='object-cover object-center' />
        <div className='absolute inset-0'></div>
      </div>
      <div className='relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-6 py-16 text-center sm:min-h-[75vh] lg:min-h-[85vh] lg:items-start lg:text-left'>
        <span className='reveal inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-600 shadow-sm'>
          Custom Software Studio
        </span>
        <h1 className='reveal delay-1 mt-6 text-3xl font-semibold leading-tight text-slate-800 sm:text-4xl lg:text-5xl'>
          Custom Software Solutions That
          <span className='block'>Scale With Your Business</span>
        </h1>
        <p className='reveal delay-2 mt-4 max-w-2xl text-base text-slate-600 sm:text-lg'>
          Delivering project success no matter what. We build digital products that are fast, resilient, and ready for
          real-world growth.
        </p>
        <div className='reveal delay-3 mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start'>
          <button
            className='inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700'
            type='button'
          >
            Contact Us
          </button>
          <a className='text-sm font-semibold text-slate-700 underline decoration-2 underline-offset-8 hover:text-slate-900' href='#'>
            Book a Meeting
          </a>
        </div>
      </div>
    </section>
  );
}
