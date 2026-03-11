import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ContentSectionProps {
    title: string;
    description: string | string[];
    imageSrc: string;
    imageAlt: string;
    imagePosition?: 'left' | 'right';
    buttonLabel?: string;
    buttonHref?: string;
    className?: string;
}

export default function ContentSection({
    title,
    description,
    imageSrc,
    imageAlt,
    imagePosition = 'left',
    buttonLabel,
    buttonHref,
    className
}: ContentSectionProps) {
    const isImageLeft = imagePosition === 'left';

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-12 items-center", className)}>
            <div className={cn("reveal", isImageLeft ? "order-1" : "order-1 md:order-2")}>
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                />
            </div>
            <div className={cn("reveal delay-1", isImageLeft ? "order-2" : "order-2 md:order-1")}>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">{title}</h2>
                {Array.isArray(description) ? (
                    description.map((p, i) => (
                        <p key={i} className="text-slate-600 mb-6 leading-relaxed">{p}</p>
                    ))
                ) : (
                    <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
                )}
                {buttonLabel && (
                    buttonHref ? (
                        <Link href={buttonHref} className="text-primary font-bold border-b-2 border-primary pb-1 transition hover:text-primary/80 hover:border-primary/80">
                            {buttonLabel}
                        </Link>
                    ) : (
                        <button className="text-primary font-bold border-b-2 border-primary pb-1 transition hover:text-primary/80 hover:border-primary/80">
                            {buttonLabel}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
