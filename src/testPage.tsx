import React from 'react';
import { SectionHeader } from './components/common/SectionHeader';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white p-6 sm:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* 1. السيكشن الأول: Featured Properties */}
        <section>
          <SectionHeader
            title="Featured Properties"
            subtitle="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein. Click 'View Details' for more information."
            actionLabel="View All Properties"
            onAction={() => console.log('Navigate to properties')}
          />
        </section>

        {/* 2. السيكشن الثاني: What Our Clients Say */}
        <section>
          <SectionHeader
            title="What Our Clients Say"
            subtitle="Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs."
            actionLabel="View All Testimonials"
            onAction={() => console.log('Navigate to testimonials')}
          />
        </section>

      </div>
    </div>
  );
}