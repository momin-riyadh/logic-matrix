'use client';

import HeroSection from '@/components/landing/HeroSection';
import SectionHeading from '@/components/landing/SectionHeading';
import DeveloperGrid from '@/components/landing/DeveloperGrid';
import ContentSection from '@/components/landing/ContentSection';
import { hireUsDevelopers } from '@/components/landing/landing-data';
import Link from 'next/link';
import RecentWorkSection from '@/components/landing/RecentWorkSection';

export default function HireUsPage() {
    return (
        <main className="min-h-screen bg-white">
            <HeroSection
                title="Hire Dedicated Software Developers Remotely"
                description="Hire mobile app developers, web developers, full-stack developers, front-end & back-end programmers, and more, all in one place."
                primaryAction={{ label: 'Hire Us', href: '/contact-us' }}
                secondaryAction={{ label: 'Book a Meeting', href: '/contact-us' }}
                badge="Hire Dedicated Developers"
                heightVariant="compact"
            />

            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <ContentSection
                        className="mb-20"
                        title="Connect Software Programmers Remotely"
                        description={[
                            "Logic Matrix is a trusted technology partner, specializing in creating customized mobile and web application solutions to automate the internal and external operations of enterprises. With a team of over 150 experienced IT professionals, we offer comprehensive services in design, development, deployment, and support/maintenance, making us an ideal choice for outsourcing your software projects.",
                            "Hiring offshore developers from Logic Matrix is highly convenient, especially when seeking programmers from India. You save significant money, time, and effort in managing the entire team."
                        ]}
                        imageSrc="/logicmatrix/hire_us_thumb.png"
                        imageAlt="Connect Software Programmers Remotely"
                        buttonLabel="Read More"
                        buttonHref="/about"
                    />

                    <div className="text-center mb-16">
                        <SectionHeading
                            eyebrow="TEAM EXTENSION"
                            title="Expand Your Team with Dedicated Developers Today!"
                            description="This article explains Product Marketing. You can read all the articles in our Product Management Journal - Product Marketing by signing up for free here."
                        />
                    </div>

                    <DeveloperGrid developers={hireUsDevelopers} />

                    <div className="mt-16 text-center reveal">
                         <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/contact-us" className="bg-primary text-white px-8 py-3 rounded-md font-bold shadow-lg transition hover:bg-primary/90">
                                Hire Us
                            </Link>
                            <Link href="/contact-us" className="text-slate-900 font-bold px-8 py-3 transition hover:text-slate-700">
                                Book a Meeting
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <RecentWorkSection showContactForm={false} />
        </main>
    );
}
