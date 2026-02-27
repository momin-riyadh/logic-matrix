import { contactInfo } from './landing-data';

export default function ContactSection() {
  return (
    <div className='rounded-3xl bg-white p-4 shadow-lg shadow-slate-200/60 sm:p-6 lg:p-8'>
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
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
