import { MdWindow } from "react-icons/md";
import { useSlider } from "../../hooks/useSlider";
import { Button } from "../Button";
import BaseSlider from "./BaseSlider";
import SliderButtons from "./SliderButtons";
import { AiOutlineThunderbolt } from "react-icons/ai";

interface Company {
  companyId: number;
  date: string;
  heading: string;
  link: string;
  domain: string;
  category: string;
  testimony: string;
}
const CompaniesSlider = () => {
  const companies: Company[] = [
    {
      companyId: 1,
      date: "since 2019",
      domain: "Commercial Real Estate",
      category: "Luxury Home Development",
      heading: "ABC Corporation",
      link: "",
      testimony:
        "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
    },
    {
      companyId: 2,
      date: "Since 2018",
      domain: "Commercial Real Estate",
      category: "Retail Space",
      heading: "GreenTech Enterprises",
      link: "",
      testimony:
        "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
    },
    {
      companyId: 3,
      date: "since 2019",
      domain: "Commercial Real Estate",
      category: "Luxury Home Development",
      heading: "ABC Corporation",
      link: "",
      testimony:
        "Estatein's ability to identify prime retail locations helped us expand our brand presence. They are a trusted partner in our growth.",
    },
  ];
  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(companies,"two");
  return (
    <div className="w-full max-w-384 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {companies.map((company) => (
          <div
            key={company.companyId}
            className="flex py-0 px-2.5 xl:px-5"
            style={{ width: `${100 / itemsToShow}%`, }}
          >
            <CompanyCard company={company} />
          </div>
        ))}
      </BaseSlider>
      <SliderButtons
        currentIndex={currentIndex}
        goNext={goNext}
        goPrev={goPrev}
        itemsLength={companies.length}
        itemsToShow={itemsToShow}
        maxIndex={maxIndex}
      />
    </div>
  );
};

function CompanyCard({ company }: { company: Company }) {
  return (
    <div
      style={{ boxShadow: "0px 0px 0px 8px #191919" }}
      className="p-4 2xl:p-12.5 xl:p-10 rounded-xl border border-bg-gray-1"
    >
      <div className="flex flex-col gap-7.5 2xl:gap-10">
        <div className="flex gap-5 xl:gap-0 xl:justify-between flex-col xl:flex-row">
          <div className="flex flex-col gap-1.5">
            <span className="block text-gray">{company.date}</span>
            <h3 className="font-semibold text-xl xl:text-2xl 2xl:text-3xl">
              {company.heading}
            </h3>
          </div>
          <Button onClick={() => {}} text="Visit Website" variant="secondary" />
        </div>
        <div className="flex gap-4 xl:gap-0 xl:justify-evenly">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1.5">
              <span>
                <MdWindow className="text-gray" size={24} />
              </span>
              <span className="text-gray text-[18px]">Domain</span>
            </p>
            <h4 className="text-[14px] xl:text-[18px] 2xl:text-xl">
              {company.domain}
            </h4>
          </div>
          <div className="w-0.5 bg-gray"></div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1.5">
              <span>
                <AiOutlineThunderbolt  className="text-gray" size={24} />
              </span>
              <span className="text-gray text-[18px]">Category</span>
            </p>
            <h4 className="text-[14px] xl:text-[18px] 2xl:text-xl">
              {company.category}
            </h4>
          </div>
        </div>
        <div className="border border-gray p-5 xl:p-6 2xl:p-7.5 rounded-xl">
          <p className="text-sm xl:text-md 2xl:text-lg mb-2 xl:mb-2.5 2xl:mb-3.5 text-gray">What They Said🤗</p>
          <p className="text-white text-sm xl:text-md 2xl:text-lg ">
            {company.testimony}
          </p>
        </div>
      </div>
    </div>
  );
}
export default CompaniesSlider;
