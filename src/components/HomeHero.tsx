import { Button } from "./Button";
import StatsBar from "./StatsBar";

const HomeHero = () => {
  const stats = [
    { value: "200+", label: "Happy Customers" },
    { value: "10k+", label: "Properties For Clients" },
    { value: "16+", label: "Years of Experience" },
  ];

  return (
    <section className="w-full bg-bg-dark-1 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[480px]">
        {/* Left: Text Content */}
        <div className="flex-1 flex items-center px-4 sm:px-8 lg:px-16 py-12 xl:py-0 order-2 lg:order-1">
          <div className="flex flex-col gap-8 max-w-[580px]">
            <div className="flex flex-col gap-4">
              <h1 className="text-[1.65rem] sm:text-4xl xl:text-5xl font-semibold leading-tight">
                Discover Your Dream <br /> Property with Estatein
              </h1>
              <p className="text-gray text-sm sm:text-base leading-relaxed max-w-[480px]">
                Your journey to finding the perfect property begins here. Explore our
                listings to find the home that matches your dreams.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button text="Learn More" variant="secondary" onClick={() => {}} />
              <Button text="Browse Properties" variant="primary" onClick={() => {}} />
            </div>
            <StatsBar stats={stats} />
          </div>
        </div>

        {/* Right: Hero Image full height, no border */}
        <div className="flex flex-1 relative min-h-[240px] sm:min-h-[360px] lg:min-h-[480px] order-1 lg:order-2">
          <img
            src="/assets/Abstract3.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />
          <img
            src="/assets/Hero Image_1.webp"
            alt="Hero Image"
            className="relative w-full h-full object-cover object-center z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
