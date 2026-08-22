

import { SectionHeader } from "./common/SectionHeader";
import StatsBar from "./StatsBar";

interface HeroAboutProps
{
image1:string;
image2:string
}

const HeroAbout = ({image1,image2}:HeroAboutProps) => 
  {
  const journeyStats = 
  [
    { value: "200+", label: "Happy Customers" },
    { value: "10k+", label: "Properties For Clients" },
    { value: "16+", label: "Years of Experience" },
  ];

  return (
    <>
    <div className=" flex  max-sm:flex-col  max-2xl:flex-row  2xl:flex-row  2xl:max-w-[1590px]   max-sm:gap-10  2xl:gap-20 max-2xl:gap-15">
      <div className=" max-sm:order-2 max-2xl:order-1 2xl:order-1   2xl:max-w-[755px]  ">
           <SectionHeader
            title="Our Journey"
            subtitle="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients."
           />
           <StatsBar stats={journeyStats} />
      </div>
         <div className=" max-sm:mt-[50px] max-sm:order-1 max-2xl:order-2 2xl:order-2 max-w-[755px] relative border border-[#262626] rounded-[12px]  ">
            <img src={ image1} alt="abstract design" className=" inset-0   w-full h-full object-cover opacity-20 pointer-events-none z-0" />
             <img 
             src={image2}
             alt="Our Journey" 
             className="absolute inset-0 m-auto max-w-full h-auto object-contain z-10"
              />
           </div>
    </div>
     
    </>
  );
};

export default HeroAbout;
