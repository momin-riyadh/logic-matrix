import {
    ClipboardCheck,
    Layout,
    Layers,
    Code2,
    Rocket,
    SearchCheck,
    Settings
} from 'lucide-react';

const processSteps = [
    {
        title: 'Requirements Gathering',
        description: 'Experience customized solutions with our Custom Software Development service. We\'ll discuss the project\'s immediate needs in person or via web meetings to ensure clarity. Then, our team plans a proposal, forming the roadmap for the website\'s future.',
        icon: ClipboardCheck,
    },
    {
        title: 'Visual Concept',
        description: 'Transform the website with our UI/UX Design Services. We guide you through selecting the perfect visual concept during our work process. Once agreed upon, our designers will develop several options, ensuring the website reflects the company\'s core in a fascinating and clear visual style.',
        icon: Layout,
    },
    {
        title: 'Site Architecture',
        description: 'Our team provides excellent results customized to the company\'s needs. We focus on developing an accessible site structure that ensures easy navigation with minimum clicks to approach desired pages or information.',
        icon: Layers,
    },
    {
        title: 'Development',
        description: 'We\'re committed to designing the ideal product through software development. During this stage, complicated programming happens on our servers. Companies can approach testing and review each repetition in a staging environment, ensuring contentment.',
        icon: Code2,
    },
    {
        title: 'Production Deployment',
        description: 'We are experts in launching products across any platform. After finalizing the visual concept and site map, we produce graphical templates and convert them into active HTML wireframes, providing a navigable site preview.',
        icon: Rocket,
    },
    {
        title: 'Testing',
        description: 'Functional testing is testing conducted on a complete, integrated system to evaluate the system\'s compliance with its specified requirements.',
        icon: SearchCheck,
    },
    {
        title: 'Maintenance & Support',
        description: 'Our maintenance and support services will keep your CMS website optimized, secure, and performing best. We provide regular updates, security patches, performance monitoring, and real-time issue resolution to keep your CMS running smoothly.',
        icon: Settings,
    },
];

export default function DesignDevelopmentProcess() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-16">
                    Our Design And <br className="hidden md:block"/> Development Process
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {processSteps.map((step, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl bg-sky-50/50 flex flex-col items-start ${
                                index === 6 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''
                            }`}
                        >
                            <div className="mb-6 text-sky-500">
                                <step.icon size={48} strokeWidth={1.5}/>
                            </div>
                            <h3 className="text-2xl font-bold text-teal-900 mb-4">
                                {step.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
