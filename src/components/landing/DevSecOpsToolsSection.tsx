import Image from 'next/image';
import type {DevSecOpsCategory, DevSecOpsTool} from './landing-data';
import {devSecOpsCategories} from './landing-data';
import SectionHeading from './SectionHeading';

export default function DevSecOpsToolsSection() {
    return (
        <section className='bg-white'>
            <div className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
                <SectionHeading
                    eyebrow='DevSecOps'
                    title='DevSecOps Tools for Secure and Compliant Delivery'
                    description='We work closely with you to understand your challenges and deliver custom solutions that are easy to use, scalable, and built to support your success.'
                />

                <div className='mt-12 flex flex-wrap justify-center gap-10'>
                    {devSecOpsCategories.map((category: DevSecOpsCategory, index: number) => (
                        <article
                            className={`reveal delay-${Math.min(index + 3, 6)}flex-none text-center sm:w-[calc(50%-1.25rem)] md:w-[calc(33.333%-1.667rem)]`}
                            key={category.title}
                        >
                            <h3 className='text-lg font-semibold text-slate-800'>{category.title}</h3>
                            <p className='mt-2 text-sm text-slate-600'>{category.description}</p>
                            <div className='mt-6 flex justify-center items-center gap-4'>
                                {category.tools.map((tool: DevSecOpsTool) => {
                                    const baseClassName =
                                        'flex aspect-square items-center w-24 h-24 justify-center rounded-2xl border border-sky-100 bg-sky-100/70 px-2 text-center shadow-sm';
                                    const actionClassName = 'border-sky-200 bg-sky-100 text-sky-600';
                                    return (
                                        <div
                                            className={`${baseClassName} ${tool.variant === 'action' ? actionClassName : ''}`}
                                            key={`${category.title}-${tool.name}`}
                                        >
                                            {tool.variant === 'action' ? (
                                                <>
                                                    <span className='sr-only'>Learn more</span>
                                                    <svg
                                                        className='h-5 w-5'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        aria-hidden='true'
                                                    >
                                                        <path d='M5 12h14'/>
                                                        <path d='m13 5 7 7-7 7'/>
                                                    </svg>
                                                </>
                                            ) : (
                                                tool.imageSrc ? (
                                                    <Image
                                                        src={tool.imageSrc}
                                                        alt={tool.imageAlt ?? tool.name}
                                                        width={52}
                                                        height={52}
                                                        className='h-20 w-20 object-contain'
                                                    />
                                                ) : (
                                                    <span
                                                        className={`text-[11px] font-semibold leading-tight ${tool.accentClassName ?? 'text-slate-700'}`}>
                            {tool.name}
                          </span>
                                                )
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </article>
                    ))}
                </div>

                <div className='mt-10 text-center'>
                    <button
                        className='inline-flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50'
                        type='button'
                    >
                        Learn more
                        <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
                             strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                            <path d='M5 12h14'/>
                            <path d='m13 5 7 7-7 7'/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
