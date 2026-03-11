import type {Metadata} from 'next';
import HeroSection from '@/components/landing/HeroSection';
import LeftImageCard from "@/components/ui/LeftImageCard";
import RecentWorkSection from "@/components/landing/RecentWorkSection";

export const metadata: Metadata = {
    title: 'Career | LogicMatrix',
    description:
        'Looking for Experienced Software Team Leadership? Get in touch for great job opportunities.',
};

export default function CareerPage() {
    return (
        <main className="overflow-hidden">
            <HeroSection
                badge=''
                title='Career'
                description={'Looking for Experienced Software Team Leadership?\nGet in touch for great job opportunities.'}
                primaryAction={{label: 'Hire Us', href: '/contact'}}
                secondaryAction={{label: 'Book a Meeting', href: '/contact'}}
                backgroundSrc='/logicmatrix/aboutus_hero_bg.png'
                heightVariant="compact"
            />

            {/* Building Your Dreams Section */}
            <section className="py-16 md:py-24 bg-white text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-6">
                        Building Your Dreams, <span className="text-slate-800">Brick by Brick</span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        At AK Group, we&apos;re not just builders, we&apos;re dream weavers. We take your vision and turn it into a
                        tangible reality, one brick at a time. With over [X] years of experience and a team of passionate
                        professionals, we&apos;re dedicated to delivering exceptional results on every project, big or small.
                    </p>
                </div>
            </section>

            <div className="relative">
                {/* Decorative Blue Line (Simplified for now, can be enhanced with SVG if needed) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sky-200 hidden lg:block -z-10" />

                {/* What We Provide Section */}
                <LeftImageCard
                    title="What We Provide:"
                    imageSrc="/logicmatrix/recent-work-1.png"
                    imageAlt="What We Provide"
                    reverse={true}
                    listItems={[
                        "Quality Craftsmanship",
                        "Unwavering Commitment",
                        "Personalized Service",
                        "Proven Expertise",
                        "Satisfied Clients"
                    ]}
                />

                {/* What We Expect Section */}
                <LeftImageCard
                    title="What We Expect :"
                    imageSrc="/logicmatrix/recent-work-2.png"
                    imageAlt="What We Expect"
                    paragraphs={[
                        "We believe in building more than just structures; we build relationships. We collaborate closely with our clients, ensuring their vision is at the heart of every decision. We're more than just contractors, we're partners in your success."
                    ]}
                />

                {/* Want to turn your dream into reality Section */}
                <LeftImageCard
                    title="Want to turn your dream into reality?"
                    imageSrc="/logicmatrix/recent-work-3.png"
                    imageAlt="Want to turn your dream into reality"
                    reverse={true}
                    paragraphs={[
                        "Contact AK Group today and let us help you build the future you envision."
                    ]}
                />
            </div>

            {/* Get In Touch Button Section */}
            <div className="py-12 bg-white text-center">
                <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-500 px-8 py-4 text-lg font-semibold text-sky-600 shadow-sm transition hover:bg-sky-50"
                >
                    Get In Touch
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="m13 5 7 7-7 7" />
                    </svg>
                </a>
            </div>

            {/* Contact Form Section */}
            <RecentWorkSection showContactForm={true} showPortfolioItems={false} />
        </main>
    );
}
