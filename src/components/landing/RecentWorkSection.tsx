import Image from 'next/image';
import { contactInfo, recentWork } from './landing-data';
import SectionHeading from './SectionHeading';

export default function RecentWorkSection() {
  return (
    <section className='bg-sky-50'>
      <div className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
        <SectionHeading
          eyebrow='Portfolio'
          title='Our Recent Work'
          description='List of reasons why clients should choose your company, including'
          descriptionClassName='mx-auto max-w-2xl'
        />

        <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {recentWork.map((item) => (
            <article className='reveal delay-3 rounded-2xl bg-white shadow-sm shadow-sky-100 ring-1 ring-sky-100' key={item.title}>
              <div className='relative h-36 w-full overflow-hidden sm:h-40'>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes='(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
                  className='rounded-tl-2xl rounded-tr-2xl object-cover'
                />
              </div>
              <div className='p-4'>
                <h3 className='mt-4 text-sm font-semibold text-slate-800'>{item.title}</h3>
                <p className='mt-2 text-xs text-slate-600'>{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className='mt-8 text-center'>
          <a className='text-sm font-semibold text-slate-700 underline decoration-2 underline-offset-8 hover:text-slate-900' href='#'>
            Show More
          </a>
        </div>

        <div className='mt-12 rounded-3xl bg-white p-4 shadow-lg shadow-slate-200/60 sm:p-6 lg:p-8'>
          <div className='grid gap-6 lg:grid-cols-[1fr_2fr]'>
            <div className='rounded-2xl bg-blue-700 p-6 text-white sm:p-8'>
              <h3 className='text-lg font-semibold'>Contact Information</h3>
              <p className='mt-3 text-sm text-blue-100'>
                We&apos;re here to help you every step of the way. Get in touch and let&apos;s start the conversation today.
              </p>
              <ul className='mt-6 space-y-4 text-sm'>
                {contactInfo.map((item) => (
                  <li className='flex items-center gap-3' key={item.label}>
                    <span className='flex h-9 w-9 items-center justify-center rounded-full bg-white/15'>{item.icon}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <form className='grid gap-4 rounded-2xl bg-white p-2 sm:p-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <label className='text-xs font-semibold text-slate-600'>
                  Name
                  <input
                    className='mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    type='text'
                    placeholder='Jhon Snow'
                  />
                </label>
                <label className='text-xs font-semibold text-slate-600'>
                  E-mail
                  <input
                    className='mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    type='email'
                    placeholder='hello@mail.com'
                  />
                </label>
              </div>
              <label className='text-xs font-semibold text-slate-600'>
                Subject
                <input
                  className='mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  type='text'
                  placeholder='What type of project are you interested in ?'
                />
              </label>
              <label className='text-xs font-semibold text-slate-600'>
                Message
                <textarea
                  className='mt-2 min-h-[120px] w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  placeholder='Write your message here'
                ></textarea>
              </label>
              <div>
                <button
                  className='inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/25 hover:bg-blue-700'
                  type='submit'
                >
                  Send Massage
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
