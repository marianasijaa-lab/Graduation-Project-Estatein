import type { PropsContactHero } from "../../interfaces";

const HeroContact = ({
  title,
  description1,
  description2,
}: PropsContactHero) => {
  return (
    <div className="pt-10 pb-10 sm:pt-16  sm:pb-12 lg:pt-37.5  lg:pb-25">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold pb-5">
        {title}
      </h1>
      <p className="text-gray">{description1}</p>
      <p className="text-gray">{description2}</p>
    </div>
  );
};

export default HeroContact;
