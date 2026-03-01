import type {Metadata} from 'next';

import HeroSection from '@/components/landing/HeroSection';
import DevOpsToolsSection from '@/components/landing/DevOpsToolsSection';
import DevSecOpsToolsSection from '@/components/landing/DevSecOpsToolsSection';
import ServiceGridSection from '@/components/landing/ServiceGridSection';
import {
    softwareDesignServices,
    databaseDevelopmentServices,
    ecommerceDevelopmentServices,
    mobileAppServices,
    techExpertiseServices,
    cmsDevelopmentServices,
    systemIntegrationServices,
    crmDevelopmentServices,
    uiuxDesignServices,
    seoServices,
    cloudServicesData,
    aiMlServices
} from '@/components/landing/landing-data';

export const metadata: Metadata = {
    title: 'Our Services | LogicMatrix',
    description:
        'Explore our wide range of custom software development, cloud, and AI services tailored to your business needs.',
};

export default function ServicesPage() {
    return (
        <>
            <HeroSection
                badge='Our Services'
                title='Custom Software Development Services'
                description='We offer comprehensive custom software development and IT outsourcing services tailored to meet the unique needs of startups and small to medium-sized businesses. Our team brings years of experience in'
                primaryAction={{label: 'Hire Us', href: '/contact'}}
                secondaryAction={{label: 'Book a Meeting', href: '/contact'}}
                backgroundSrc='/logicmatrix/aboutus_hero_bg.png'
            />

            <ServiceGridSection data={softwareDesignServices} />

            <DevOpsToolsSection />

            <DevSecOpsToolsSection />

            <ServiceGridSection data={databaseDevelopmentServices} className="bg-slate-50/50" />

            <ServiceGridSection data={ecommerceDevelopmentServices} />

            <ServiceGridSection data={mobileAppServices} className="bg-slate-50/50" />

            <ServiceGridSection data={techExpertiseServices} />

            <ServiceGridSection data={cmsDevelopmentServices} className="bg-slate-50/50" />

            <ServiceGridSection data={systemIntegrationServices} />

            <ServiceGridSection data={crmDevelopmentServices} className="bg-slate-50/50" />

            <ServiceGridSection data={uiuxDesignServices} />

            <ServiceGridSection data={seoServices} className="bg-slate-50/50" />

            <ServiceGridSection data={cloudServicesData} />

            <ServiceGridSection data={aiMlServices} className="bg-slate-50/50" />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <a
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
                            href="/contact"
                        >
                            Hire Us
                        </a>
                        <a
                            className="text-lg font-semibold text-slate-700 underline decoration-2 underline-offset-8 transition hover:text-slate-900"
                            href="/contact"
                        >
                            Book a Meeting
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
