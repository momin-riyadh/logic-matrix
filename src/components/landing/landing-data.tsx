import type { ReactNode } from 'react';

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type StatItem = {
  value: string;
  label: string;
};

export type BrandLogo = {
  src: string;
  alt: string;
};

export type ProcessStep = {
  title: string;
  subtitle: string;
  description: string;
  gradientClassName: string;
  icon: ReactNode;
};

export type ServiceItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

export type DevOpsTool = {
  name: string;
  accentClassName?: string;
  variant?: 'action';
  imageSrc?: string;
  imageAlt?: string;
};

export type DevOpsCategory = {
  title: string;
  description: string;
  tools: DevOpsTool[];
};

export type DevSecOpsTool = {
  name: string;
  accentClassName?: string;
  variant?: 'action';
  imageSrc?: string;
  imageAlt?: string;
};

export type DevSecOpsCategory = {
  title: string;
  description: string;
  tools: DevSecOpsTool[];
};

export type IndustryItem = {
  title: string;
  iconWrapperClassName: string;
  icon: ReactNode;
};

export type WorkItem = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type ContactItem = {
  label: string;
  icon: ReactNode;
};

export type TestimonialItem = {
  id: number;
  title: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

export type FooterGroup = {
  title: string;
  items: string[];
};

export const navLinks: NavLink[] = [
  { label: 'About us', href: '/about' },
  {
    label: 'Services',
    href: '#',
    children: [
      { label: 'Web Development', href: '#' },
      { label: 'Mobile Apps', href: '#' },
      { label: 'UI/UX Design', href: '#' },
      { label: 'Cloud Services', href: '#' },
      { label: 'QA & Testing', href: '#' },
    ],
  },
  { label: 'Portfolio', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Career', href: '#' },
];

export const stats: StatItem[] = [
  { value: '9+', label: 'Years Experience' },
  { value: '483', label: 'Happy Client' },
  { value: '150+', label: 'Project Finished' },
];

export const brandLogos: BrandLogo[] = [
  { src: '/logicmatrix/brand/sap.svg', alt: 'SAP logo' },
  { src: '/logicmatrix/brand/aws.svg', alt: 'AWS logo' },
  { src: '/logicmatrix/brand/oracle.svg', alt: 'Oracle logo' },
  { src: '/logicmatrix/brand/solarwinds.svg', alt: 'SolarWinds logo' },
  { src: '/logicmatrix/brand/siemens.svg', alt: 'Siemens logo' },
  { src: '/logicmatrix/brand/medium.svg', alt: 'Medium logo' },
  { src: '/logicmatrix/brand/accenture.svg', alt: 'Accenture logo' },
  { src: '/logicmatrix/brand/deutsche_bahn.svg', alt: 'Deutsche Bahn logo' },
  { src: '/logicmatrix/brand/okta.svg', alt: 'Okta logo' },
  { src: '/logicmatrix/brand/toast.svg', alt: 'Toast logo' },
  { src: '/logicmatrix/brand/blackanddecker.svg', alt: 'Stanley Black & Decker logo' },
  { src: '/logicmatrix/brand/azure.svg', alt: 'Microsoft Azure logo' },
  { src: '/logicmatrix/brand/alaska.svg', alt: 'Alaska Airlines logo' },
  { src: '/logicmatrix/brand/google-cloud.svg', alt: 'Google Cloud logo' },
];

export const processSteps: ProcessStep[] = [
  {
    title: 'Create Business',
    subtitle: 'Communicate / Connect / Convert',
    description:
      'We start with discovery and collaboration to understand your challenges, align on goals, and translate requirements into a clear strategy that guides every decision.',
    gradientClassName: 'from-sky-500 via-blue-600 to-indigo-700 shadow-blue-500/30',
    icon: (
      <svg className='h-24 w-24 text-white/90' viewBox='0 0 120 120' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
        <rect x='12' y='18' width='96' height='64' rx='10' />
        <path d='M26 88h68' />
        <path d='M34 38h52' />
        <path d='M34 52h32' />
        <path d='M72 52h14' />
      </svg>
    ),
  },
  {
    title: 'Rapid Delivery',
    subtitle: 'Define / Design / Develop',
    description:
      'We iterate quickly with clear milestones, weekly demos, and tight feedback loops so you always know what is shipping next and why it matters.',
    gradientClassName: 'from-teal-400 via-cyan-500 to-blue-600 shadow-cyan-500/30',
    icon: (
      <svg className='h-24 w-24 text-white/90' viewBox='0 0 120 120' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
        <circle cx='60' cy='60' r='32' />
        <path d='M28 60h64' />
        <path d='M60 28v64' />
        <path d='M45 45h30v30H45z' />
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
      <svg className='h-24 w-24 text-white/90' viewBox='0 0 120 120' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
        <path d='M20 86h80' />
        <path d='M30 86V44l30-18 30 18v42' />
        <path d='M46 64h28' />
        <path d='M46 72h18' />
      </svg>
    ),
  },
];

export const services: ServiceItem[] = [
  {
    title: 'Software Designing and Development',
    description:
      'End-to-end product engineering with modern stacks, secure architectures, and long-term scalability.',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <rect x='3' y='4' width='18' height='14' rx='2' />
        <path d='M8 20h8' />
        <path d='M9 8h6' />
        <path d='M9 12h6' />
      </svg>
    ),
  },
  {
    title: 'System Integration and Designing',
    description:
      'Seamlessly connect tools, data, and workflows to create a single, reliable operational backbone.',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M5 3h14v6H5z' />
        <path d='M9 17h6v4H9z' />
        <path d='M12 9v8' />
        <path d='M5 9h14' />
      </svg>
    ),
  },
  {
    title: 'Content Management System',
    description:
      'Flexible CMS solutions that keep teams publishing faster and content governance effortless.',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M4 5h16v4H4z' />
        <path d='M4 11h16v8H4z' />
        <path d='M8 15h4' />
      </svg>
    ),
  },
  {
    title: 'eCommerce Development',
    description:
      'Revenue-ready storefronts, secure payments, and personalized buyer journeys that convert.',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M5 4h14v6H5z' />
        <path d='M7 10v10h10V10' />
        <path d='M9 14h6' />
        <path d='M9 17h4' />
      </svg>
    ),
  },
  {
    title: 'Mobile App Development',
    description:
      'Native and cross-platform apps crafted for performance, retention, and delightful user experiences.',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <rect x='7' y='3' width='10' height='18' rx='2' />
        <path d='M11 6h2' />
        <path d='M9 10h6' />
        <path d='M9 14h4' />
      </svg>
    ),
  },
  {
    title: 'Search Engine Optimization',
    description:
      'Data-driven SEO that increases visibility, organic traffic, and long-term growth.',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <circle cx='10' cy='10' r='5' />
        <path d='M14 14l6 6' />
        <path d='M10 7v6' />
        <path d='M7 10h6' />
      </svg>
    ),
  },
  {
    title: 'UI/UX Designing',
    description:
      'Human-centered design systems that turn complex requirements into elegant, usable products.',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M4 6h16v10H4z' />
        <path d='M8 20h8' />
        <path d='M9 10h6' />
        <path d='M9 13h4' />
      </svg>
    ),
  },
  {
    title: 'Database Development and Management',
    description:
      'Reliable data platforms with high availability, performance tuning, and structured governance.',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <ellipse cx='12' cy='6' rx='6.5' ry='3' />
        <path d='M5.5 6v6c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3V6' />
        <path d='M5.5 12v6c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-6' />
      </svg>
    ),
  },
];

export const devOpsCategories: DevOpsCategory[] = [
  {
    title: 'Cloud Platforms',
    description: 'Wide range of personalized solutions to cater to your specific goals.',
    tools: [
      {
        name: 'AWS',
        accentClassName: 'text-slate-700',
        imageSrc: '/assets/images/devops/cloud platforms/amazon_web_services_logo.svg',
        imageAlt: 'AWS logo',
      },
      {
        name: 'Azure',
        accentClassName: 'text-sky-600',
        imageSrc: '/assets/images/devops/cloud platforms/azure.png',
        imageAlt: 'Azure logo',
      },
      {
        name: 'Google Cloud',
        accentClassName: 'text-amber-600',
        imageSrc: '/assets/images/devops/cloud platforms/gcp.png',
        imageAlt: 'Google Cloud logo',
      },
      { name: 'Explore', variant: 'action' },
    ],
  },
  {
    title: 'Containerization & Orchestration',
    description: 'Wide range of personalized solutions to cater to your specific goals.',
    tools: [
      {
        name: 'Docker',
        accentClassName: 'text-sky-500',
        imageSrc: '/assets/images/devops/containerization & orchestration/docker.png',
        imageAlt: 'Docker logo',
      },
      {
        name: 'Kubernetes',
        accentClassName: 'text-blue-600',
        imageSrc: '/assets/images/devops/containerization & orchestration/kubernetes.png',
        imageAlt: 'Kubernetes logo',
      },
      {
        name: 'Podman',
        accentClassName: 'text-violet-600',
        imageSrc: '/assets/images/devops/containerization & orchestration/podman.png',
        imageAlt: 'Podman logo',
      },
      { name: 'Explore', variant: 'action' },
    ],
  },
  {
    title: 'CI/CD & Automation',
    description: 'Wide range of personalized solutions to cater to your specific goals.',
    tools: [
      {
        name: 'GitHub',
        accentClassName: 'text-slate-800',
        imageSrc: '/assets/images/devops/cicd & automation/github.png',
        imageAlt: 'GitHub logo',
      },
      {
        name: 'GitLab',
        accentClassName: 'text-orange-500',
        imageSrc: '/assets/images/devops/cicd & automation/gitlab.png',
        imageAlt: 'GitLab logo',
      },
      {
        name: 'Jenkins',
        accentClassName: 'text-red-500',
        imageSrc: '/assets/images/devops/cicd & automation/jenkins.png',
        imageAlt: 'Jenkins logo',
      },
      { name: 'Explore', variant: 'action' },
    ],
  },
  {
    title: 'Infrastructure as Code',
    description: 'Wide range of personalized solutions to cater to your specific goals.',
    tools: [
      {
        name: 'Terraform',
        accentClassName: 'text-indigo-600',
        imageSrc: '/assets/images/devops/infrastructure as code/teraform.png',
        imageAlt: 'Terraform logo',
      },
      {
        name: 'Ansible',
        accentClassName: 'text-slate-800',
        imageSrc: '/assets/images/devops/infrastructure as code/ansible.png',
        imageAlt: 'Ansible logo',
      },
      {
        name: 'Pulumi',
        accentClassName: 'text-fuchsia-600',
        imageSrc: '/assets/images/devops/infrastructure as code/pulumi.png',
        imageAlt: 'Pulumi logo',
      },
      { name: 'Explore', variant: 'action' },
    ],
  },
  {
    title: 'Monitoring & Logging',
    description: 'Wide range of personalized solutions to cater to your specific goals.',
    tools: [
      {
        name: 'Prometheus',
        accentClassName: 'text-orange-500',
        imageSrc: '/assets/images/devops/monitoring & logging/promethouse.png',
        imageAlt: 'Prometheus logo',
      },
      {
        name: 'Grafana',
        accentClassName: 'text-amber-600',
        imageSrc: '/assets/images/devops/monitoring & logging/grafana.png',
        imageAlt: 'Grafana logo',
      },
      {
        name: 'New Relic',
        accentClassName: 'text-emerald-600',
        imageSrc: '/assets/images/devops/monitoring & logging/new relic.png',
        imageAlt: 'New Relic logo',
      },
      { name: 'Explore', variant: 'action' },
    ],
  },
];

export const devSecOpsCategories: DevSecOpsCategory[] = [
  {
    title: 'Code Quality & SAST',
    description: 'Wide range of personalized solutions to cater to your specific goals.',
    tools: [
      {
        name: 'SonarQube',
        accentClassName: 'text-slate-800',
        imageSrc: '/assets/images/devsecops/code quality & sast/sonar.png',
        imageAlt: 'SonarQube logo',
      },
      {
        name: 'Semgrep',
        accentClassName: 'text-emerald-500',
        imageSrc: '/assets/images/devsecops/code quality & sast/sem.png',
        imageAlt: 'Semgrep logo',
      },
      { name: 'Explore', variant: 'action' },
    ],
  },
  {
    title: 'Vulnerability Scanning',
    description: 'Wide range of personalized solutions to cater to your specific goals.',
    tools: [
      {
        name: 'Trivy',
        accentClassName: 'text-sky-600',
        imageSrc: '/assets/images/devsecops/vulnerability scanning/trivy.png',
        imageAlt: 'Trivy logo',
      },
      {
        name: 'Snyk',
        accentClassName: 'text-indigo-600',
        imageSrc: '/assets/images/devsecops/vulnerability scanning/snyk.png',
        imageAlt: 'Snyk logo',
      },
      { name: 'Explore', variant: 'action' },
    ],
  },
  {
    title: 'Secrets Management',
    description: 'Wide range of personalized solutions to cater to your specific goals.',
    tools: [
      {
        name: 'AWS Secrets Manager',
        accentClassName: 'text-orange-500',
        imageSrc: '/assets/images/devsecops/secrets management/aws secret manager.png',
        imageAlt: 'AWS Secrets Manager logo',
      },
      {
        name: 'Azure Key Vault',
        accentClassName: 'text-sky-600',
        imageSrc: '/assets/images/devsecops/secrets management/azure key.png',
        imageAlt: 'Azure Key Vault logo',
      },
      { name: 'Explore', variant: 'action' },
    ],
  },
  {
    title: 'Container & Runtime Security',
    description: 'Wide range of personalized solutions to cater to your specific goals.',
    tools: [
      {
        name: 'Aqua',
        accentClassName: 'text-blue-600',
        imageSrc: '/assets/images/devsecops/container & runtime security/aqua.png',
        imageAlt: 'Aqua Security logo',
      },
      {
        name: 'Falco',
        accentClassName: 'text-cyan-600',
        imageSrc: '/assets/images/devsecops/container & runtime security/fatco.png',
        imageAlt: 'Falco logo',
      },
      { name: 'Explore', variant: 'action' },
    ],
  },
  {
    title: 'Compliance & Policy',
    description: 'Wide range of personalized solutions to cater to your specific goals.',
    tools: [
      {
        name: 'Open Policy Agent',
        accentClassName: 'text-slate-700',
        imageSrc: '/assets/images/devsecops/compliance & policy/open police.png',
        imageAlt: 'Open Policy Agent logo',
      },
      {
        name: 'Kyverno',
        accentClassName: 'text-orange-500',
        imageSrc: '/assets/images/devsecops/compliance & policy/vector.png',
        imageAlt: 'Kyverno logo',
      },
      { name: 'Explore', variant: 'action' },
    ],
  },
];

export const industries: IndustryItem[] = [
  {
    title: 'Architectural',
    iconWrapperClassName: 'bg-amber-100 text-amber-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M3 20h18' />
        <path d='M5 20V9l7-5 7 5v11' />
        <path d='M9 20v-6h6v6' />
      </svg>
    ),
  },
  {
    title: 'Automobile',
    iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M3 15h14l4-5H7z' />
        <circle cx='7' cy='18' r='2' />
        <circle cx='17' cy='18' r='2' />
      </svg>
    ),
  },
  {
    title: 'Construction',
    iconWrapperClassName: 'bg-rose-100 text-rose-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M4 20h16' />
        <path d='M6 20v-8l6-4 6 4v8' />
        <path d='M10 12h4' />
      </svg>
    ),
  },
  {
    title: 'Bank',
    iconWrapperClassName: 'bg-sky-100 text-sky-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <rect x='4' y='4' width='16' height='16' rx='2' />
        <path d='M8 20V8' />
        <path d='M12 20V8' />
        <path d='M16 20V8' />
      </svg>
    ),
  },
  {
    title: 'Restaurant',
    iconWrapperClassName: 'bg-lime-100 text-lime-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M4 5h16' />
        <path d='M7 5l2 6' />
        <path d='M17 5l-2 6' />
        <path d='M6 13h12' />
        <path d='M8 13v6' />
        <path d='M16 13v6' />
      </svg>
    ),
  },
  {
    title: 'eCommerce',
    iconWrapperClassName: 'bg-pink-100 text-pink-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <circle cx='9' cy='20' r='1' />
        <circle cx='17' cy='20' r='1' />
        <path d='M3 4h2l2 12h10l2-8H7' />
      </svg>
    ),
  },
  {
    title: 'Engineering',
    iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <circle cx='12' cy='12' r='4' />
        <path d='M12 2v3' />
        <path d='M12 19v3' />
        <path d='M4.9 4.9l2.1 2.1' />
        <path d='M17 17l2.1 2.1' />
        <path d='M2 12h3' />
        <path d='M19 12h3' />
        <path d='M4.9 19.1l2.1-2.1' />
        <path d='M17 7l2.1-2.1' />
      </svg>
    ),
  },
  {
    title: 'Financial Services',
    iconWrapperClassName: 'bg-sky-100 text-sky-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <circle cx='12' cy='8' r='4' />
        <path d='M12 12v8' />
        <path d='M8 16h8' />
      </svg>
    ),
  },
  {
    title: 'Medical Services',
    iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M12 5v14' />
        <path d='M5 12h14' />
        <rect x='4' y='4' width='16' height='16' rx='3' />
      </svg>
    ),
  },
  {
    title: 'Food & Drinks',
    iconWrapperClassName: 'bg-amber-100 text-amber-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M5 9h14' />
        <path d='M7 9l2 10h6l2-10' />
        <path d='M9 5h6' />
      </svg>
    ),
  },
  {
    title: 'Non Profit',
    iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M12 21s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z' />
      </svg>
    ),
  },
  {
    title: 'Health Care',
    iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M12 21s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z' />
        <path d='M9 12h6' />
      </svg>
    ),
  },
  {
    title: 'Insurance',
    iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M12 3l7 4v5c0 5-4 8-7 9-3-1-7-4-7-9V7l7-4z' />
      </svg>
    ),
  },
  {
    title: 'Pharmaceutical',
    iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <rect x='6' y='3' width='12' height='18' rx='2' />
        <path d='M9 7h6' />
        <path d='M9 12h6' />
      </svg>
    ),
  },
  {
    title: 'Legal',
    iconWrapperClassName: 'bg-sky-100 text-sky-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M6 19h12' />
        <path d='M8 19l4-14 4 14' />
        <path d='M9 12h6' />
      </svg>
    ),
  },
  {
    title: 'Manufacturing',
    iconWrapperClassName: 'bg-sky-100 text-sky-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M3 20h18' />
        <path d='M5 20V9h14v11' />
        <path d='M8 9V6h8v3' />
      </svg>
    ),
  },
  {
    title: 'Labor Management',
    iconWrapperClassName: 'bg-sky-100 text-sky-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <rect x='4' y='4' width='16' height='16' rx='2' />
        <path d='M8 9h8' />
        <path d='M8 13h5' />
        <path d='M8 17h4' />
      </svg>
    ),
  },
  {
    title: 'Education',
    iconWrapperClassName: 'bg-amber-100 text-amber-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M6 7h12' />
        <path d='M8 7l4-3 4 3' />
        <path d='M4 7h16v10H4z' />
        <path d='M10 17h4' />
      </svg>
    ),
  },
  {
    title: 'Marketing',
    iconWrapperClassName: 'bg-sky-100 text-sky-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M4 4h12v12H4z' />
        <path d='M8 8h4' />
        <path d='M20 8l-4 4 4 4' />
      </svg>
    ),
  },
  {
    title: 'Logistics',
    iconWrapperClassName: 'bg-amber-100 text-amber-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M3 12h10' />
        <path d='M13 12l4-4' />
        <path d='M13 12l4 4' />
        <circle cx='18.5' cy='8' r='1.5' />
        <circle cx='18.5' cy='16' r='1.5' />
      </svg>
    ),
  },
  {
    title: 'Travel',
    iconWrapperClassName: 'bg-amber-100 text-amber-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M3 12h8l10-6v12l-10-6H3z' />
      </svg>
    ),
  },
  {
    title: 'Advisor',
    iconWrapperClassName: 'bg-sky-100 text-sky-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M4 6h16v12H4z' />
        <path d='M8 10h8' />
        <path d='M8 14h5' />
      </svg>
    ),
  },
  {
    title: 'Technology',
    iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <rect x='6' y='6' width='12' height='12' rx='2' />
        <path d='M9 9h6v6H9z' />
        <path d='M6 12H3' />
        <path d='M21 12h-3' />
        <path d='M12 6V3' />
        <path d='M12 21v-3' />
      </svg>
    ),
  },
  {
    title: 'Data & Information',
    iconWrapperClassName: 'bg-emerald-100 text-emerald-500',
    icon: (
      <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <ellipse cx='12' cy='6' rx='6.5' ry='3' />
        <path d='M5.5 6v6c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3V6' />
        <path d='M5.5 12v6c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-6' />
      </svg>
    ),
  },
];

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

export const contactInfo: ContactItem[] = [
  {
    label: '+880 123456 86',
    icon: (
      <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 3.2 8.8 19.8 19.8 0 0 1 0 0.2 2 2 0 0 1 2 0h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L6 8.9a16 16 0 0 0 7.1 7.1l2.5-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 1.9z' />
      </svg>
    ),
  },
  {
    label: 'support@logicmatrix.com',
    icon: (
      <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <rect x='3' y='5' width='18' height='14' rx='2' />
        <path d='m3 7 9 6 9-6' />
      </svg>
    ),
  },
  {
    label: 'Virginia, USA',
    icon: (
      <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0Z' />
        <circle cx='12' cy='10' r='3' />
      </svg>
    ),
  },
];

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
