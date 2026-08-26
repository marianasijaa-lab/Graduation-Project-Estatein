// src/pages/Services.tsx
import React from 'react';
import { FadeInSection } from '../components/common/FadeInSection';
import PageHero from '../components/sections/hero/PageHero';
import Services from '../components/sections/services/Services';
import UnlockPropertyValue from '../components/sections/services/UnlockPropertyValue';
import SmartInvestments from '../components/sections/services/SmartInvestments';
import EffortlessPropertyManagement from '../components/sections/services/EffortlessManagement';

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-dark-1 text-white">
      {/* الجزء العلوي */}
      <PageHero
        title="Elevate Your Real Estate Experience"
        description="Welcome to Estatein, where your real estate aspirations meet expert guidance. Explore our comprehensive range of services, each designed to cater to your unique needs and dreams."
        className="pt-8 pb-8 sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-14"
      />

      <Services />

      <FadeInSection direction="up" delay={0.1}>
        <UnlockPropertyValue />
      </FadeInSection>

      <FadeInSection direction="up" delay={0.2}>
        <EffortlessPropertyManagement />
      </FadeInSection>

      <FadeInSection direction="up" delay={0.3}>
        <SmartInvestments />
      </FadeInSection>
    </div>
  );
};

export default ServicesPage;