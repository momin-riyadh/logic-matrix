import { processSteps } from './landing-data';
import SectionHeading from './SectionHeading';

export default function ProcessSection() {
  return (
    <section className='bg-white'>
      <div className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
        <SectionHeading
          eyebrow='Process'
          title='Design & Development Process'
          description='A clear, proven delivery flow that keeps projects aligned, transparent, and moving fast from idea to launch.'
        />

        <div className='relative mt-12 space-y-10 lg:space-y-14'>
          {processSteps.map((step, index) => {
            const isEven = index % 2 === 1;
            return (
              <article
                className={`reveal delay-${index + 3} rounded-[2rem] border border-sky-200 bg-white p-6 shadow-sm lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10 lg:p-8 ${
                  isEven ? 'lg:grid-cols-[1.1fr_1fr]' : ''
                }`}
                key={step.title}
              >
                <div className={isEven ? 'lg:order-last' : ''}>
                  <h3 className='text-lg font-semibold text-sky-700'>{step.title}</h3>
                  <p className='mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500'>{step.subtitle}</p>
                  <p className='mt-4 text-sm text-slate-600'>{step.description}</p>
                </div>
                <div className='mt-6 lg:mt-0'>
                  <div
                    className={`flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br p-6 shadow-lg sm:h-56 ${step.gradientClassName}`}
                  >
                    {step.icon}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
