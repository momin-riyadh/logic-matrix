import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow: string;
  title: string | ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  descriptionClassName?: string;
  titleClassName?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  descriptionClassName = 'mx-auto max-w-3xl',
  titleClassName = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : '';

  return (
    <div className={`${alignClass} ${className}`.trim()}>
      <p className='reveal text-xs font-semibold uppercase tracking-[0.4em] text-sky-600'>{eyebrow}</p>
      <h2 className={`reveal delay-1 mt-4 text-3xl font-semibold text-sky-700 md:text-4xl ${titleClassName}`.trim()}>
        {title}
      </h2>
      {description ? (
        <p className={`reveal delay-2 mt-4 text-base text-slate-600 md:text-lg ${descriptionClassName}`.trim()}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
