import { services } from './landing-data';
import SectionHeading from './SectionHeading';

export default function ServicesSection() {
  return (
    <section className='bg-sky-50'>
      <div className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
        <SectionHeading
          eyebrow='Services'
          title='Software Development Services for your Business'
          description='We work closely with you to understand your challenges and deliver custom solutions that are easy to use, scalable, and built to support your success.'
        />

        <div className='mt-12 grid gap-6 sm:grid-cols-2'>
          {services.map((service, index) => (
            <article
              className={`reveal delay-${Math.min(index + 3, 6)} rounded-2xl bg-white p-6 shadow-sm shadow-sky-100 ring-1 ring-sky-100`}
              key={service.title}
            >
              <div className='flex items-start gap-4'>
                <span className='flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600'>
                  {service.icon}
                </span>
                <div>
                  <h3 className='text-lg font-semibold text-slate-800'>{service.title}</h3>
                  <p className='mt-2 text-sm text-slate-600'>{service.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
