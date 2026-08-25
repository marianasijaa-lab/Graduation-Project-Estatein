// src/pages/Services.tsx
import React from 'react';


<<<<<<< Updated upstream
import PageHero from '../components/PageHero';
import Services from '../components/Services';
=======
import PageHero from '../components/sections/hero/PageHero';
import Services from '../components/sections/services/Services';
import { SectionHeader } from '../components/common/SectionHeader';
import UnlockPropertyValue from '../components/sections/services/UnlockPropertyValue';
import SmartInvestments from '../components/sections/services/SmartInvestments';
import EffortlessPropertyManagement from '../components/sections/services/EffortlessManagement';
>>>>>>> Stashed changes

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* الجزء العلوي */}
      <PageHero
        title="Elevate Your Real Estate Experience"
        description="Welcome to Estatein, where your real estate aspirations meet expert guidance. Explore our comprehensive range of services, each designed to cater to your unique needs and dreams."
      />

      
      <Services />
      
    <UnlockPropertyValue/>
    < EffortlessPropertyManagement/>
    < SmartInvestments />
          
        
    </div>
  );
};

export default ServicesPage;