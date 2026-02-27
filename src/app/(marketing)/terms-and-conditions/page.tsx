import Image from 'next/image';
import ContactSection from '@/components/landing/ContactSection';

export default function TermsAndConditionsPage() {
  const sections = [
    {
      id: 1,
      title: 'Introduction',
      content:
        'Welcome to Logic Matrix ("Company", "we", "our", or "us"). These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to comply with and be bound by these terms.',
    },
    {
      id: 2,
      title: 'Information We Collect',
      content:
        'We provide software development, DevOps, DevSecOps, and related technology services. All services are subject to written agreements, proposals, or contracts between the Company and the client.',
    },
    {
      id: 3,
      title: 'Intellectual Property',
      content:
        'All website content, including text, graphics, logos, and materials, is the property of Logic Matrix unless otherwise stated. Unauthorized use, reproduction, or distribution is prohibited.',
    },
    {
      id: 4,
      title: 'Client Responsibilities',
      content:
        'Clients agree to provide accurate information, timely feedback, and required resources necessary for project completion. Delays caused by the client may affect delivery timelines.',
    },
    {
      id: 5,
      title: 'Payment Terms',
      content:
        'Payment terms, schedules, and pricing are defined in individual service agreements. Failure to make timely payments may result in service suspension.',
    },
    {
      id: 6,
      title: 'Confidentiality',
      content:
        'Both parties agree to maintain confidentiality of proprietary or sensitive information shared during projects.',
    },
    {
      id: 7,
      title: 'Limitation Of Liability',
      content:
        'Logic Matrix shall not be liable for indirect, incidental, or consequential damages arising from the use of our services or website.',
    },
    {
      id: 8,
      title: 'Termination',
      content:
        'We reserve the right to terminate or suspend services if terms are violated or misuse is detected.',
    },
    {
      id: 9,
      title: 'Governing Law',
      content: 'These Terms shall be governed by and interpreted in accordance with the laws.',
    },
  ];

  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative isolate overflow-hidden bg-slate-100'>
        <div className='absolute inset-0'>
          <Image
            src='/logicmatrix/hero-bg.png'
            alt=''
            fill
            priority
            sizes='100vw'
            className='object-cover object-center grayscale opacity-50'
          />
          <div className='absolute inset-0 bg-white/40' />
          <div className='absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/50 to-transparent' />
        </div>
        <div className='relative mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-6 py-16 text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl'>
            Terms & Conditions
          </h1>
          <p className='mt-6 text-lg leading-8 text-slate-600 max-w-2xl'>
            Explore our recent Web, eCommerce and Mobile app projects
          </p>
          <div className='mt-4 flex flex-col gap-1 text-sm font-medium text-slate-500'>
            <span>Effective Date: 2nd February 2026</span>
            <span>Last Updated: 18th May 2026</span>
          </div>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <a
              href='#'
              className='rounded-md bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            >
              Hire Us
            </a>
            <a href='#' className='text-sm font-semibold leading-6 text-slate-900 underline decoration-2 underline-offset-8'>
              Book a Meeting
            </a>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className='mx-auto max-w-4xl px-6 py-20'>
        <div className='space-y-12'>
          {sections.map((section) => (
            <div key={section.id}>
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <span className='relative z-10 text-2xl font-bold text-blue-500'>
                    {section.id}.
                  </span>
                  <span className='absolute bottom-1 left-0 h-2 w-full bg-sky-100 -z-10' />
                </div>
                <h2 className='text-2xl font-bold text-slate-800'>{section.title}</h2>
              </div>
              <p className='mt-4 text-[15px] leading-relaxed text-slate-600'>
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-16 flex justify-center'>
          <a
            href='#contact'
            className='inline-flex items-center gap-2 rounded-lg border-2 border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white'
          >
            Get In Touch
            <svg
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
            </svg>
          </a>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id='contact' className='bg-slate-50 py-20'>
        <div className='mx-auto max-w-6xl px-6'>
          <ContactSection />
        </div>
      </section>
    </main>
  );
}
