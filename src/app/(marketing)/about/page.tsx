import type { Metadata } from 'next';

import SectionHeading from '@/components/landing/SectionHeading';
import { stats } from '@/components/landing/landing-data';

const values = [
  {
    title: 'Outcome-led delivery',
    description:
      'We focus on measurable outcomes first, then design the roadmap that gets you there with the least risk.',
  },
  {
    title: 'Senior craft',
    description:
      'Small, senior teams ship the work. You get clear ownership, tight feedback loops, and steady progress.',
  },
  {
    title: 'Long-term partners',
    description:
      'We build for maintainability and scale so your product keeps improving long after launch.',
  },
];

export const metadata: Metadata = {
  title: 'About Us | LogicMatrix',
  description:
    'Learn how LogicMatrix helps teams design, build, and scale custom software that grows with their business.',
};

export default function AboutPage() {
  return (
    <>
      <section className='relative overflow-hidden bg-white'>
        <div className='mx-auto max-w-6xl px-6 py-16 sm:py-20'>
          <SectionHeading
            eyebrow='About us'
            title='A software studio built for ambitious teams'
            description='We partner with founders and enterprise leaders to design, build, and scale digital products that stand up to real-world growth.'
            align='left'
            descriptionClassName='max-w-2xl'
          />

          <div className='mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]'>
            <div className='space-y-4 text-base text-slate-600'>
              <p>
                LogicMatrix blends strategy, design, and engineering into one focused delivery team. We help clients
                modernize legacy systems, launch new digital experiences, and build the operational tooling that keeps
                teams moving fast.
              </p>
              <p>
                From discovery to launch, we build with clarity: tight scopes, weekly demos, and transparent
                communication so you always know what is shipping next.
              </p>
            </div>

            <div className='rounded-3xl bg-sky-50 p-6 shadow-sm ring-1 ring-sky-100'>
              <h3 className='text-sm font-semibold text-slate-700'>What you can expect</h3>
              <ul className='mt-4 space-y-3 text-sm text-slate-600'>
                <li>Product roadmaps aligned with your goals and timelines.</li>
                <li>Design systems that keep every release consistent.</li>
                <li>Reliable delivery with performance and security in mind.</li>
              </ul>
            </div>
          </div>

          <div className='mt-12 grid gap-4 sm:grid-cols-3'>
            {stats.map((stat) => (
              <div
                className='rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm'
                key={stat.label}
              >
                <div className='text-3xl font-semibold text-sky-700'>{stat.value}</div>
                <div className='mt-2 text-sm text-slate-500'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-slate-100'>
        <div className='mx-auto max-w-6xl px-6 py-16'>
          <SectionHeading
            eyebrow='How we work'
            title='Principles that guide every engagement'
            description='We keep the process lightweight, transparent, and focused on long-term success.'
          />

          <div className='mt-10 grid gap-6 md:grid-cols-3'>
            {values.map((value) => (
              <div className='rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200' key={value.title}>
                <h3 className='text-base font-semibold text-slate-800'>{value.title}</h3>
                <p className='mt-3 text-sm text-slate-600'>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
