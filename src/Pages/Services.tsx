// src/pages/Services.tsx
import React from 'react';


import PageHero from '../components/PageHero';
import Services from '../components/Services';

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* الجزء العلوي */}
      <PageHero
        title="Elevate Your Real Estate Experience"
        description="Welcome to Estatein, where your real estate aspirations meet expert guidance. Explore our comprehensive range of services, each designed to cater to your unique needs and dreams."
      />

      
      <Services />
    </div>
  );
};

export default ServicesPage;