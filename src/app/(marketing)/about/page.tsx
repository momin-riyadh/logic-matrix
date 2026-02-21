import Image from 'next/image';
import type {Metadata} from 'next';

import HeroSection from '@/components/landing/HeroSection';
import SectionHeading from '@/components/landing/SectionHeading';
import {stats} from '@/components/landing/landing-data';
import LeftImageCard from '@/components/ui/LeftImageCard';


const whyChooseUs = [
    {
        title: 'Responsibility',
        description:
            'Empirical Edge Inc. is dedicated to assuring the quality of its services, the productivity and accuracy of decisions made during the development process, the task execution, and the trust placed in us by our customers. We ensure the continuing maintenance of our software products.',
        icon: (
            <svg className='h-8 w-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7M12 2v2M4.93 4.93l1.41 1.41M2 12h2M4.93 19.07l1.41-1.41M12 20v2M17.66 17.66l1.41 1.41M20 12h2M17.66 6.34l1.41-1.41'
                />
            </svg>
        ),
        color: 'bg-[#9b72f2]',
        bgColor: 'bg-[#f5f0ff]',
    },
    {
        title: 'Communication',
        description:
            'We ensure regular communication with our customers, keeping them informed about every stage of the development process and valuing their responses. Trust between teams and customers forms the foundation of exceptional teamwork.',
        icon: (
            <svg className='h-8 w-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                />
            </svg>
        ),
        color: 'bg-[#43a047]',
        bgColor: 'bg-[#e8f5e9]',
    },
    {
        title: 'Efficiency',
        description:
            'We competently allocate time and material resources throughout the project, developing a competitive software product that inspires dignity in our customers regarding our work.',
        icon: (
            <svg className='h-8 w-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                />
            </svg>
        ),
        color: 'bg-[#f44336]',
        bgColor: 'bg-[#fff5f5]',
    },
    {
        title: 'Professionalism',
        description:
            'This suggests that we carefully execute our tasks, employ complete knowledge of processes, and extensive expertise, stick to high security, and maintain the highest confidentiality for our customers.',
        icon: (
            <svg className='h-8 w-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                />
            </svg>
        ),
        color: 'bg-[#ff9800]',
        bgColor: 'bg-[#fffbf2]',
    },
];

const experts = [
    {
        name: 'Rob Kapito Abdul',
        role: 'President',
        description:
            'Rob Kapito is President and a Director of BlackRock, a member of BlackRock’s Global Executive Committee and Chairman of the Global Operating Committee. He is responsible for day-to-day oversight of all BlackRock’s key operating units including Investment Strategies, Client Businesses, Technology & Operations, and Risk & Quantitative Analysis. Mr. Kapito is also a Director of iShares Inc.',
        image: '/logicmatrix/expert_1.png',
        bgColor: 'bg-sky-50',
        titleColor: 'text-sky-700',
        roleColor: 'text-slate-800',
        descColor: 'text-slate-500',
    },
    {
        name: 'Caroline Heller',
        role: 'Global Head of HR',
        description:
            'Caroline Heller, Senior Managing Director, is the Global Head of Human Resources for BlackRock and a member of its Global Executive Committee.',
        image: '/logicmatrix/expert_2.png',
        bgColor: 'bg-[#fff9f4]',
        titleColor: 'text-[#1e293b]',
        roleColor: 'text-sky-600',
        descColor: 'text-slate-500',
    },
    {
        name: 'Manish Mehta',
        role: 'Global Marketer',
        description:
            'Manish Mehta, Senior Managing Director, is Head of BlackRock Global Markets (BGM). Global Executive Committee.',
        image: '/logicmatrix/expert_3.png',
        bgColor: 'bg-[#f0f7ff]',
        titleColor: 'text-[#1e293b]',
        roleColor: 'text-sky-600',
        descColor: 'text-slate-500',
    },
];

const executives = [
    {
        name: 'Kristin Huguet',
        role: 'CoWorker',
        description: 'Expart on comunication',
        image: '/logicmatrix/exec_1.png',
    },
    {
        name: 'Phil Schiller',
        role: 'Construction ENG.',
        description: 'Work for BIWTA',
        image: '/logicmatrix/exec_2.png',
    },
    {
        name: 'Carol Surface',
        role: 'IT ENG.',
        description: 'Tecnical Expart',
        image: '/logicmatrix/exec_3.png',
    },
    {
        name: 'Adrian Perica',
        role: 'Corporate Development',
        description: 'MBA from the M.I.T.',
        image: '/logicmatrix/exec_4.png',
    },
];

export const metadata: Metadata = {
    title: 'About Us | LogicMatrix',
    description:
        'Learn how LogicMatrix helps teams design, build, and scale custom software that grows with their business.',
};

export default function AboutPage() {
    return (
        <>
            <HeroSection
                badge='About us'
                title='Expertise in Software Technologies'
                description='We partner with founders and enterprise leaders to design, build, and scale digital products that stand up to real-world growth.'
                primaryAction={{label: 'Hire Us', href: '/contact'}}
                secondaryAction={{label: 'Book a Meeting', href: '/contact'}}
                backgroundSrc='/logicmatrix/aboutus_hero_bg.png'
            />

            <LeftImageCard
                title='About Logic Matrix'
                subtitle='Your Partner for Custom Software Development Services'
                paragraphs={[
                    'Empirical Edge Inc. specializes in custom software development and IT outsourcing services. Our developers create tailored software solutions for individuals, startups, and small to medium-sized businesses.',
                    "Established in 2007, our company has experienced significant growth, increased productivity, and expanded our client base. We have successfully completed over 600 projects to date. Drawing on years of expertise, we recognize that every business operates within a unique software and hardware ecosystem. That's why we offer a range of software development services, ensuring we meet our clients' objectives using the latest technologies.",
                ]}
                action={{label: 'Read More', href: '/about'}}
                imageSrc='/logicmatrix/a_card.png'
                imageAlt='Logic Matrix office workspace'
            />

            <section className='bg-white py-16 sm:py-24'>
                <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                    <div className='mx-auto max-w-3xl text-center'>
                        <h2 className='text-3xl font-bold tracking-tight text-[#0277bd] sm:text-4xl md:text-5xl'>
                            Why should you choose Empirical Edge Inc.?
                        </h2>
                        <p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500'>
                            This article explains Product Marketing. You can read all the articles in our Product
                            Management Journal – Product Marketing by signing up for free here.
                        </p>
                    </div>

                    <div className='mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center'>
                        <div className='flex flex-col items-center'>
                            <div className='relative aspect-square w-full max-w-lg'>
                                <Image
                                    src='/logicmatrix/why_choose_us.png'
                                    alt='Why choose us illustration'
                                    fill
                                    className='object-contain'
                                    priority
                                />
                            </div>
                            <a
                                href='/contact'
                                className='mt-8 rounded-2xl bg-[#2563eb] px-12 py-4 text-2xl font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-blue-700 active:scale-95'
                            >
                                Hire Us
                            </a>
                        </div>

                        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8'>
                            {whyChooseUs.map((item) => (
                                <div
                                    key={item.title}
                                    className={`flex flex-col items-center rounded-[32px] px-6 py-10 text-center transition-all duration-300 hover:shadow-xl ${item.bgColor}`}
                                >
                                    <div
                                        className={`flex h-16 w-16 items-center justify-center rounded-full ${item.color} mb-6 shadow-md`}
                                    >
                                        {item.icon}
                                    </div>
                                    <h3 className='text-xl font-bold text-[#1e293b]'>{item.title}</h3>
                                    <p className='mt-4 text-[14px] leading-relaxed text-[#64748b]'>
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            <section className='bg-white py-16 sm:py-24'>
                <div className='mx-auto max-w-3xl px-6 lg:px-8'>
                    <div className='mx-auto max-w-3xl text-center'>
                        <h2 className='text-3xl font-bold tracking-tight text-[#0277bd] sm:text-4xl md:text-6xl'>
                            Our Experts
                        </h2>
                        <div className='mt-10 space-y-6 text-lg leading-relaxed text-slate-500'>
                            <p>
                                The Executive Leadership and Senior Management team at Empirical Edge Inc. have 20+
                                years of industry experience, a broad global outlook, and a profound commitment to
                                delivering impressive results.
                            </p>
                            <p>
                                At Empirical Edge Inc., our Developers are proficient in .NET development, ASP.NET,
                                and application development. We ensure first-rate quality, user satisfaction, and
                                results-oriented solutions.
                            </p>
                            <p>
                                Our team is expert, passionate, and committed, with a balanced knowledge of
                                technical, functional, and domain knowledge. We constantly improve our operations to
                                fulfill customer expectations and provide competent and professional solutions.
                            </p>
                            <p>
                                Empirical Edge Inc. offers value-for-money solutions and is a reliable business
                                partner in various capacities. Whether the requirements are simple or complex, we
                                will innovate and dedicate ourselves to meeting them.
                            </p>
                        </div>

                        <div className='mt-12 flex justify-center'>
                            <a
                                href='/contact'
                                className='rounded-2xl bg-[#2563eb] px-12 py-4 text-2xl font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-blue-700 active:scale-95'
                            >
                                Hire Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/*New Section*/}
            <section className='bg-white pb-16 sm:pb-24'>
                <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                    <div className='grid grid-cols-1 gap-8'>
                        {/* President Card - Large */}
                        <div
                            className={`overflow-hidden rounded-[32px] ${experts[0].bgColor} transition-all duration-300 hover:shadow-xl`}>
                            <div className='flex flex-col lg:flex-row'>
                                <div className='relative h-60 w-full lg:h-auto lg:w-1/2'>
                                    <Image
                                        src={experts[0].image}
                                        alt={experts[0].name}
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                                <div className='flex flex-col justify-center p-8 lg:w-1/2 lg:p-12'>
                                    <h3 className={`text-3xl font-bold ${experts[0].titleColor} sm:text-4xl`}>
                                        {experts[0].name}
                                    </h3>
                                    <p className={`mt-2 text-xl font-medium ${experts[0].roleColor}`}>
                                        {experts[0].role}
                                    </p>
                                    <p className={`mt-6 text-lg leading-relaxed ${experts[0].descColor}`}>
                                        {experts[0].description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Other Experts Grid */}
                        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                            {experts.slice(1).map((expert) => (
                                <div
                                    key={expert.name}
                                    className={`overflow-hidden rounded-[32px] ${expert.bgColor} flex flex-col transition-all duration-300 hover:shadow-xl sm:flex-row`}
                                >
                                    <div className='relative h-64 w-full sm:h-auto sm:w-2/5'>
                                        <Image
                                            src={expert.image}
                                            alt={expert.name}
                                            fill
                                            className='object-cover'
                                        />
                                    </div>
                                    <div className='flex flex-col justify-center p-8 sm:w-3/5'>
                                        <h3 className={`text-2xl font-bold ${expert.titleColor}`}>
                                            {expert.name}
                                        </h3>
                                        <p className={`mt-1 text-lg font-medium ${expert.roleColor}`}>
                                            {expert.role}
                                        </p>
                                        <p className={`mt-4 text-sm leading-relaxed ${expert.descColor}`}>
                                            {expert.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


      {/*Executive Profiles*/}
            <section className="bg-white pb-10">
                <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                    <div className='bg-[#f0f9ff] rounded-4xl p-8 shadow-sm'>


                        <div className='mb-12 overflow-hidden rounded-4xl shadow-lg'>
                            <div className='relative h-64 w-full sm:h-80 md:h-100 lg:h-125'>
                                <Image
                                    src='/logicmatrix/exec_main.png'
                                    alt='Executive Team'
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        </div>

                        <h2 className='text-center text-3xl font-bold text-[#0277bd] sm:text-4xl md:text-5xl'>
                            Executive Profiles
                        </h2>

                        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
                            {executives.map((exec) => (
                                <div
                                    key={exec.name}
                                    className='flex flex-col items-center rounded-[32px] bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl'
                                >
                                    <div
                                        className='relative mb-6 aspect-square w-full max-w-45 overflow-hidden rounded-full border-4 border-slate-50'>
                                        <Image src={exec.image} alt={exec.name} fill className='object-cover'/>
                                    </div>
                                    <div className='text-center'>
                                        <h3 className='text-xl font-bold text-[#1e293b]'>{exec.name}</h3>
                                        <p className='mt-2 text-sm font-semibold text-sky-600'>{exec.role}</p>
                                        <p className='mt-2 text-sm text-slate-500'>{exec.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className='mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row '>
                        <a
                            href='/contact'
                            className='rounded-lg bg-[#3b82f6] px-10 py-3 text-xl font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-600 active:scale-95'
                        >
                            Hire Us
                        </a>
                        <a
                            href='/contact'
                            className='text-2xl font-bold text-[#1e293b] underline decoration-[3px] underline-offset-8 transition hover:text-black'
                        >
                            Book a Meeting
                        </a>
                    </div>
                </div>
            </section>


        </>
    );
}
