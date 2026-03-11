import Image from 'next/image';
import type {Metadata} from 'next';

import HeroSection from '@/components/landing/HeroSection';
import IndustriesSection from "@/components/landing/IndustriesSection";
import RecentWorkSection from "@/components/landing/RecentWorkSection";
import LeftImageCard from "@/components/ui/LeftImageCard";


export const metadata: Metadata = {
    title: 'Industries We Serve | LogicMatrix',
    description:
        'Learn how LogicMatrix helps teams design, build, and scale custom software that grows with their business.',
};

export default function IndustryWeServe() {
    return (
        <>
            <HeroSection
                badge=''
                title='Industries We Serve'
                description='We can assist any business with a computer or server.Here is a partial list of the industries we have recently serviced.'
                primaryAction={{label: 'Hire Us', href: '/contact'}}
                secondaryAction={{label: 'Book a Meeting', href: '/contact'}}
                backgroundSrc='/logicmatrix/aboutus_hero_bg.png'
                heightVariant="compact"
            />


            <IndustriesSection/>
            <RecentWorkSection/>

        </>
    );
}
