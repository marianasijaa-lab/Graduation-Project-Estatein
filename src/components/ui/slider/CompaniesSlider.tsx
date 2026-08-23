import { MdWindow } from "react-icons/md";
import { useSlider } from "../../../hooks/useSlider";
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
      date: "Since 2019",
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
        "Estatein's ability to identify prime retail locations helped us expand our brand presence. They are a trusted partner in our growth.",
    },
    {
      companyId: 3,
      date: "Since 2020",
      domain: "Residential Real Estate",
      category: "Luxury Home Development",
      heading: "Skyline Properties",
      link: "",
      testimony:
        "Working with Estatein transformed our approach to luxury residential projects. Their market knowledge is unmatched.",
    },
  ];

  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(companies, "two");

  return (
    <div className="w-full">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {companies.map((company) => (
          <div
            key={company.companyId}
            style={{ width: `${100 / itemsToShow}%` }}
            className="px-2 sm:px-5 flex"
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
      className="w-full h-full rounded-xl border border-bg-gray-1 p-5 sm:p-8 lg:p-10 flex flex-col overflow-hidden"
      style={{ backgroundColor: "#141414", boxShadow: "0px 0px 0px 8px #191919" }}
    >
      <div className="flex flex-col gap-6 flex-1">
        {/* ── Top row: date + name + button ── */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-gray text-sm sm:text-base">{company.date}</span>
              <h3 className="font-semibold text-2xl sm:text-3xl md:text-2xl text-white">
                {company.heading}
              </h3>
            </div>
            {/* Desktop: button next to name */}
            <div className="shrink-0 mt-1 hidden sm:block">
              <Button onClick={() => {}} text="Visit Website" variant="secondary" />
            </div>
          </div>
          {/* Mobile: full-width button below name */}
          <div className="sm:hidden w-full">
            <button
              onClick={() => {}}
              className="w-full text-white rounded-[8px] py-3 px-4 text-sm font-medium transition-all"
              style={{ backgroundColor: "#1A1A1A", border: "1px solid #262626" }}
            >
              Visit Website
            </button>
          </div>
        </div>

        {/* ── Domain / Category row ── */}
        <div className="flex gap-0">
          {/* Domain */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="flex items-center gap-1.5">
              <MdWindow className="text-gray" size={20} />
              <span className="text-gray text-sm md:text-base">Domain</span>
            </p>
            <h4 className="text-white text-sm sm:text-sm md:text-base font-medium">
              {company.domain}
            </h4>
          </div>

          {/* Divider */}
          <div className="w-px bg-bg-gray-1 mx-6 self-stretch" />

          {/* Category */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="flex items-center gap-1.5">
              <AiOutlineThunderbolt className="text-gray" size={20} />
              <span className="text-gray text-sm md:text-base">Category</span>
            </p>
            <h4 className="text-white text-sm sm:text-sm md:text-base font-medium">
              {company.category}
            </h4>
          </div>
        </div>

        {/* ── Testimony box ── */}
        <div
          className="rounded-xl border border-bg-gray-1 p-5 sm:p-6 lg:p-7 flex flex-col gap-3 flex-1"
          
        >
          <p className="text-gray text-sm sm:text-base">What They Said 🤗</p>
          <p className="text-white sm:text-base lg:text-sm leading-relaxed">
            {company.testimony}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompaniesSlider;
