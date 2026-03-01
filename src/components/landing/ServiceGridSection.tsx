import Image from 'next/image';
import { ServiceCategoryData } from './landing-data';
import SectionHeading from './SectionHeading';
import { cn } from '@/lib/utils';

interface ServiceGridSectionProps {
    data: ServiceCategoryData;
    className?: string;
}

export default function ServiceGridSection({ data, className }: ServiceGridSectionProps) {
    return (
        <section className={cn('bg-white', className)} id={data.id}>
            <div className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
                <SectionHeading
                    align='center'
                    eyebrow={data.eyebrow || 'SERVICES'}
                    title={data.title}
                    description={data.description}
                    descriptionClassName='max-w-3xl text-center mx-auto'
                />

                <div className='mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'>
                    {data.items.map((item, index) => (
                        <article
                            className={`reveal delay-${Math.min((index % 6) + 1, 6)} rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm flex flex-col justify-center items-center transition-all hover:shadow-md hover:border-sky-200 group`}
                            key={item.title}
                        >
                            <div className={cn(
                                'mx-auto flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110 shadow-sm',
                                item.bgClassName || 'bg-sky-50'
                            )}>
                                {item.icon ? (
                                    <div className={cn('h-8 w-8', item.colorClassName || 'text-sky-600')}>
                                        {item.icon}
                                    </div>
                                ) : item.imageSrc ? (
                                    <div className="relative h-10 w-10">
                                        <Image
                                            src={item.imageSrc}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ) : null}
                            </div>
                            <h3 className='mt-4 text-sm font-semibold text-slate-700 leading-tight'>{item.title}</h3>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
