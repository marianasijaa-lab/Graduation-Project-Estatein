import { SectionHeader } from '../components/common/SectionHeader';
import HomeHero from '../components/sections/hero/HomeHero';
import Services from '../components/sections/services/Services';
import CardsSlider from '../components/ui/slider/CardsSlider';
import FAQSlider from '../components/ui/slider/FAQSlider';
import TestimonialsSlider from '../components/ui/slider/TestimonialsSlider';

const HomePage = () => {
    return (
        <div>
            <HomeHero />
            <Services/>
            <section className="w-full">
              <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
                <SectionHeader title='Featured Properties' actionLabel='View All Properties' subtitle='Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein. Click "View Details" for more information.'/>
                <CardsSlider/>
              </div>
            </section>
            <section className="w-full">
              <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
                <SectionHeader title='What Our Clients Say' actionLabel='View All Testimonials' subtitle='Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs.'/>
                <TestimonialsSlider/>
              </div>
            </section>
            <section className="w-full">
              <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
                <SectionHeader title='Frequently Asked Questions' actionLabel="View All FAQ's" subtitle="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."/>
                <FAQSlider/>
              </div>
            </section>
        </div>
    );
};

export default HomePage;
