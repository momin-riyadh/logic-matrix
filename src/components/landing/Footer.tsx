export default function Footer() {
  const services = [
    'Custom Software Development',
    'Cloud & DevOps',
    'DevSecOps',
    'Product Design',
    'Support & Maintenance',
    'AI & Machine Learning',
  ];

  const company = [
    'About Us',
    'Contact',
    'Career',
    'Terms & Conditions',
    'Portfolio',
    'Testimonials',
  ];

  return (
    <section className='bg-brand text-white'>
      <footer className='mx-auto max-w-7xl px-6 pb-12 pt-12 md:pt-20' aria-label='Footer'>
        <div className='grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-20'>
          <div className='space-y-6'>
            <img className='h-14 w-auto' src='/assets/images/white-logo.svg' alt='Logic Matrix logo' />
            <p className='max-w-xs text-[15px] leading-relaxed text-white/90'>
              We are always committed what we want to do. Bring with us, we will show you the real world.
            </p>
            <div className='flex items-center gap-4'>
              <a
                className='inline-flex h-9 w-9 items-center justify-center rounded-md bg-white transition hover:bg-white/90'
                href='#'
                aria-label='Facebook'
              >
                <img src='/assets/images/social/facebook.svg' alt='' className='h-5 w-5' />
              </a>
              <a
                className='inline-flex h-9 w-9 items-center justify-center rounded-md bg-white transition hover:bg-white/90'
                href='#'
                aria-label='LinkedIn'
              >
                <img src='/assets/images/social/linkedin.svg' alt='' className='h-5 w-5' />
              </a>
              <a
                className='inline-flex h-9 w-9 items-center justify-center rounded-md bg-white transition hover:bg-white/90'
                href='#'
                aria-label='Twitter'
              >
                <img src='/assets/images/social/twitter.svg' alt='' className='h-5 w-5' />
              </a>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold'>Services</h3>
            <ul className='mt-5 space-y-4 text-[15px] text-white/85'>
              {services.map((item) => (
                <li key={item}>
                  <a className='transition hover:text-white' href='#'>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold'>Company</h3>
            <ul className='mt-5 space-y-4 text-[15px] text-white/85'>
              {company.map((item) => (
                <li key={item}>
                  <a className='transition hover:text-white' href='#'>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold'>Contact</h3>
            <ul className='mt-5 space-y-5 text-[15px] text-white/85'>
              <li className='flex items-center gap-3'>
                <img src='/assets/images/communication/man.svg' alt='' className='h-5 w-5' />
                Dhaka-1207
              </li>
              <li className='flex items-center gap-3'>
                <img src='/assets/images/communication/Message.svg' alt='' className='h-5 w-5' />
                xanin023@gmail.com
              </li>
              <li className='flex items-center gap-3'>
                <img src='/assets/images/communication/Calling.svg' alt='' className='h-5 w-5' />
                +880 1234756
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-20 text-center text-sm text-white/80'>
          © 2026 Logic Matrix. All rights reserved.
        </div>
      </footer>
    </section>
  );
}
