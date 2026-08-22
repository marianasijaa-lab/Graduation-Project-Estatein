
import { SectionHeader } from './components/common/SectionHeader';
import { InfoBox } from './components/InfoBox';


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

        {/* 3. InfoBox Section */}
        <section className="space-y-6">
          {/* القسم الأول - horizontal */}
          <InfoBox
            variant="horizontal"
            title="Unlock the Value of Your Property Today"
            description="Ready to unlock the true value of your property? Explore our Property Selling Service categories and let us help you achieve the best deal possible for your valuable asset."
            onButtonClick={() => console.log('Learn More - Property Selling')}
          />

          {/* القسم الثاني - vertical */}
          <div className="max-w-sm">
            <InfoBox
              variant="vertical"
              title="Unlock Your Investment Potential"
              description="Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership."
              onButtonClick={() => console.log('Learn More - Investment')}
            />
          </div>

          {/* القسم الثالث - horizontal */}
          <InfoBox
            variant="horizontal"
            title="Experience Effortless Property Management"
            description="Ready to experience hassle-free property management? Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership."
            onButtonClick={() => console.log('Learn More - Property Management')}
          />
        </section>

      </div>
    </div>
  );
}