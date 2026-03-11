import Image from 'next/image';
import { Developer } from './landing-data';

interface DeveloperGridProps {
    developers: Developer[];
}

export default function DeveloperGrid({ developers }: DeveloperGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {developers.map((dev, index) => (
                <div
                    key={index}
                    className={`reveal delay-${Math.min((index % 6) + 1, 6)} ${dev.bgColor} p-8 rounded-2xl flex flex-col items-center text-center transition-transform hover:scale-105`}
                >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ">
                        <Image src={dev.icon} alt={dev.title} width={60} height={60} className="object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{dev.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        {dev.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
