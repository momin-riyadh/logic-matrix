import { useState } from 'react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Sparkles } from 'lucide-react';

const ICON_LIBRARY = {
    'Analytics & Charts': [
        'TrendingUp',
        'TrendingDown',
        'BarChart',
        'BarChart2',
        'BarChart3',
        'BarChart4',
        'LineChart',
        'PieChart',
        'Activity',
        'AreaChart',
        'CandlestickChart',
    ],
    'Users & People': [
        'Users',
        'User',
        'UserPlus',
        'UserCheck',
        'UserMinus',
        'UserCircle',
        'UserSquare',
        'Users2',
        'UserCog',
        'UsersRound',
    ],
    'Business & Finance': [
        'DollarSign',
        'CreditCard',
        'Wallet',
        'Coins',
        'Banknote',
        'Receipt',
        'TrendingUp',
        'Target',
        'Briefcase',
        'Calculator',
        'PiggyBank',
    ],
    'Time & Calendar': [
        'Clock',
        'Calendar',
        'CalendarDays',
        'CalendarCheck',
        'CalendarRange',
        'Timer',
        'Hourglass',
        'AlarmClock',
        'Watch',
    ],
    'Achievement & Awards': [
        'Award',
        'Trophy',
        'Medal',
        'Star',
        'Crown',
        'Sparkles',
        'Zap',
        'CheckCircle',
        'CheckCircle2',
        'BadgeCheck',
        'Shield',
        'ShieldCheck',
    ],
    Communication: [
        'MessageSquare',
        'MessageCircle',
        'Mail',
        'Send',
        'Phone',
        'Video',
        'Mic',
        'Bell',
        'BellRing',
        'AtSign',
        'Hash',
    ],
    'Commerce & Shopping': [
        'ShoppingCart',
        'ShoppingBag',
        'Store',
        'Package',
        'PackageCheck',
        'Tag',
        'Percent',
        'Gift',
        'Truck',
        'Box',
    ],
    'Technology & Code': [
        'Code',
        'Code2',
        'Terminal',
        'Laptop',
        'Smartphone',
        'Monitor',
        'Server',
        'Database',
        'Cpu',
        'HardDrive',
        'Wifi',
        'Cloud',
    ],
    'Media & Content': [
        'Image',
        'FileText',
        'File',
        'Folder',
        'Film',
        'Music',
        'Video',
        'Camera',
        'Aperture',
        'Play',
        'Pause',
        'Download',
        'Upload',
    ],
    'Navigation & Direction': [
        'Navigation',
        'Map',
        'MapPin',
        'Compass',
        'Route',
        'ArrowRight',
        'ArrowUp',
        'ChevronRight',
        'ChevronsRight',
        'MoveRight',
    ],
    'Social & Engagement': [
        'Heart',
        'ThumbsUp',
        'ThumbsDown',
        'Share',
        'Share2',
        'Eye',
        'EyeOff',
        'Bookmark',
        'Flag',
        'Smile',
    ],
    'Tools & Actions': [
        'Settings',
        'Wrench',
        'Tool',
        'Hammer',
        'Pencil',
        'Edit',
        'Trash',
        'Copy',
        'Clipboard',
        'Search',
        'Filter',
        'Sliders',
    ],
    'Status & Indicators': [
        'CheckCircle',
        'XCircle',
        'AlertCircle',
        'AlertTriangle',
        'Info',
        'HelpCircle',
        'MinusCircle',
        'PlusCircle',
        'Loader',
        'RefreshCw',
    ],
    'Nature & Location': [
        'Globe',
        'Home',
        'Building',
        'Building2',
        'Landmark',
        'TreePine',
        'Sun',
        'Moon',
        'Cloud',
        'CloudRain',
        'Droplets',
    ],
    Misc: [
        'Rocket',
        'Flame',
        'Battery',
        'BatteryCharging',
        'Gauge',
        'Link',
        'Lock',
        'Unlock',
        'Key',
        'Fingerprint',
        'Layers',
        'Grid',
    ],
};

// Flatten all icons for search
const ALL_ICONS = Object.values(ICON_LIBRARY).flat();

export default function IconPicker({
    value,
    onChange,
}: {
    value?: string;
    onChange: (icon: string) => void;
}) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...Object.keys(ICON_LIBRARY)];

    const filteredIcons =
        selectedCategory === 'All'
            ? ALL_ICONS.filter(name =>
                  name.toLowerCase().includes(search.toLowerCase()),
              )
            : ICON_LIBRARY[
                  selectedCategory as keyof typeof ICON_LIBRARY
              ].filter(name =>
                  name.toLowerCase().includes(search.toLowerCase()),
              );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className={cn(
                        'w-full justify-start gap-2 font-normal',
                        !value && 'text-muted-foreground',
                    )}
                >
                    {value ? (
                        <>
                            {(() => {
                                const Icon = (LucideIcons as any)[value];
                                return Icon ? (
                                    <Icon className='w-4 h-4' />
                                ) : null;
                            })()}
                            <span className='truncate'>{value}</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className='w-4 h-4' />
                            Select Icon
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[400px] p-0' align='start'>
                <div className='flex flex-col h-[450px]'>
                    {/* Search */}
                    <div className='p-3 border-b'>
                        <Input
                            placeholder='Search icons...'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className='h-9'
                        />
                    </div>

                    {/* Category Filter */}
                    <ScrollArea className='border-b'>
                        <div className='flex gap-1 p-2'>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        'px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors',
                                        selectedCategory === cat
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted hover:bg-muted/80',
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Icon Grid */}
                    <ScrollArea className='flex-1'>
                        <div className='grid grid-cols-8 gap-1 p-3'>
                            {filteredIcons.map(iconName => {
                                const Icon = (LucideIcons as any)[iconName];
                                if (!Icon) return null;
                                return (
                                    <button
                                        key={iconName}
                                        type='button'
                                        onClick={() => onChange(iconName)}
                                        className={cn(
                                            'p-2 rounded-md hover:bg-accent flex items-center justify-center transition-colors group relative',
                                            value === iconName &&
                                                'bg-primary text-primary-foreground',
                                        )}
                                        title={iconName}
                                    >
                                        <Icon className='w-5 h-5' />
                                    </button>
                                );
                            })}
                        </div>
                        {filteredIcons.length === 0 && (
                            <div className='text-center py-8 text-sm text-muted-foreground'>
                                No icons found
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </PopoverContent>
        </Popover>
    );
}
