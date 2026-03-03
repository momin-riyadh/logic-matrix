import Image from 'next/image';
import ContactSection from '@/components/landing/ContactSection';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 1,
      title: 'Introduction',
      content:
        'Logic Matrix Company we respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.',
    },
    {
      id: 2,
      title: 'Information We Collect',
      content:
        'We may collect personal information such as your name, email address, phone number, company name, and job title when you submit forms on our website. We also collect non-personal data such as IP address, browser type, device information, and usage analytics.',
    },
    {
      id: 3,
      title: 'How We Use Your Information',
      content:
        'We use your information to respond to inquiries, provide DevOps and software services, improve our website, ensure security, and comply with legal obligations. We do not sell or rent your personal information.',
    },
    {
      id: 4,
      title: 'Cookies And Tracking',
      content:
        'We use cookies and similar technologies to enhance user experience and analyze website traffic. You may disable cookies in your browser settings.',
    },
    {
      id: 5,
      title: 'Data Security',
      content:
        'We implement appropriate technical and organizational measures to protect your data. However, no internet transmission method is completely secure.',
    },
    {
      id: 6,
      title: 'Third-Party Services',
      content:
        'We may use trusted third-party providers such as cloud hosting, analytics, and infrastructure tools. These providers are required to protect your data.',
    },
    {
      id: 7,
      title: 'Data Retention',
      content:
        'We retain personal information only as long as necessary to fulfill business and legal obligations.',
    },
    {
      id: 8,
      title: 'Your Rights',
      content:
        'You may request access, correction, or deletion of your personal data, subject to applicable laws.',
    },
    {
      id: 9,
      title: 'Changes To This Policy',
      content:
        'We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date',
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
            Privacy Policy
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
              className='rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all'
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
            className='inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground'
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
