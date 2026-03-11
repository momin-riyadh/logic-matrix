import Image from 'next/image';

type HeroAction = {
  label: string;
  href?: string;
};

type HeroSectionProps = {
  badge?: string;
  title?: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  backgroundSrc?: string;
  heightVariant?: 'default' | 'compact';
};

export default function HeroSection({
  badge = 'Custom Software Studio',
  title = 'Custom Software Solutions That Scale With Your Business',
  description = 'Delivering project success no matter what',
  primaryAction = { label: 'Hire Us', href: '#' },
  secondaryAction = { label: 'Book a Meeting', href: '#' },
  backgroundSrc = '/logicmatrix/hero-bg.png',
  heightVariant = 'default',
}: HeroSectionProps) {
  const heroHeightClass =
    heightVariant === 'compact'
      ? 'min-h-[260px] sm:min-h-[300px] lg:min-h-[350px] py-12'
      : 'min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] py-16';

  return (
    <section className='relative isolate overflow-hidden bg-slate-100'>
      <div className='absolute inset-0'>
        <Image src={backgroundSrc} alt='' fill priority sizes='100vw' className='object-cover object-center' />
        <div className='absolute inset-0 bg-white/30' />
        <div className='absolute inset-x-0 bottom-0 h-40' />
      </div>
      <div
        className={`relative mx-auto flex max-w-5xl flex-col items-center justify-center px-6 text-center ${heroHeightClass}`}
      >
        {badge && (
          <span className='reveal inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-600 shadow-sm'>
            {badge}
          </span>
        )}
        <h1 className='reveal delay-1 mt-6 text-3xl font-semibold leading-tight text-slate-800 sm:text-4xl lg:text-5xl'>
          {title}
        </h1>
        <p className='reveal delay-2 mt-4 max-w-3xl whitespace-pre-line text-base text-slate-600 sm:text-lg'>
          {description}
        </p>
        <div className='reveal delay-3 mt-8 flex flex-wrap items-center justify-center gap-6'>
          <a
            className='inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90'
            href={primaryAction.href}
          >
            {primaryAction.label}
          </a>
          <a
            className='text-base font-semibold text-slate-700 underline decoration-2 underline-offset-8 transition hover:text-slate-900'
            href={secondaryAction.href}
          >
            {secondaryAction.label}
          </a>
        </div>
      </div>
    </section>
  );
}
