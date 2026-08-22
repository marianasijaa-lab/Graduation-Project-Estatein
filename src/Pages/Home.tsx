import HomeHero from "../components/Hero/HomeHero";
import CompaniesSlider from "../components/Slider/CompaniesSlider";

export const HomePage = () => {
    return (
        <div className="px-4 flex flex-col mt-10 mb-20 xl:mt-0 xl:mb-0 gap-20 xl:gap-0 xl:px-0 xl:pt-0">
    <HomeHero/>
    <div className="mt-10">

       <CompaniesSlider/>
    </div>
      </div>
    );
};