import Image from 'next/image';
import type {Metadata} from 'next';

import HeroSection from '@/components/landing/HeroSection';

import IndustriesSection from "@/components/landing/IndustriesSection";
import RecentWorkSection from "@/components/landing/RecentWorkSection";
import LeftImageCard from "@/components/ui/LeftImageCard";
import DesignDevelopmentProcess from "@/components/landing/DesignDevelopmentProcess";
import Faq from "@/components/landing/Faq";


export const metadata: Metadata = {
    title: 'Design and Development Process | LogicMatrix',
    description:
        'Learn about our design and development process for building user-friendly, high-performance websites.',
};

export default function DesignAndDevelopmentProcessPage() {
    return (
        <>
            <HeroSection
                badge=''
                title='Design and Development Process'
                description='Our design and development process builds user-friendly, high-performance websites that deliver results—every step built for speed, scalability, and success.'
                primaryAction={{label: 'Hire Us', href: '/contact'}}
                secondaryAction={{label: 'Book a Meeting', href: '/contact'}}
                backgroundSrc='/logicmatrix/aboutus_hero_bg.png'
            />
            <LeftImageCard
                title='Our design and development process helps'
                imageSrc='/logicmatrix/aboutus_hero_bg.png'
                imageAlt='Our design and development process helps'
                paragraphs={[
                    'Your Partner for Custom Software Development Services Empirical Edge Inc. specializes in custom software development and IT outsourcing services. Our developers create tailored '
                ]}
                action={{label: 'Read More', href: '/contact'}}
            />

            {/*Start Our Design And Development Process*/}
            <DesignDevelopmentProcess />
            {/*Start FAQ*/}
            <Faq />
            <IndustriesSection/>
            <RecentWorkSection/>

        </>
    );
}
