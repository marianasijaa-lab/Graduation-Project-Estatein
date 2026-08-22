import HomeHero from "../components/HomeHero";
import CompaniesSlider from "../components/Slider/CompaniesSlider";

export const HomePage = () => {
    return (
        <div className="flex flex-col gap-20 xl:gap-0">
    <HomeHero/>
    <div className="mt-10">

       <CompaniesSlider/>
    </div>
      </div>
    );
};