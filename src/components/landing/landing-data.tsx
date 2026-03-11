import type {ReactNode} from 'react';

// ============================================
// TYPE DEFINITIONS
// ============================================
// These types define the structure of data used across landing page components

/**
 * Navigation link structure
 * @property label - Display text for the link
 * @property href - URL destination
 * @property children - Optional array of child links for dropdown menus
 */
export type NavLink = {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
};

/**
 * Statistics counter item
 * @property value - Numeric or text value (e.g., "9+", "483")
 * @property label - Description of the statistic
 */
export type StatItem = {
    value: string;
    label: string;
};

/**
 * Brand/Partner logo information
 * @property src - Path to logo image
 * @property alt - Accessibility text for the image
 */
export type BrandLogo = {
    src: string;
    alt: string;
};

/**
 * Process/workflow step with visual styling
 * @property title - Step heading
 * @property subtitle - Secondary heading or tagline
 * @property description - Detailed explanation of the step
 * @property gradientClassName - Tailwind gradient classes for visual styling
 * @property icon - React SVG icon component
 */
export type ProcessStep = {
    title: string;
    subtitle: string;
    description: string;
    gradientClassName: string;
    icon: ReactNode;
};

/**
 * Service offering with icon
 * @property title - Service name
 * @property description - Brief explanation of the service
 * @property icon - React SVG icon component
 */
export type ServiceItem = {
    title: string;
    description: string;
    icon: ReactNode;
};

/**
 * Developer role/skill for hiring
 * @property title - Role name (e.g., "Hire .Net Developers")
 * @property description - Brief explanation of the role
 * @property icon - Path to the icon image
 * @property bgColor - Tailwind background color class
 */
export type Developer = {
    title: string;
    description: string;
    icon: string;
    bgColor: string;
};

/**
 * DevOps tool/technology item
 * @property name - Tool name
 * @property accentClassName - Optional Tailwind color class for branding
 * @property variant - Optional 'action' variant for CTA buttons
 * @property imageSrc - Optional path to tool logo
 * @property imageAlt - Optional accessibility text for logo
 */
export type DevOpsTool = {
    name: string;
    accentClassName?: string;
    variant?: 'action';
    imageSrc?: string;
    imageAlt?: string;
};

/**
 * DevOps category containing multiple tools
 * @property title - Category name
 * @property description - Brief explanation of category
 * @property tools - Array of tools in this category
 */
export type DevOpsCategory = {
    title: string;
    description: string;
    tools: DevOpsTool[];
};

/**
 * DevSecOps tool/technology item (security-focused)
 * Structure identical to DevOpsTool
 */
export type DevSecOpsTool = {
    name: string;
    accentClassName?: string;
    variant?: 'action';
    imageSrc?: string;
    imageAlt?: string;
};

/**
 * DevSecOps category containing multiple security tools
 * Structure identical to the DevOpsCategory
 */
export type DevSecOpsCategory = {
    title: string;
    description: string;
    tools: DevSecOpsTool[];
};

/**
 * Industry/sector served
 * @property title - Industry name
 * @property iconWrapperClassName - Tailwind classes for icon background/colors
 * @property icon - React SVG icon component
 */
export type IndustryItem = {
    title: string;
    iconWrapperClassName: string;
    icon: ReactNode;
};

/**
 * Portfolio/project showcase item
 * @property title - Project title
 * @property description - Brief project description
 * @property image - Path to project image
 * @property alt - Accessibility text for image
 */
export type WorkItem = {
    title: string;
    description: string;
    image: string;
    alt: string;
};

/**
 * Contact information item with icon
 * @property label - Contact detail (phone, email, address)
 * @property icon - React SVG icon component
 */
export type ContactItem = {
    label: string;
    icon: ReactNode;
};

/**
 * Client testimonial/review
 * @property id - Unique identifier for carousel navigation
 * @property title - Company or project name
 * @property name - Client name
 * @property role - Client's position/title
 * @property avatar - URL to client profile image
 * @property quote - Testimonial text
 */
export type TestimonialItem = {
    id: number;
    title: string;
    name: string;
    role: string;
    avatar: string;
    quote: string;
};

/**
 * Portfolio item for featured, the latest blog, or popular projects
 * @property category - Category or status (e.g., "Featured", "Latest")
 * @property readTime - Time to read (e.g., "6 MIN READ")
 * @property title - Project/Blog title
 * @property date - Published date
 * @property description - Brief description
 * @property image - Path to image
 * @property href - Link to full project/blog
 */
export type PortfolioItem = {
    category: string;
    readTime?: string;
    title: string;
    date: string;
    description: string;
    image: string;
    href: string;
};

/**
 * Footer navigation group
 * @property title - Section heading
 * @property items - Array of link labels within this group
 */
export type FooterGroup = {
    title: string;
    items: string[];
};

/**
 * Service detail item with icon or image
 * @property title - Item name
 * @property icon - Optional React SVG icon component
 * @property imageSrc - Optional path to icon/logo image
 * @property colorClassName - Optional Tailwind text color class for the icon
 * @property bgClassName - Optional Tailwind background color class for the icon wrapper
 */
export type ServiceDetailItem = {
    title: string;
    icon?: ReactNode;
    imageSrc?: string;
    colorClassName?: string;
    bgClassName?: string;
};

/**
 * Service category section data
 * @property id - Unique section ID for navigation
 * @property title - Section heading
 * @property description - Section summary
 * @property items - Array of service detail items
 */
export type ServiceCategoryData = {
    id: string;
    title: string;
    eyebrow?: string;
    description?: string;
    items: ServiceDetailItem[];
};

// ============================================
// DATA EXPORTS
// ============================================
// Actual data instances used by components throughout the landing page

/**
 * Main navigation links
 * Used in: Header component
 * Flow: Header.tsx imports this → maps over an array → renders nav items
 * Note: Items with 'children' array render as dropdown menus
 */
export const navLinks: NavLink[] = [
    {
        label: 'About us', href: '/about',
        children: [
            {label: 'Our Approach', href: '/our-approach'},
            {label: 'Industry We Serve             ', href: '/industry-we-serve'},
            {label: 'Design and development Process', href: '/design-and-development'},
            {label: 'Hire Us', href: '/hire-us'},
        ],
    },
    {
        label: 'Services',
        href: '/services'
    },
    {label: 'Portfolio', href: '/portfolio'},
    {label: 'Blog', href: '/blog'},
    {label: 'Career', href: '/career'},
];

/**
 * Service Page Content Sections
 */
export const softwareDesignServices: ServiceCategoryData = {
    id: 'software-design',
    title: 'Software Designing and Development Services',
    eyebrow: 'DEVELOPMENT',
    description: 'Empirical Edge Inc. assists businesses in expansion through the development of custom websites, software, and mobile apps designed to scale alongside the business and function seamlessly across all devices.',
    items: [
        {
            title: '.NET Development',
            imageSrc: '/logicmatrix/services/software-design-development/dotnet.svg',
            bgClassName: 'bg-sky-600',
            colorClassName: 'text-white'
        },
        {
            title: 'PHP Development',
            imageSrc: '/logicmatrix/services/software-design-development/php.svg',
            bgClassName: 'bg-[#777BB4]',
            colorClassName: 'text-white'
        },
        {
            title: 'Java Development',
            imageSrc: '/logicmatrix/services/software-design-development/java.svg',
            bgClassName: 'bg-[#E76F00]',
            colorClassName: 'text-white'
        },
        {
            title: 'Python Development',
            imageSrc: '/logicmatrix/services/software-design-development/python.svg',
            bgClassName: 'bg-[#3776AB]',
            colorClassName: 'text-white'
        },
        {
            title: 'Angular Development',
            imageSrc: '/logicmatrix/services/software-design-development/angular.svg',
            bgClassName: 'bg-[#DD0031]',
            colorClassName: 'text-white'
        },
        {
            title: 'Nodejs Development',
            imageSrc: '/logicmatrix/services/software-design-development/js.svg',
            bgClassName: 'bg-[#339933]',
            colorClassName: 'text-white'
        },
        {
            title: 'React Native Development',
            imageSrc: '/logicmatrix/services/software-design-development/react.svg',
            bgClassName: 'bg-[#61DAFB]',
            colorClassName: 'text-white'
        },
    ]
};

export const databaseDevelopmentServices: ServiceCategoryData = {
    id: 'database-development',
    title: 'Database Development and Management Services',
    eyebrow: 'DATABASE',
    description: 'Empirical Edge Inc. offers comprehensive database management solutions encompassing development, administration, monitoring, replication, and backup services.',
    items: [
        {
            title: 'Microsoft SQL Server Services',
            imageSrc: '/logicmatrix/services/database/mysql-server.svg',
            bgClassName: 'bg-[#CC2927]'
        },
        {
            title: 'MySQL Services',
            imageSrc: '/logicmatrix/services/database/mysql-service.svg',
            bgClassName: 'bg-[#4479A1]'
        },
        {
            title: 'Oracle Database Development',
            imageSrc: '/logicmatrix/services/database/oracle.svg',
            bgClassName: 'bg-[#F80000]'
        },
        {
            title: 'Crystal Reports Development',
            imageSrc: '/logicmatrix/services/database/crystal.svg',
            bgClassName: 'bg-[#0072C6]'
        },
        {
            title: 'MongoDB Database',
            imageSrc: '/logicmatrix/services/database/mongodb.svg',
            bgClassName: 'bg-[#47A248]'
        },
        {
            title: 'Database Administration',
            imageSrc: '/logicmatrix/services/database/database.svg',
            bgClassName: 'bg-[#91219E]'
        },
        {
            title: 'Database Backup Services',
            imageSrc: '/logicmatrix/services/database/database-backup.svg',
            bgClassName: 'bg-[#F29111]'
        },
        {
            title: 'Database Management Services',
            imageSrc: '/logicmatrix/services/database/database-management.svg',
            bgClassName: 'bg-[#00758F]'
        },
        {
            title: 'Database Replication',
            imageSrc: '/logicmatrix/services/database/database-replication.svg',
            bgClassName: 'bg-[#00758F]'
        },
        {
            title: 'Database Migration Services',
            imageSrc: '/logicmatrix/services/database/database-migration.svg',
            bgClassName: 'bg-[#91219E]'
        },
        {
            title: 'Master Data Management',
            imageSrc: '/logicmatrix/services/database/master-data.svg',
            bgClassName: 'bg-[#CC2927]'
        },
        {
            title: 'Reporting Services',
            imageSrc: '/logicmatrix/services/database/reporting-service.svg',
            bgClassName: 'bg-[#4479A1]'
        },
    ]
};

export const ecommerceDevelopmentServices: ServiceCategoryData = {
    id: 'ecommerce-development',
    title: 'eCommerce Development Services',
    description: 'We specialize in designing and developing online shopping websites capable of handling high traffic and delivering a seamless user experience.',
    items: [
        {
            title: 'WooCommerce Development',
            imageSrc: '/logicmatrix/services/ecommerce/woo-commerce.svg',
            bgClassName: 'bg-[#96588A]'
        },
        {
            title: 'Shopify Development',
            imageSrc: '/logicmatrix/services/ecommerce/shopify.svg',
            bgClassName: 'bg-[#95BF47]'
        },
        {
            title: 'Magento Development',
            imageSrc: '/logicmatrix/services/ecommerce/magento.svg',
            bgClassName: 'bg-[#F46F25]'
        },
        {
            title: 'nopCommerce Development',
            imageSrc: '/logicmatrix/services/ecommerce/nopcommerce.svg',
            bgClassName: 'bg-[#22A7F0]'
        },
        {
            title: 'AbleCommerce Development',
            imageSrc: '/logicmatrix/services/ecommerce/ablecommerce.svg',
            bgClassName: 'bg-[#555E7B]'
        },
        {
            title: 'PrestaShop Development',
            imageSrc: '/logicmatrix/services/ecommerce/prestashop.svg',
            bgClassName: 'bg-[#DF0067]'
        },
        {
            title: 'BigCommerce Development',
            imageSrc: '/logicmatrix/services/ecommerce/bigcommerce.svg',
            bgClassName: 'bg-[#333333]'
        },
        {
            title: 'OpenCart Development',
            imageSrc: '/logicmatrix/services/ecommerce/opencart.svg',
            bgClassName: 'bg-[#24A1DE]'
        },
        {
            title: 'X-Cart Development',
            imageSrc: '/logicmatrix/services/ecommerce/x-cart.svg',
            bgClassName: 'bg-[#F29111]'
        },
        {
            title: 'OsCommerce Development',
            imageSrc: '/logicmatrix/services/ecommerce/oscommerce.svg',
            bgClassName: 'bg-[#4B8411]'
        },
        {
            title: 'Asp .Net Storefront Development',
            imageSrc: '/logicmatrix/services/ecommerce/aspnet.svg',
            bgClassName: 'bg-[#004A99]'
        },
        {
            title: 'Zen Cart Development',
            imageSrc: '/logicmatrix/services/ecommerce/zen-cart.svg',
            bgClassName: 'bg-[#F29111]'
        },
    ]
};

export const mobileAppServices: ServiceCategoryData = {
    id: 'mobile-app',
    title: 'Mobile App Development Services',
    description: 'Our team is equipped to support every stage of custom mobile app development, from creating a basic version to a fully functional application.',
    items: [
        {
            title: 'React Native App Development',
            imageSrc: '/logicmatrix/services/mobile-apps/react-native.svg',
            bgClassName: 'bg-[#61DAFB]'
        },
        {
            title: 'iOS App Development',
            imageSrc: '/logicmatrix/services/mobile-apps/ios.svg',
            bgClassName: 'bg-[#000000]'
        },
        {
            title: 'Android App Development',
            imageSrc: '/logicmatrix/services/mobile-apps/android.svg',
            bgClassName: 'bg-[#A4C639]'
        },
        {
            title: 'Windows App Development',
            imageSrc: '/logicmatrix/services/mobile-apps/windows.svg',
            bgClassName: 'bg-[#0078D7]'
        },
        {
            title: 'Hybrid App Development',
            imageSrc: '/logicmatrix/services/mobile-apps/hybrid-app.svg',
            bgClassName: 'bg-[#24A1DE]'
        },
        {
            title: 'PrestaShop Development',
            imageSrc: '/logicmatrix/services/mobile-apps/prestashop.svg',
            bgClassName: 'bg-[#F46F25]'
        },
        {
            title: 'Cross Platform App Development',
            imageSrc: '/logicmatrix/services/mobile-apps/cross-platform.svg',
            bgClassName: 'bg-[#213342]'
        },
    ]
};

export const techExpertiseServices: ServiceCategoryData = {
    id: 'tech-expertise',
    title: 'Software Technologies Expertise',
    description: 'We specialize in designing and developing online shopping websites capable of handling high traffic and delivering a seamless user experience.',
    items: [
        {
            title: '.NET Core Development',
            imageSrc: '/logicmatrix/services/software-technologies/net-core.svg',
            bgClassName: 'bg-[#512BD4]'
        },
        {
            title: 'ASP.NET',
            imageSrc: '/logicmatrix/services/software-technologies/aspnet.svg',
            bgClassName: 'bg-[#0078D7]'
        },
        {
            title: 'Classic ASP Development',
            imageSrc: '/logicmatrix/services/software-technologies/classic-asp.svg',
            bgClassName: 'bg-[#00897B]'
        },
        {
            title: 'React JS',
            imageSrc: '/logicmatrix/services/software-technologies/react-js.svg',
            bgClassName: 'bg-[#20232A]'
        },
        {
            title: 'VueJS Development',
            imageSrc: '/logicmatrix/services/software-technologies/vuejs.svg',
            bgClassName: 'bg-[#4FC08D]'
        },
        {
            title: 'WCF Development',
            imageSrc: '/logicmatrix/services/software-technologies/wcf.svg',
            bgClassName: 'bg-[#9B9B9B]'
        },
        {
            title: 'VB.NET Development',
            imageSrc: '/logicmatrix/services/software-technologies/vbnet.svg',
            bgClassName: 'bg-[#003399]'
        },
        {
            title: 'Ajax Development',
            imageSrc: '/logicmatrix/services/software-technologies/ajax.svg',
            bgClassName: 'bg-[#003366]'
        },
        {
            title: 'Laravel Development',
            imageSrc: '/logicmatrix/services/software-technologies/laravel.svg',
            bgClassName: 'bg-[#FF2D20]'
        },
        {
            title: 'Core PHP',
            imageSrc: '/logicmatrix/services/software-technologies/core-php.svg',
            bgClassName: 'bg-[#777BB4]'
        },
        {
            title: 'C# Application',
            imageSrc: '/logicmatrix/services/software-technologies/c-sharp-application.svg',
            bgClassName: 'bg-[#239120]'
        },
        {
            title: 'Smarty Development',
            imageSrc: '/logicmatrix/services/software-technologies/smarty.svg',
            bgClassName: 'bg-[#FFD43B]'
        },
        {
            title: 'Slim PHP',
            imageSrc: '/logicmatrix/services/software-technologies/slim-php.svg',
            bgClassName: 'bg-[#68A063]'
        },
        {
            title: 'Symfony Development',
            imageSrc: '/logicmatrix/services/software-technologies/symfony.svg',
            bgClassName: 'bg-[#000000]'
        },
        {
            title: 'Zend Development',
            imageSrc: '/logicmatrix/services/software-technologies/zend.svg',
            bgClassName: 'bg-[#68B030]'
        },
        {
            title: 'Yii Development',
            imageSrc: '/logicmatrix/services/software-technologies/yii.svg',
            bgClassName: 'bg-[#008DD1]'
        },
        {
            title: 'CakePHP Development',
            imageSrc: '/logicmatrix/services/software-technologies/cakephp.svg',
            bgClassName: 'bg-[#D33C43]'
        },
        {
            title: 'Codeigniter Development',
            imageSrc: '/logicmatrix/services/software-technologies/codeigniter.svg',
            bgClassName: 'bg-[#EE4323]'
        },
    ]
};

export const cmsDevelopmentServices: ServiceCategoryData = {
    id: 'cms-development',
    title: 'CMS Development Services',
    description: 'A Content Management System (CMS) is an essential tool for creating powerful websites. It simplifies web development with appealing designs, accessibility, real-time updates, and fresh content.',
    items: [
        {
            title: 'WordPress Development',
            imageSrc: '/logicmatrix/services/cms-developement/wordpress.svg',
            bgClassName: 'bg-[#21759B]'
        },
        {
            title: 'Drupal Development',
            imageSrc: '/logicmatrix/services/cms-developement/drupal.svg',
            bgClassName: 'bg-[#0077C0]'
        },
        {
            title: 'Joomla Development',
            imageSrc: '/logicmatrix/services/cms-developement/joomla.svg',
            bgClassName: 'bg-[#F44336]'
        },
        {
            title: 'Kentico Development',
            imageSrc: '/logicmatrix/services/cms-developement/kentico.svg',
            bgClassName: 'bg-[#F05A28]'
        },
        {
            title: 'DNN Development',
            imageSrc: '/logicmatrix/services/cms-developement/dnn-development.svg',
            bgClassName: 'bg-[#0072C6]'
        },
        {
            title: 'Ubounce Development',
            imageSrc: '/logicmatrix/services/cms-developement/ubounce-development.svg',
            bgClassName: 'bg-[#0096D6]'
        },
    ]
};

export const systemIntegrationServices: ServiceCategoryData = {
    id: 'system-integration',
    title: 'System Integration Services',
    description: 'We facilitate scalable architecture integration and seamless migration of data, including cloud-based data, from one database to another, offering the following services:',
    items: [
        {
            title: 'ERP integration',
            imageSrc: '/logicmatrix/services/system-integration/erp-integration.svg',
            bgClassName: 'bg-[#0072C6]'
        },
        {
            title: 'Custom Workflow Development',
            imageSrc: '/logicmatrix/services/system-integration/custom-workflow.svg',
            bgClassName: 'bg-[#91219E]'
        },
        {
            title: 'Office 365 Development',
            imageSrc: '/logicmatrix/services/system-integration/office-365.svg',
            bgClassName: 'bg-[#2B579A]'
        },
        {
            title: 'SharePoint Development',
            imageSrc: '/logicmatrix/services/system-integration/sharepoint.svg',
            bgClassName: 'bg-[#91219E]'
        },
        {
            title: 'System Reporting',
            imageSrc: '/logicmatrix/services/system-integration/system-reporting.svg',
            bgClassName: 'bg-[#D14F21]'
        },
    ]
};

export const crmDevelopmentServices: ServiceCategoryData = {
    id: 'crm-development',
    title: 'CRM Development Services',
    description: 'With extensive experience in CRM development, Empirical Edge Inc., enhances business connections and customer relationships through tailored database software solutions.',
    items: [
        {
            title: 'HubSpot Development',
            imageSrc: '/logicmatrix/services/crm-development/hubspot.svg',
            bgClassName: 'bg-[#FF7A59]'
        },
        {
            title: 'Salesforce Development',
            imageSrc: '/logicmatrix/services/crm-development/salesforce.svg',
            bgClassName: 'bg-[#00A1E0]'
        },
        {
            title: 'SugarCRM Development',
            imageSrc: '/logicmatrix/services/crm-development/sugarcrm.svg',
            bgClassName: 'bg-[#333333]'
        },
        {
            title: 'Vtiger CRM Development',
            imageSrc: '/logicmatrix/services/crm-development/vtiger-crm.svg',
            bgClassName: 'bg-[#4479A1]'
        },
    ]
};

export const uiuxDesignServices: ServiceCategoryData = {
    id: 'uiux-design',
    title: 'UI/UX Designing Services',
    description: 'At Empirical Edge Inc., we offer innovative UI and UX design services aimed at rapidly creating exceptional products. Our dedicated design team conducts.',
    items: [
        {title: 'Logo Design', imageSrc: '/logicmatrix/services/ui-ux/logo.svg', bgClassName: 'bg-[#D14F8E]'},
        {title: 'Banner Design', imageSrc: '/logicmatrix/services/ui-ux/banner.svg', bgClassName: 'bg-[#D14F21]'},
        {title: 'Wireframe Design', imageSrc: '/logicmatrix/services/ui-ux/wireframe.svg', bgClassName: 'bg-[#0072C6]'},
        {title: 'Layout Design', imageSrc: '/logicmatrix/services/ui-ux/layout.svg', bgClassName: 'bg-[#A6A600]'},
    ]
};

export const seoServices: ServiceCategoryData = {
    id: 'seo-services',
    title: 'Search Engine Optimization Services',
    description: 'Empirical Edge Inc. excels at enhancing website search engine rankings and increasing traffic. With our technical expertise and skilled writers, we effectively promote complex websites in competitive industries.',
    items: [
        {title: 'On-Page SEO', imageSrc: '/logicmatrix/services/seo/on-page-seo.svg', bgClassName: 'bg-[#23337B]'},
        {title: 'Technical SEO', imageSrc: '/logicmatrix/services/seo/technical-seo.svg', bgClassName: 'bg-[#D14F21]'},
        {
            title: 'Off-Page SEO & Link Building',
            imageSrc: '/logicmatrix/services/seo/off-page-seo-&.svg',
            bgClassName: 'bg-[#0072C6]'
        },
        {title: 'Local SEO', imageSrc: '/logicmatrix/services/seo/local-seo.svg', bgClassName: 'bg-[#4B8411]'},
        {
            title: 'SEO Audit & Strategy',
            imageSrc: '/logicmatrix/services/seo/seo-audit-&.svg',
            bgClassName: 'bg-[#0072C6]'
        },
    ]
};

export const cloudServicesData: ServiceCategoryData = {
    id: 'cloud-services',
    title: 'Cloud Services',
    description: 'At Empirical Edge, we offer complete, end-to-end cloud services to help businesses scale, optimize, and secure their IT environments.',
    items: [
        {
            title: 'Google Cloud Services',
            imageSrc: '/logicmatrix/services/cloud-service/rectangle-3414.svg',
            bgClassName: 'bg-[#333333]'
        },
        {title: 'Azure', imageSrc: '/logicmatrix/services/cloud-service/azure.svg', bgClassName: 'bg-[#00BCF2]'},
        {title: 'AWS', imageSrc: '/logicmatrix/services/cloud-service/aws.svg', bgClassName: 'bg-[#FF9900]'},
        {
            title: 'Oracle Cloud',
            imageSrc: '/logicmatrix/services/cloud-service/oracle-cloud.svg',
            bgClassName: 'bg-[#F80000]'
        },
    ]
};

export const aiMlServices: ServiceCategoryData = {
    id: 'aiml-services',
    title: 'AI & Machine Learning',
    description: 'At Empirical Edge, we provide scalable AI competence that empowers enterprises to take action based on data-deploying adaptable AI systems and frictionless experiences that continually evolve based on you.',
    items: [
        {title: 'AI Services', imageSrc: '/logicmatrix/services/ai-ml/al-services.svg', bgClassName: 'bg-[#91219E]'},
        {title: 'Azure AI', imageSrc: '/logicmatrix/services/ai-ml/azure-al.svg', bgClassName: 'bg-[#333333]'},
        {
            title: 'AI/ML Solutions',
            imageSrc: '/logicmatrix/services/ai-ml/ai_ml-solutions.svg',
            bgClassName: 'bg-[#91219E]'
        },
    ]
};

/**
 * Company statistics/achievements
 * Used in: Stats or Hero component
 * Flow: Component imports → maps over an array → displays counters
 */
export const stats: StatItem[] = [
    {value: '9+', label: 'Years Experience'},
    {value: '483', label: 'Happy Client'},
    {value: '150+', label: 'Project Finished'},
];

/**
 * Partner/client brand logos
 * Used in: BrandLogos or Partners component
 * Flow: Component imports → maps over array → renders logo images
 */
export const brandLogos: BrandLogo[] = [
    {src: '/logicmatrix/brand/sap.svg', alt: 'SAP logo'},
    {src: '/logicmatrix/brand/aws.svg', alt: 'AWS logo'},
    {src: '/logicmatrix/brand/oracle.svg', alt: 'Oracle logo'},
    {src: '/logicmatrix/brand/solarwinds.svg', alt: 'SolarWinds logo'},
    {src: '/logicmatrix/brand/siemens.svg', alt: 'Siemens logo'},
    {src: '/logicmatrix/brand/medium.svg', alt: 'Medium logo'},
    {src: '/logicmatrix/brand/accenture.svg', alt: 'Accenture logo'},
    {src: '/logicmatrix/brand/deutsche_bahn.svg', alt: 'Deutsche Bahn logo'},
    {src: '/logicmatrix/brand/okta.svg', alt: 'Okta logo'},
    {src: '/logicmatrix/brand/toast.svg', alt: 'Toast logo'},
    {src: '/logicmatrix/brand/blackanddecker.svg', alt: 'Stanley Black & Decker logo'},
    {src: '/logicmatrix/brand/azure.svg', alt: 'Microsoft Azure logo'},
    {src: '/logicmatrix/brand/alaska.svg', alt: 'Alaska Airlines logo'},
    {src: '/logicmatrix/brand/google-cloud.svg', alt: 'Google Cloud logo'},
];

/**
 * Three-step process workflow
 * Used in: Process or HowWeWork component
 * Flow: Component imports → maps over array → renders step cards with gradients and icons
 */
export const processSteps: ProcessStep[] = [
    {
        title: 'Create Business',
        subtitle: 'Communicate / Connect / Convert',
        description:
            'We start with discovery and collaboration to understand your challenges, align on goals, and translate requirements into a clear strategy that guides every decision.',
        gradientClassName: 'from-sky-500 via-primary to-indigo-700 shadow-primary/30',
        icon: (
            <svg className='h-24 w-24 text-white/90' viewBox='0 0 120 120' fill='none' stroke='currentColor'
                 strokeWidth='2' aria-hidden='true'>
                <rect x='12' y='18' width='96' height='64' rx='10'/>
                <path d='M26 88h68'/>
                <path d='M34 38h52'/>
                <path d='M34 52h32'/>
                <path d='M72 52h14'/>
            </svg>
        ),
    },
    {
        title: 'Rapid Delivery',
        subtitle: 'Define / Design / Develop',
        description:
            'We iterate quickly with clear milestones, weekly demos, and tight feedback loops so you always know what is shipping next and why it matters.',
        gradientClassName: 'from-teal-400 via-cyan-500 to-primary shadow-cyan-500/30',
        icon: (
            <svg className='h-24 w-24 text-white/90' viewBox='0 0 120 120' fill='none' stroke='currentColor'
                 strokeWidth='2' aria-hidden='true'>
                <circle cx='60' cy='60' r='32'/>
                <path d='M28 60h64'/>
                <path d='M60 28v64'/>
                <path d='M45 45h30v30H45z'/>
            </svg>
        ),
    },
    {
        title: 'Earn Respect',
        subtitle: 'On Time / On Target / On Budget',
        description:
            'We ship with confidence, monitor outcomes, and optimize performance so your investment delivers measurable results and long-term trust.',
        gradientClassName: 'from-indigo-500 via-purple-600 to-fuchsia-600 shadow-purple-500/30',
        icon: (
            <svg className='h-24 w-24 text-white/90' viewBox='0 0 120 120' fill='none' stroke='currentColor'
                 strokeWidth='2' aria-hidden='true'>
                <path d='M20 86h80'/>
                <path d='M30 86V44l30-18 30 18v42'/>
                <path d='M46 64h28'/>
                <path d='M46 72h18'/>
            </svg>
        ),
    },
];

/**
 * Service offerings list
 * Used in: Services component
 * Flow: Component imports → maps over array → renders service cards with icons
 */
export const services: ServiceItem[] = [
    {
        title: 'Software Designing and Development',
        description:
            'End-to-end product engineering with modern stacks, secure architectures, and long-term scalability.',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <rect x='3' y='4' width='18' height='14' rx='2'/>
                <path d='M8 20h8'/>
                <path d='M9 8h6'/>
                <path d='M9 12h6'/>
            </svg>
        ),
    },
    {
        title: 'System Integration and Designing',
        description:
            'Seamlessly connect tools, data, and workflows to create a single, reliable operational backbone.',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M5 3h14v6H5z'/>
                <path d='M9 17h6v4H9z'/>
                <path d='M12 9v8'/>
                <path d='M5 9h14'/>
            </svg>
        ),
    },
    {
        title: 'Content Management System',
        description:
            'Flexible CMS solutions that keep teams publishing faster and content governance effortless.',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M4 5h16v4H4z'/>
                <path d='M4 11h16v8H4z'/>
                <path d='M8 15h4'/>
            </svg>
        ),
    },
    {
        title: 'eCommerce Development',
        description:
            'Revenue-ready storefronts, secure payments, and personalized buyer journeys that convert.',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M5 4h14v6H5z'/>
                <path d='M7 10v10h10V10'/>
                <path d='M9 14h6'/>
                <path d='M9 17h4'/>
            </svg>
        ),
    },
    {
        title: 'Mobile App Development',
        description:
            'Native and cross-platform apps crafted for performance, retention, and delightful user experiences.',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <rect x='7' y='3' width='10' height='18' rx='2'/>
                <path d='M11 6h2'/>
                <path d='M9 10h6'/>
                <path d='M9 14h4'/>
            </svg>
        ),
    },
    {
        title: 'Search Engine Optimization',
        description:
            'Data-driven SEO that increases visibility, organic traffic, and long-term growth.',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <circle cx='10' cy='10' r='5'/>
                <path d='M14 14l6 6'/>
                <path d='M10 7v6'/>
                <path d='M7 10h6'/>
            </svg>
        ),
    },
    {
        title: 'UI/UX Designing',
        description:
            'Human-centered design systems that turn complex requirements into elegant, usable products.',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M4 6h16v10H4z'/>
                <path d='M8 20h8'/>
                <path d='M9 10h6'/>
                <path d='M9 13h4'/>
            </svg>
        ),
    },
    {
        title: 'Database Development and Management',
        description:
            'Reliable data platforms with high availability, performance tuning, and structured governance.',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <ellipse cx='12' cy='6' rx='6.5' ry='3'/>
                <path d='M5.5 6v6c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3V6'/>
                <path d='M5.5 12v6c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-6'/>
            </svg>
        ),
    },
];

/**
 * DevOps tools organized by category
 * Used in: DevOps or Technologies component
 * Flow: Component imports → maps over categories → maps over tools → renders tool cards
 * Note: Tools with variant='action' render as CTA buttons (e.g., "Explore")
 */
export const devOpsCategories: DevOpsCategory[] = [
    {
        title: 'Cloud Platforms',
        description: 'Wide range of personalized solutions to cater to your specific goals.',
        tools: [
            {
                name: 'AWS',
                accentClassName: 'text-slate-700',
                imageSrc: '/assets/images/devops/cloud-platforms/amazon_web_services_logo.svg',
                imageAlt: 'AWS logo',
            },
            {
                name: 'Azure',
                accentClassName: 'text-sky-600',
                imageSrc: '/assets/images/devops/cloud-platforms/azure.png',
                imageAlt: 'Azure logo',
            },
            {
                name: 'Google Cloud',
                accentClassName: 'text-amber-600',
                imageSrc: '/assets/images/devops/cloud-platforms/gcp.png',
                imageAlt: 'Google Cloud logo',
            },
            {name: 'Explore', variant: 'action'},
        ],
    },
    {
        title: 'Containerization & Orchestration',
        description: 'Wide range of personalized solutions to cater to your specific goals.',
        tools: [
            {
                name: 'Docker',
                accentClassName: 'text-sky-500',
                imageSrc: '/assets/images/devops/containerization-orchestration/docker.png',
                imageAlt: 'Docker logo',
            },
            {
                name: 'Kubernetes',
                accentClassName: 'text-primary',
                imageSrc: '/assets/images/devops/containerization-orchestration/kubernetes.png',
                imageAlt: 'Kubernetes logo',
            },
            {
                name: 'Podman',
                accentClassName: 'text-violet-600',
                imageSrc: '/assets/images/devops/containerization-orchestration/podman.png',
                imageAlt: 'Podman logo',
            },
            {name: 'Explore', variant: 'action'},
        ],
    },
    {
        title: 'CI/CD & Automation',
        description: 'Wide range of personalized solutions to cater to your specific goals.',
        tools: [
            {
                name: 'GitHub',
                accentClassName: 'text-slate-800',
                imageSrc: '/assets/images/devops/cicd-automation/github.png',
                imageAlt: 'GitHub logo',
            },
            {
                name: 'GitLab',
                accentClassName: 'text-orange-500',
                imageSrc: '/assets/images/devops/cicd-automation/gitlab.png',
                imageAlt: 'GitLab logo',
            },
            {
                name: 'Jenkins',
                accentClassName: 'text-red-500',
                imageSrc: '/assets/images/devops/cicd-automation/jenkins.png',
                imageAlt: 'Jenkins logo',
            },
            {name: 'Explore', variant: 'action'},
        ],
    },
    {
        title: 'Infrastructure as Code',
        description: 'Wide range of personalized solutions to cater to your specific goals.',
        tools: [
            {
                name: 'Terraform',
                accentClassName: 'text-indigo-600',
                imageSrc: '/assets/images/devops/infrastructure-as-code/teraform.png',
                imageAlt: 'Terraform logo',
            },
            {
                name: 'Ansible',
                accentClassName: 'text-slate-800',
                imageSrc: '/assets/images/devops/infrastructure-as-code/ansible.png',
                imageAlt: 'Ansible logo',
            },
            {
                name: 'Pulumi',
                accentClassName: 'text-fuchsia-600',
                imageSrc: '/assets/images/devops/infrastructure-as-code/pulumi.png',
                imageAlt: 'Pulumi logo',
            },
            {name: 'Explore', variant: 'action'},
        ],
    },
    {
        title: 'Monitoring & Logging',
        description: 'Wide range of personalized solutions to cater to your specific goals.',
        tools: [
            {
                name: 'Prometheus',
                accentClassName: 'text-orange-500',
                imageSrc: '/assets/images/devops/monitoring-logging/promethouse.png',
                imageAlt: 'Prometheus logo',
            },
            {
                name: 'Grafana',
                accentClassName: 'text-amber-600',
                imageSrc: '/assets/images/devops/monitoring-logging/grafana.png',
                imageAlt: 'Grafana logo',
            },
            {
                name: 'New Relic',
                accentClassName: 'text-emerald-600',
                imageSrc: '/assets/images/devops/monitoring-logging/new-relic.png',
                imageAlt: 'New Relic logo',
            },
            {name: 'Explore', variant: 'action'},
        ],
    },
];

/**
 * DevSecOps security tools organized by category
 * Used in: DevSecOps or Security component
 * Flow: Component imports → maps over categories → maps over tools → renders security tool cards
 * Note: Similar structure to devOpsCategories but focused on security tooling
 */
export const devSecOpsCategories: DevSecOpsCategory[] = [
    {
        title: 'Code Quality & SAST',
        description: 'Wide range of personalized solutions to cater to your specific goals.',
        tools: [
            {
                name: 'SonarQube',
                accentClassName: 'text-slate-800',
                imageSrc: '/assets/images/devsecops/code-quality-sast/sonar.png',
                imageAlt: 'SonarQube logo',
            },
            {
                name: 'Semgrep',
                accentClassName: 'text-emerald-500',
                imageSrc: '/assets/images/devsecops/code-quality-sast/sem.png',
                imageAlt: 'Semgrep logo',
            },
            {name: 'Explore', variant: 'action'},
        ],
    },
    {
        title: 'Vulnerability Scanning',
        description: 'Wide range of personalized solutions to cater to your specific goals.',
        tools: [
            {
                name: 'Trivy',
                accentClassName: 'text-sky-600',
                imageSrc: '/assets/images/devsecops/vulnerability-scanning/trivy.png',
                imageAlt: 'Trivy logo',
            },
            {
                name: 'Snyk',
                accentClassName: 'text-indigo-600',
                imageSrc: '/assets/images/devsecops/vulnerability-scanning/snyk.png',
                imageAlt: 'Snyk logo',
            },
            {name: 'Explore', variant: 'action'},
        ],
    },
    {
        title: 'Secrets Management',
        description: 'Wide range of personalized solutions to cater to your specific goals.',
        tools: [
            {
                name: 'AWS Secrets Manager',
                accentClassName: 'text-orange-500',
                imageSrc: '/assets/images/devsecops/secrets-management/aws-secret-manager.png',
                imageAlt: 'AWS Secrets Manager logo',
            },
            {
                name: 'Azure Key Vault',
                accentClassName: 'text-sky-600',
                imageSrc: '/assets/images/devsecops/secrets-management/azure-key.png',
                imageAlt: 'Azure Key Vault logo',
            },
            {name: 'Explore', variant: 'action'},
        ],
    },
    {
        title: 'Container & Runtime Security',
        description: 'Wide range of personalized solutions to cater to your specific goals.',
        tools: [
            {
                name: 'Aqua',
                accentClassName: 'text-primary',
                imageSrc: '/assets/images/devsecops/container-runtime-security/aqua.png',
                imageAlt: 'Aqua Security logo',
            },
            {
                name: 'Falco',
                accentClassName: 'text-cyan-600',
                imageSrc: '/assets/images/devsecops/container-runtime-security/fatco.png',
                imageAlt: 'Falco logo',
            },
            {name: 'Explore', variant: 'action'},
        ],
    },
    {
        title: 'Compliance & Policy',
        description: 'Wide range of personalized solutions to cater to your specific goals.',
        tools: [
            {
                name: 'Open Policy Agent',
                accentClassName: 'text-slate-700',
                imageSrc: '/assets/images/devsecops/compliance-policy/open-policy.png',
                imageAlt: 'Open Policy Agent logo',
            },
            {
                name: 'Kyverno',
                accentClassName: 'text-orange-500',
                imageSrc: '/assets/images/devsecops/compliance-policy/vector.png',
                imageAlt: 'Kyverno logo',
            },
            {name: 'Explore', variant: 'action'},
        ],
    },
];

/**
 * Industries/sectors served
 * Used in: Industries or WhoWeServe component
 * Flow: Component imports → maps over array → renders industry cards with colored icons
 * Note: iconWrapperClassName provides unique color scheme for each industry
 */
export const industries: IndustryItem[] = [
    {
        title: 'Architectural',
        iconWrapperClassName: 'bg-amber-100 text-amber-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M3 20h18'/>
                <path d='M5 20V9l7-5 7 5v11'/>
                <path d='M9 20v-6h6v6'/>
            </svg>
        ),
    },
    {
        title: 'Automobile',
        iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M3 15h14l4-5H7z'/>
                <circle cx='7' cy='18' r='2'/>
                <circle cx='17' cy='18' r='2'/>
            </svg>
        ),
    },
    {
        title: 'Construction',
        iconWrapperClassName: 'bg-rose-100 text-rose-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M4 20h16'/>
                <path d='M6 20v-8l6-4 6 4v8'/>
                <path d='M10 12h4'/>
            </svg>
        ),
    },
    {
        title: 'Bank',
        iconWrapperClassName: 'bg-sky-100 text-sky-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <rect x='4' y='4' width='16' height='16' rx='2'/>
                <path d='M8 20V8'/>
                <path d='M12 20V8'/>
                <path d='M16 20V8'/>
            </svg>
        ),
    },
    {
        title: 'Restaurant',
        iconWrapperClassName: 'bg-lime-100 text-lime-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M4 5h16'/>
                <path d='M7 5l2 6'/>
                <path d='M17 5l-2 6'/>
                <path d='M6 13h12'/>
                <path d='M8 13v6'/>
                <path d='M16 13v6'/>
            </svg>
        ),
    },
    {
        title: 'eCommerce',
        iconWrapperClassName: 'bg-pink-100 text-pink-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <circle cx='9' cy='20' r='1'/>
                <circle cx='17' cy='20' r='1'/>
                <path d='M3 4h2l2 12h10l2-8H7'/>
            </svg>
        ),
    },
    {
        title: 'Engineering',
        iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <circle cx='12' cy='12' r='4'/>
                <path d='M12 2v3'/>
                <path d='M12 19v3'/>
                <path d='M4.9 4.9l2.1 2.1'/>
                <path d='M17 17l2.1 2.1'/>
                <path d='M2 12h3'/>
                <path d='M19 12h3'/>
                <path d='M4.9 19.1l2.1-2.1'/>
                <path d='M17 7l2.1-2.1'/>
            </svg>
        ),
    },
    {
        title: 'Financial Services',
        iconWrapperClassName: 'bg-sky-100 text-sky-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <circle cx='12' cy='8' r='4'/>
                <path d='M12 12v8'/>
                <path d='M8 16h8'/>
            </svg>
        ),
    },
    {
        title: 'Medical Services',
        iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M12 5v14'/>
                <path d='M5 12h14'/>
                <rect x='4' y='4' width='16' height='16' rx='3'/>
            </svg>
        ),
    },
    {
        title: 'Food & Drinks',
        iconWrapperClassName: 'bg-amber-100 text-amber-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M5 9h14'/>
                <path d='M7 9l2 10h6l2-10'/>
                <path d='M9 5h6'/>
            </svg>
        ),
    },
    {
        title: 'Non Profit',
        iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M12 21s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z'/>
            </svg>
        ),
    },
    {
        title: 'Health Care',
        iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M12 21s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z'/>
                <path d='M9 12h6'/>
            </svg>
        ),
    },
    {
        title: 'Insurance',
        iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M12 3l7 4v5c0 5-4 8-7 9-3-1-7-4-7-9V7l7-4z'/>
            </svg>
        ),
    },
    {
        title: 'Pharmaceutical',
        iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <rect x='6' y='3' width='12' height='18' rx='2'/>
                <path d='M9 7h6'/>
                <path d='M9 12h6'/>
            </svg>
        ),
    },
    {
        title: 'Legal',
        iconWrapperClassName: 'bg-sky-100 text-sky-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M6 19h12'/>
                <path d='M8 19l4-14 4 14'/>
                <path d='M9 12h6'/>
            </svg>
        ),
    },
    {
        title: 'Manufacturing',
        iconWrapperClassName: 'bg-sky-100 text-sky-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M3 20h18'/>
                <path d='M5 20V9h14v11'/>
                <path d='M8 9V6h8v3'/>
            </svg>
        ),
    },
    {
        title: 'Labor Management',
        iconWrapperClassName: 'bg-sky-100 text-sky-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <rect x='4' y='4' width='16' height='16' rx='2'/>
                <path d='M8 9h8'/>
                <path d='M8 13h5'/>
                <path d='M8 17h4'/>
            </svg>
        ),
    },
    {
        title: 'Education',
        iconWrapperClassName: 'bg-amber-100 text-amber-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M6 7h12'/>
                <path d='M8 7l4-3 4 3'/>
                <path d='M4 7h16v10H4z'/>
                <path d='M10 17h4'/>
            </svg>
        ),
    },
    {
        title: 'Marketing',
        iconWrapperClassName: 'bg-sky-100 text-sky-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M4 4h12v12H4z'/>
                <path d='M8 8h4'/>
                <path d='M20 8l-4 4 4 4'/>
            </svg>
        ),
    },
    {
        title: 'Logistics',
        iconWrapperClassName: 'bg-amber-100 text-amber-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M3 12h10'/>
                <path d='M13 12l4-4'/>
                <path d='M13 12l4 4'/>
                <circle cx='18.5' cy='8' r='1.5'/>
                <circle cx='18.5' cy='16' r='1.5'/>
            </svg>
        ),
    },
    {
        title: 'Travel',
        iconWrapperClassName: 'bg-amber-100 text-amber-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M3 12h8l10-6v12l-10-6H3z'/>
            </svg>
        ),
    },
    {
        title: 'Advisor',
        iconWrapperClassName: 'bg-sky-100 text-sky-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M4 6h16v12H4z'/>
                <path d='M8 10h8'/>
                <path d='M8 14h5'/>
            </svg>
        ),
    },
    {
        title: 'Technology',
        iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <rect x='6' y='6' width='12' height='12' rx='2'/>
                <path d='M9 9h6v6H9z'/>
                <path d='M6 12H3'/>
                <path d='M21 12h-3'/>
                <path d='M12 6V3'/>
                <path d='M12 21v-3'/>
            </svg>
        ),
    },
    {
        title: 'Data & Information',
        iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
        icon: (
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <ellipse cx='12' cy='6' rx='6.5' ry='3'/>
                <path d='M5.5 6v6c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3V6'/>
                <path d='M5.5 12v6c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-6'/>
            </svg>
        ),
    },
];

/**
 * Recent portfolio/project showcase
 * Used in: RecentWork or Portfolio component
 * Flow: Component imports → maps over an array → renders project cards with images
 */
export const recentWork: WorkItem[] = [
    {
        title: 'Experience and expertise',
        description: 'We possess in-depth knowledge of building codes',
        image: '/logicmatrix/recent-work-1.png',
        alt: 'Project dashboard interface',
    },
    {
        title: 'Professionalism',
        description: 'We are dedicated to professionalism and maintain',
        image: '/logicmatrix/recent-work-2.png',
        alt: 'Developer workspace illustration',
    },
    {
        title: 'Quality workmanship',
        description: 'We prioritize quality in every aspect of our works',
        image: '/logicmatrix/recent-work-3.png',
        alt: 'Engineering product preview',
    },
    {
        title: 'Commitment to customer',
        description: 'Your satisfaction is our top priority. We strive to build',
        image: '/logicmatrix/recent-work-4.png',
        alt: 'Workflow dashboard interface',
    },
];

/**
 * Contact information with icons
 * Used in: Contact or Footer component
 * Flow: Component imports → maps over array → displays contact methods with icons
 */
export const contactInfo: ContactItem[] = [
    {
        label: '+880 123456 86',
        icon: (
            <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path
                    d='M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 3.2 8.8 19.8 19.8 0 0 1 0 0.2 2 2 0 0 1 2 0h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L6 8.9a16 16 0 0 0 7.1 7.1l2.5-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 1.9z'/>
            </svg>
        ),
    },
    {
        label: 'support@logicmatrix.com',
        icon: (
            <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <rect x='3' y='5' width='18' height='14' rx='2'/>
                <path d='m3 7 9 6 9-6'/>
            </svg>
        ),
    },
    {
        label: 'Virginia, USA',
        icon: (
            <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'
                 strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0Z'/>
                <circle cx='12' cy='10' r='3'/>
            </svg>
        ),
    },
];

/**
 * Client testimonials/reviews
 * Used in: A testimonials component (likely with carousel/slider)
 * Flow: Component imports → maps over array → renders testimonial cards or slides
 * Note: Each testimonial has unique ID for carousel navigation
 */
export const testimonials: TestimonialItem[] = [
    {
        id: 1,
        title: 'House Tuly',
        name: 'Tairon Lainstar',
        role: 'Chef Officer, Sage',
        avatar: 'https://i.pravatar.cc/150?img=11',
        quote:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar dui et dignissim sagittis. Morbi in leo nisl. Etiam pulvinar justo neque, eu rutrum orci dictum nec.',
    },
    {
        id: 2,
        title: 'North',
        name: 'Jhon Snow',
        role: 'Chef Officer, Sage',
        avatar: 'https://i.pravatar.cc/150?img=8',
        quote:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar dui et dignissim sagittis. Morbi in leo nisl. Etiam pulvinar justo neque, eu rutrum orci dictum nec.',
    },
    {
        id: 3,
        title: 'NoOne',
        name: 'Ariya Stark',
        role: 'Chef Officer, Sage',
        avatar: 'https://i.pravatar.cc/150?img=47',
        quote:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar dui et dignissim sagittis. Morbi in leo nisl. Etiam pulvinar justo neque, eu rutrum orci dictum nec.',
    },
    {
        id: 4,
        title: 'The Reach',
        name: 'Margaery T.',
        role: 'Chef Officer, Sage',
        avatar: 'https://i.pravatar.cc/150?img=45',
        quote:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar dui et dignissim sagittis. Morbi in leo nisl. Etiam pulvinar justo neque, eu rutrum orci dictum nec.',
    },
    {
        id: 5,
        title: 'Lannister',
        name: 'Tyrion L.',
        role: 'Chef Officer, Sage',
        avatar: 'https://i.pravatar.cc/150?img=14',
        quote:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar dui et dignissim sagittis. Morbi in leo nisl. Etiam pulvinar justo neque, eu rutrum orci dictum nec.',
    },
    {
        id: 6,
        title: 'Baratheon',
        name: 'Robert B.',
        role: 'Chef Officer, Sage',
        avatar: 'https://i.pravatar.cc/150?img=3',
        quote:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar dui et dignissim sagittis. Morbi in leo nisl. Etiam pulvinar justo neque, eu rutrum orci dictum nec.',
    },
];

/**
 * Footer navigation groups
 * Used in: Footer component
 * Flow: Component imports → maps over groups → renders grouped footer links
 * Note: Each group represents a column in the footer navigation
 */
export const footerGroups: FooterGroup[] = [
    {
        title: 'Meet The Team',
        items: ['Testimonials', 'Vision & Mission', 'Company Profile'],
    },
    {
        title: 'Company',
        items: ['Board of directors', 'Our Project', 'Our Achievement', 'Activity'],
    },
    {
        title: 'More',
        items: ['About us', 'Contact', 'Career', 'News & Events', 'FAQs'],
    },
];

/**
 * Featured portfolio item
 */
export const featuredProject: PortfolioItem = {
    category: 'Featured',
    readTime: '6 MIN READ',
    title: 'Finding the Best B2B Contact Database for Better Cold Outreach',
    date: 'October 24, 2023',
    description: "With Arkatechture's help, Members First Credit Union will be using data to pinpoint products and services that will benefit their members most.",
    image: '/logicmatrix/recent-work-1.png',
    href: '#',
};

/**
 * Latest blog posts
 */
export const latestBlogs: PortfolioItem[] = [
    {
        category: 'Latest',
        readTime: '2 MIN READ',
        title: 'Finding the Best B2B',
        date: 'October 24, 2023',
        description: "With Arkatechture's help, Members First Credit Union will be using data to pinpoint products.",
        image: '/logicmatrix/recent-work-2.png',
        href: '#',
    },
    {
        category: 'Latest',
        readTime: '2 MIN READ',
        title: 'Finding the Best B2B',
        date: 'October 24, 2023',
        description: "With Arkatechture's help, Members First Credit Union will be using data to pinpoint products.",
        image: '/logicmatrix/recent-work-3.png',
        href: '#',
    },
];

/**
 * Most popular portfolio items
 */
export const popularProjects: PortfolioItem[] = [
    {
        category: 'Latest',
        readTime: '2 MIN READ',
        title: 'Members First Credit',
        date: '12.24.2023',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        image: '/logicmatrix/recent-work-4.png',
        href: '#',
    },
    {
        category: 'Latest',
        readTime: '2 MIN READ',
        title: 'Members First Credit',
        date: '12.24.2023',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        image: '/logicmatrix/recent-work-1.png',
        href: '#',
    },
    {
        category: 'Latest',
        readTime: '2 MIN READ',
        title: 'Members First Credit',
        date: '12.24.2023',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        image: '/logicmatrix/recent-work-2.png',
        href: '#',
    },
    {
        category: 'Latest',
        readTime: '2 MIN READ',
        title: 'Members First Credit',
        date: '12.24.2023',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        image: '/logicmatrix/recent-work-3.png',
        href: '#',
    },
    {
        category: 'Latest',
        readTime: '2 MIN READ',
        title: 'Members First Credit',
        date: '12.24.2023',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        image: '/logicmatrix/recent-work-4.png',
        href: '#',
    },
    {
        category: 'Latest',
        readTime: '2 MIN READ',
        title: 'Members First Credit',
        date: '12.24.2023',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
        image: '/logicmatrix/recent-work-1.png',
        href: '#',
    },
];

/**
 * Developers data for Hire Us page
 */
export const hireUsDevelopers: Developer[] = [
    {
        title: 'Hire .Net Developers',
        description: 'Unlock the potential of your projects by hiring our skilled .NET developers, who deliver robust and innovative software solutions with precision',
        icon: '/logicmatrix/tech/hire-net-developers.svg',
        bgColor: 'bg-indigo-50/50',
    },
    {
        title: 'Remote PHP Developers',
        description: 'Boost your online presence with remote PHP developers, leveraging their expertise to create dynamic and scalable web solutions.',
        icon: '/logicmatrix/tech/remote-php-developers.svg',
        bgColor: 'bg-green-50/50',
    },
    {
        title: 'Hire Mobile App Developers',
        description: 'Elevate your app to new heights with our mobile app developers (iOS, Android, React Native, Cross-platform) skilled at transforming dreams',
        icon: '/logicmatrix/tech/hire-mobile.svg',
        bgColor: 'bg-teal-50/50',
    },
    {
        title: 'Hire eCommerce Developers',
        description: 'Boost your sales with expert eCommerce developers. From storefronts to back-end systems, get customized solutions. Hire our offshore eCommerce experts today!',
        icon: '/logicmatrix/tech/hire-ecommerce-developers.svg',
        bgColor: 'bg-orange-50/50',
    },
    {
        title: 'Hire Android Developers',
        description: 'Turn your app concepts into reality with our top Android developers, ensuring exceptional quality and timely delivery of your mobile application',
        icon: '/logicmatrix/tech/hire-android.svg',
        bgColor: 'bg-blue-50/50',
    },
    {
        title: 'Hire Salesforce Programmer',
        description: 'Maximize your CRM potential with skilled Salesforce programmers. We specialize in custom integrations, advanced APEX development, lightning web components, and efficient',
        icon: '/logicmatrix/tech/hire-salesforce.svg',
        bgColor: 'bg-indigo-100/30',
    },
    {
        title: 'IOS Developers',
        description: 'Unlock unmatched web development expertise with our exceptional Node.js developers ready to serve you!',
        icon: '/logicmatrix/tech/ios-developers.svg',
        bgColor: 'bg-green-100/20',
    },
    {
        title: 'Hire Js Developers',
        description: 'Unlock the potential of your projects by hiring our skilled .NET developers, who deliver robust and innovative software solutions with precision',
        icon: '/logicmatrix/tech/hire-js-developers.svg',
        bgColor: 'bg-orange-100/30',
    },
    {
        title: 'Remote DevOps Engineer',
        description: 'Enhance your operations with experienced remote DevOps engineers who architect seamless workflows, streamline deployments, and optimize performance for your digital',
        icon: '/logicmatrix/tech/remote-devops-engineer.svg',
        bgColor: 'bg-green-50',
    },
    {
        title: 'Hire React Native Developers',
        description: 'Transform your global cross-platform application development. Engage React Native developers celebrated for their expertise in crafting high-performance',
        icon: '/logicmatrix/tech/hire-react-native.svg',
        bgColor: 'bg-red-50/50',
    },
    {
        title: 'Hire Angular Developer',
        description: 'Hire our offshore Angular developers recognized for their innovative approach and dedication to delivering excellence in every web project, leveraging JavaScript/TypeScript.',
        icon: '/logicmatrix/tech/hire-angular-developer.svg',
        bgColor: 'bg-red-100/30',
    },
    {
        title: 'Hire React JS Developers',
        description: 'Engage our React.js developers renowned for their expertise in JavaScript/TypeScript, crafting dynamic and engaging user interfaces with precision.',
        icon: '/logicmatrix/tech/hire-react-js-developers.svg',
        bgColor: 'bg-indigo-50',
    },
    {
        title: 'Hire UI UX Designer',
        description: 'Enhance your software/application\'s user experience with our skilled UI/UX designers. We create intuitive and visually appealing designs that boost user engagement and satisfaction.',
        icon: '/logicmatrix/tech/hire-ui-ux-designer.svg',
        bgColor: 'bg-pink-50',
    },
    {
        title: 'Hire Remote QA Engineer',
        description: 'Enhance your quality assurance and testing strategies with our experienced remote QA engineers. We specialize in rigorous, testing protocols to ensure the integrity of your software',
        icon: '/logicmatrix/tech/hire-remote-qa-engineer.svg',
        bgColor: 'bg-indigo-50/50',
    },
    {
        title: 'Hire CRM Developers',
        description: 'Improve your business efficiency with our experienced CRM developers. They seamlessly integrate into your team to enhance customer engagement and streamline operations',
        icon: '/logicmatrix/tech/hire-crm-developers.svg',
        bgColor: 'bg-blue-50',
    },
    {
        title: 'Hire ERP Consultants',
        description: 'Optimize your operations with our expert ERP consultants. We provide tailored solutions to streamline business workflows, minimize systems, boost productivity, and drive success',
        icon: '/logicmatrix/tech/hire-erp-consultants.svg',
        bgColor: 'bg-green-50/50',
    },
    {
        title: 'Hire Azure Developers',
        description: 'Enhance your cloud operations with our skilled Azure developers. We specialize in creating digital solutions that improve efficiency and ensure strong data security on Microsoft',
        icon: '/logicmatrix/tech/azure.svg',
        bgColor: 'bg-slate-50',
    },
    {
        title: 'Hire AWS Developers',
        description: 'Enhance your cloud operations with our skilled Azure developers. We specialize in creating digital solutions that improve efficiency and ensure strong data security on Microsoft',
        icon: '/logicmatrix/tech/aws.svg',
        bgColor: 'bg-orange-50/50',
    },
    {
        title: 'Hire GCP Developer',
        description: 'Enhance your cloud operations with our skilled Azure developers. We specialize in creating digital solutions that improve efficiency and ensure strong data security on Microsoft',
        icon: '/logicmatrix/tech/gcp.svg',
        bgColor: 'bg-teal-50/40',
    },
    {
        title: 'Hire Varsel Developer',
        description: 'Enhance your cloud strategy with our skilled Amazon AWS developers. We specialize in deploying and managing secure, high-performance cloud environments and',
        icon: '/logicmatrix/tech/varsel.svg',
        bgColor: 'bg-slate-50',
    }
];
