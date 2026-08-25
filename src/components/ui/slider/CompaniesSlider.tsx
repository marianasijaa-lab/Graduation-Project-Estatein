import { MdWindow } from "react-icons/md";
import { useSlider } from "../../../hooks/useSlider";
import { Button } from "../Button";
import BaseSlider from "./BaseSlider";
import SliderButtons from "./SliderButtons";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { useCompanies } from "../../../hooks/useCompanies";
import { LoadingSkeleton } from "../LoadingSkeleton";
import { ErrorMessage } from "../ErrorMessage";
import type { FirestoreCompany } from "../../../store/types";

const GAP = 20;

const CompaniesSlider = () => {
  const { companies, status, error } = useCompanies();
  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(companies, "two");

  if (status === 'loading' || status === 'idle') {
    return <LoadingSkeleton variant="slider" count={2} />;
  }

  if (status === 'failed') {
    return (
      <ErrorMessage
        message={error ?? 'فشل جلب بيانات الشركات'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="w-full">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex-shrink-0"
            style={{ width: `calc(${100 / itemsToShow}% - ${(GAP * (itemsToShow - 1)) / itemsToShow}px)` }}
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

function CompanyCard({ company }: { company: FirestoreCompany }) {
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
            <div className="shrink-0 mt-1 hidden sm:block">
              <Button onClick={() => {}} text="Visit Website" variant="secondary" />
            </div>
          </div>
          <div className="sm:hidden w-full">
            <button
              onClick={() => {}}
              className="w-full text-white rounded-lg py-3 px-4 text-sm font-medium transition-all"
              style={{ backgroundColor: "#141414", border: "1px solid #262626" }}
            >
              Visit Website
            </button>
          </div>
        </div>

        {/* ── Domain / Category row ── */}
        <div className="flex gap-0">
          <div className="flex flex-col gap-2 flex-1">
            <p className="flex items-center gap-1.5">
              <MdWindow className="text-gray" size={20} />
              <span className="text-gray text-sm md:text-base">Domain</span>
            </p>
            <h4 className="text-white sm:text-sm md:text-base font-medium">
              {company.domain}
            </h4>
          </div>
          <div className="w-px bg-bg-gray-1 mx-6 self-stretch" />
          <div className="flex flex-col gap-2 flex-1">
            <p className="flex items-center gap-1.5">
              <AiOutlineThunderbolt className="text-gray" size={20} />
              <span className="text-gray text-sm md:text-base">Category</span>
            </p>
            <h4 className="text-white sm:text-sm md:text-base font-medium">
              {company.category}
            </h4>
          </div>
        </div>

        {/* ── Testimony box ── */}
        <div className="rounded-xl border border-bg-gray-1 p-5 sm:p-6 lg:p-7 flex flex-col gap-3 flex-1">
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
