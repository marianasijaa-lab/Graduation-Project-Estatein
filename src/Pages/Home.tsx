import { SectionHeader } from '../components/common/SectionHeader';
import HomeHero from '../components/sections/hero/HomeHero';
import Services from '../components/sections/services/Services';
import CardsSlider from '../components/ui/slider/CardsSlider';
import FAQSlider from '../components/ui/slider/FAQSlider';
import TestimonialsSlider from '../components/ui/slider/TestimonialsSlider';
import { useState } from 'react';

const HomePage = () => {
  const [showAllProperties, setShowAllProperties] = useState(false);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

    return (
        <div className='pb-20 pt-10 px-4 md:px-0 md:pt-0 md:pb-0 lg:px-0 lg:pt-0 lg:pb-0 overflow-x-clip'>
        <div>
            <HomeHero />
            <Services />
            <section className="w-full">
              <div className="bg-(--bg-main) site-container py-8 sm:py-10 lg:py-14">
                <SectionHeader title='Featured Properties' actionLabel='View All Properties' onAction={() => setShowAllProperties(true)} subtitle='Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein.'/>
                <CardsSlider
                  showAll={showAllProperties}
                  onBack={() => setShowAllProperties(false)}
                  actionLabel="View All Properties"
                  onAction={() => setShowAllProperties(true)}
                />
              </div>
            </section>
            <section className="w-full">
              <div className="bg-(--bg-main) site-container py-8 sm:py-10 lg:py-14">
                <SectionHeader title='What Our Clients Say' actionLabel='View All Testimonials' onAction={() => setShowAllTestimonials(true)} subtitle='Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs.'/>
                <TestimonialsSlider
                  showAll={showAllTestimonials}
                  onBack={() => setShowAllTestimonials(false)}
                  actionLabel="View All Testimonials"
                  onAction={() => setShowAllTestimonials(true)}
                />
              </div>
            </section>
            <section className="w-full">
              <div className="bg-(--bg-main) site-container py-8 sm:py-10 lg:py-14">
                <SectionHeader title='Frequently Asked Questions' actionLabel="View All FAQ's" onAction={() => setShowAllFaqs(true)} subtitle="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."/>
                <FAQSlider
                  showAll={showAllFaqs}
                  onBack={() => setShowAllFaqs(false)}
                  actionLabel="View All FAQs"
                  onAction={() => setShowAllFaqs(true)}
                />
               
              </div>
            </section>
        </div>
          </div>
    );
};

export default HomePage;
