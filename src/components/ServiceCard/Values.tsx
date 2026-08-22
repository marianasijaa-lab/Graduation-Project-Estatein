import { SectionHeader } from "../common/SectionHeader";
import ServiceCard from "./ServiceCard";

const Values = () => {
    const values=[
    { icon: "/assets/Icon_33.png", heading: "Find Your Dream Home",description:"Trust is the cornerstone of every successful real estate transaction." },
    { icon: "/assets/icon_10.png", heading: "Unlock Property Value",description:"We set the bar high for ourselves. From the properties we list to the services we provide." },
    { icon: "/assets/icon_11.png", heading: "Effortless Property Management" ,description:"Your dreams and needs are at the center of our universe. We listen, understand."},
    { icon: "/assets/Icon_33.png", heading: "Effortless Property Management" ,description:"We are dedicated to providing you with the highest level of service, professionalism, and support."},
   ]
  return (
    <section className="flex gap-20">
      <SectionHeader
        title="Our Values"
        subtitle="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 lg:p-12.5 xl:p-15">
        {values.map(value=><ServiceCard type="horizontal" heading={value.heading} description={value.description} icon={value.icon}/>)}
      </div>
    </section>
  );
};

export default Values;
