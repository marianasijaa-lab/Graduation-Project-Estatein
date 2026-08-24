// src/pages/Services.tsx
import React from 'react';


import PageHero from '../components/sections/hero/PageHero';
import Services from '../components/sections/services/Services';

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-dark-1 text-white">
      {/* الجزء العلوي */}
      <PageHero
        title="Elevate Your Real Estate Experience"
        description="Welcome to Estatein, where your real estate aspirations meet expert guidance. Explore our comprehensive range of services, each designed to cater to your unique needs and dreams."
        className="pt-10 pb-10 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24"
      />

      
      <Services />
    </div>
  );
};

export default ServicesPage;