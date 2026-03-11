import HeroSection from '@/components/landing/HeroSection';
import ProcessSection from '@/components/landing/ProcessSection';

export default function OurApproachPage() {
    return (
        <>
            <HeroSection
                badge=''
                title='Our Approach'
                description="Empirical Edge Inc.'s software development process is designed to meet customer goals and priorities for advanced technology projects."
                primaryAction={{label: 'Hire Us', href: '/contact'}}
                secondaryAction={{label: 'Book a Meeting', href: '/contact'}}
                backgroundSrc='/logicmatrix/hero-bg.png'
                heightVariant="compact"
            />

            <ProcessSection />
        </>
    );
}
