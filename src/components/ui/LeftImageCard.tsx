import Image from "next/image"

import { cn } from "@/lib/utils"

type LeftImageCardAction = {
  label: string
  href: string
}

type LeftImageCardProps = {
  title: string
  subtitle?: string
  paragraphs?: string[]
  action?: LeftImageCardAction
  imageSrc: string
  imageAlt?: string
  className?: string
}

export default function LeftImageCard({
  title,
  subtitle,
  paragraphs = [],
  action,
  imageSrc,
  imageAlt = "",
  className,
}: LeftImageCardProps) {
  return (
    <section className={cn('bg-white ', className)}>
      <div className='mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16'>
        <div className='rounded-[48px] bg-sky-50/80 p-6 shadow-2xl shadow-slate-200/70 ring-1 ring-sky-100/80 sm:p-8'>
          <div className='relative aspect-4/3 h-60 w-full overflow-hidden rounded-[32px] sm:h-80 lg:h-96'>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes='(max-width: 1024px) 100vw, 560px'
              className='object-cover object-center'
            />
          </div>
        </div>

        <div className='text-left'>
          <h2 className='text-3xl font-bold tracking-tight text-[#0277bd] sm:text-4xl md:text-5xl'>
            {title}
          </h2>
          {subtitle ? (
            <p className='mt-6 text-lg font-medium text-slate-600 sm:text-xl'>
              {subtitle}
            </p>
          ) : null}
          <div className='mt-6 space-y-6 text-base leading-relaxed text-slate-500 sm:text-lg'>
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {action ? (
            <a
              className='mt-10 inline-flex text-3xl font-bold text-[#1e293b] underline decoration-[3px] underline-offset-8 transition hover:text-black'
              href={action.href}
            >
              {action.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
