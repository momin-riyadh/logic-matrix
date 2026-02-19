import CompanySection from './CompanySection';
import DevOpsToolsSection from './DevOpsToolsSection';
import DevSecOpsToolsSection from './DevSecOpsToolsSection';
import HeroSection from './HeroSection';
import IndustriesSection from './IndustriesSection';
import ProcessSection from './ProcessSection';
import RecentWorkSection from './RecentWorkSection';
import ServicesSection from './ServicesSection';
import TestimonialsSection from './TestimonialsSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <CompanySection />
      <ProcessSection />
      <ServicesSection />
      <DevOpsToolsSection />
      <DevSecOpsToolsSection />
      <IndustriesSection />
      <RecentWorkSection />
      <TestimonialsSection />
    </>
  );
}
