import { SectionHeader } from "../../common/SectionHeader";
import StatsBar from "../stats/StatsBar";
import { useStats } from "../../../hooks/useStats";

interface HeroAboutProps {
  image1: string;
  image2: string;
}

const HeroAbout = ({ image1, image2 }: HeroAboutProps) => {
  const { stats } = useStats();

  return (
    <section className="w-full bg-bg-dark-1">
      <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10 pt-2 pb-8 sm:py-10 lg:py-14">
        <div className="flex max-sm:flex-col 2xl:flex-row max-2xl:flex-row max-sm:gap-10 2xl:gap-20 max-2xl:gap-15">
          <div className="max-sm:order-2 max-2xl:order-1 2xl:order-1 2xl:max-w-188.75">
            <SectionHeader
              title="Our Journey"
              subtitle="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients."
            />
            <StatsBar stats={stats} />
          </div>
          <div className="max-sm:mt-12.5 max-sm:order-1 max-2xl:order-2 2xl:order-2 max-w-188.75 relative border border-bg-gray-1 rounded-xl">
            <img src={image1} alt="abstract design" className="inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0" />
            <img
              src={image2}
              alt="Our Journey"
              className="absolute inset-0 m-auto max-w-full h-auto object-contain z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
