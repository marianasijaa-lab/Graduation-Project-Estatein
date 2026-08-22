import { Button } from "../Button";
import StatsBar from "../StatsBar";

const HomeHero = () => {
  const stats = [
    { value: "200+", label: "Happy Customers" },
    { value: "10k+", label: "Properties For Clients" },
    { value: "16+", label: "Years of Experience" },
  ];
  return (
    <section className="flex flex-col gap-10 xl:gap-0 xl:flex-row 2xl:max-h-203.5 bg-bg-dark-1">
      <div className="flex-1 order-2 xl:order-1 flex justify-center 2xl:py-36">
        <div className="flex flex-col justify-center gap-10 xl:gap-12.5 2xl:gap-15">

        <div className="flex flex-col gap-5 justify-center">
            <h1 className="text-[28px] 2xl:text-[46px]  xl:w-[30dvw] font-semibold">Discover Your Dream Property with Estatein</h1>
        <p className="font-medium  xl:w-[30dvw] text-gray">
          Your journey to finding the perfect property begins here. Explore our
          listings to find the home that matches your dreams.
        </p>
        </div>
        <div className="flex flex-col xl:flex-row gap-4 2xl:gap-5">
          <Button text="Learn More" variant="secondary" onClick={() => {}} />
          <Button
            text="Browse Properties "
            variant="primary"
            onClick={() => {}}
          />
        </div>
        <div className="">
          <StatsBar stats={stats} />
        </div>
        </div>
      </div>
      <div className={`flex-1 order-1 xl:order-1 bg-[url('/assets/Abstract3.png')] bg-top-left border border-bg-gray-1 xl:border-0 rounded-3xl xl:rounded-none `}>
        <img src="/assets/Hero Image_1.webp" alt="Hero Image" className="w-full rounded-tr-3xl xl:rounded-tr-none h-full" />
      </div>
    </section>
  );
};

export default HomeHero;
