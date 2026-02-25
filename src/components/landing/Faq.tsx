"use client";

import React, { useState } from 'react';
import { MessageCircle, Search, Phone, ChevronDown, ChevronUp } from 'lucide-react';

const infoCards = [
    {
        title: 'Contact Live Chat Support',
        subtitle: '24/7 Available, No Chatbots',
        icon: MessageCircle,
    },
    {
        title: 'Search What You Want',
        subtitle: 'Everything Is Here',
        icon: Search,
    },
    {
        title: 'Talk With Us',
        subtitle: '24/7 Available',
        icon: Phone,
    },
];

const accordionData = [
    {
        title: 'Proven Expertise Across Technologies',
        content: 'We have a talented team of developers and designers with experience in many different programming languages, frameworks, and platforms, allowing us to choose the technology stack that best fits your needs.',
    },
    {
        title: 'Transparent & Collaborative Process',
        content: 'Our development process is built on transparency and collaboration, ensuring you are involved and informed at every stage of the project.',
    },
    {
        title: 'Performance & SEO Optimization',
        content: 'We prioritize performance and SEO from the start, building fast, optimized websites that rank well and provide an excellent user experience.',
    },
    {
        title: 'Tailor-Made Solutions',
        content: 'We understand that every business is unique. We provide customized solutions tailored specifically to your business goals and requirements.',
    },
    {
        title: 'Commitment to Quality & Security',
        content: 'Security and quality are at the core of our development. We follow best practices to ensure your application is secure, reliable, and high-performing.',
    },
    {
        title: 'End-to-End Support & Maintenance',
        content: 'Our relationship doesn\'t end at launch. We provide ongoing support and maintenance to keep your application up-to-date and running smoothly.',
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left Column */}
                    <div>
                        <h2 className="text-4xl md:text-3xl font-bold text-sky-600 mb-12 leading-tight">
                            Why Choose Us As <br /> Your Development Partner?
                        </h2>

                        <div className="space-y-6">
                            {infoCards.map((card, index) => (
                                <div
                                    key={index}
                                    className="flex gap-2 items-center p-6 rounded-xl bg-sky-50/50 border border-sky-100/50 transition-all hover:shadow-md"
                                >
                                    <div className="mr-6 p-3 rounded-lg bg-white text-teal-900 shadow-sm">
                                        <card.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-teal-900 mb-1">
                                            {card.title}
                                        </h3>
                                        <p className="text-slate-500 font-medium">
                                            {card.subtitle}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column (Accordion) */}
                    <div className="lg:pt-8">
                        <div className="divide-y divide-sky-100">
                            {accordionData.map((item, index) => (
                                <div key={index} className="py-4">
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex items-center justify-between text-left group focus:outline-none"
                                    >
                                        <span className={`text-xl md:text-2xl font-bold transition-colors ${openIndex === index ? 'text-sky-600' : 'text-teal-900 group-hover:text-sky-600'}`}>
                                            {item.title}
                                        </span>
                                        {openIndex === index ? (
                                            <ChevronUp className="text-sky-600 shrink-0" size={24} />
                                        ) : (
                                            <ChevronDown className="text-teal-900 group-hover:text-sky-600 shrink-0" size={24} />
                                        )}
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            openIndex === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <p className="text-slate-600 leading-relaxed text-lg">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
