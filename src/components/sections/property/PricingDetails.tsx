import React from "react";

interface PricingItem {
  label: string;
  value: string;
  note?: string;
  fullWidth?: boolean;
}

interface PricingSection {
  title: string;
  items: PricingItem[];
}

interface PricingDetailsProps {
  title: string;
  description: string;
  noteTitle: string;
  noteText: string;
  listingPrice: string;
  sections: PricingSection[];
}

const PricingCard = ({ title, items }: PricingSection) => {
  // Monthly Costs تكون عناصرها تحت بعض
  const isMonthlyCosts = title === "Monthly Costs";

  return (
    <div className="w-full rounded-[10px] border border-[#262626] bg-[#141414]">
      {/* ================= CARD HEADER ================= */}

      <div className="flex h-[63px] items-center justify-between border-b border-[#262626] px-[50px]">
        <h3 className="font-['Urbanist'] text-[16px] font-semibold text-white">
          {title}
        </h3>

        <button
          type="button"
          className="
            h-[40px]
            rounded-[6px]
            border
            border-[#262626]
            bg-[#1A1A1A]
            px-[18px]
            font-['Urbanist']
            text-[12px]
            font-medium
            text-white
            transition
            hover:bg-[#222222]
          "
        >
          Learn More
        </button>
      </div>

      {/* ================= ITEMS ================= */}

      <div className="px-[50px]">
        <div
          className={
            isMonthlyCosts
              ? "grid grid-cols-1"
              : "grid grid-cols-1 md:grid-cols-2"
          }
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`
                min-h-[86px]
                py-[30px]

                ${
                  index !== items.length - 1
                    ? "border-b border-[#262626]"
                    : ""
                }

                ${
                  !isMonthlyCosts &&
                  item.fullWidth
                    ? "md:col-span-2"
                    : ""
                }

                ${
                  !isMonthlyCosts &&
                  !item.fullWidth &&
                  index % 2 === 1
                    ? `relative md:pl-[30px]
         md:before:absolute
         md:before:left-0
         md:before:top-[12px]
        md:before:bottom-[12px]
          md:before:w-px
        md:before:bg-[#262626]`
                    : ""
                }

                ${
                  !isMonthlyCosts &&
                  !item.fullWidth &&
                  index % 2 === 0
                    ? "md:pr-[30px]"
                    : ""
                }`
              }
            >
              {/* Label */}

              <p
                className="
                  font-['Urbanist']
                  text-[12px]
                  font-medium
                  text-[#999999]
                "
              >
                {item.label}
              </p>

              {/* Value + Note */}

              <div className="mt-[8px] flex flex-wrap items-center gap-[10px]">
                <span
                  className="
                    font-['Urbanist']
                    text-[16px]
                    font-semibold
                    text-white
                  "
                >
                  {item.value}
                </span>

                {item.note && (
                  <span
                    className="
                      rounded-full
                      bg-[#1C1C1C]
                      px-[12px]
                      py-[5px]
                      font-['Urbanist']
                      text-[10px]
                      font-medium
                      text-[#999999]
                    "
                  >
                    {item.note}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const PricingDetails = ({
  title,
  description,
  noteTitle,
  noteText,
  listingPrice,
  sections,
}: PricingDetailsProps) => {
  return (
    <section className="w-full overflow-x-hidden bg-[#141414] text-white">
      <div
        className="
          mx-auto
          w-full
          max-w-[1596px]
          px-[24px]
          py-[80px]
          lg:px-[162px]
          lg:py-[150px]
          xl:px-[162px]
          xl:py-[150px]
        "
      >
        {/* ================= HEADER ================= */}

        <div className="w-full">
          <h2
            className="
              font-['Urbanist']
              text-[24px]
              font-semibold
              leading-[150%]
              text-white
              sm:text-[28px]
              lg:text-[32px]
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-[12px]
              max-w-[1200px]
              font-['Urbanist']
              text-[12px]
              font-medium
              leading-[150%]
              text-[#999999]
              sm:text-[13px]
              lg:text-[14px]
            "
          >
            {description}
          </p>
        </div>

        {/* ================= NOTE ================= */}

        <div
          className="
            mt-[80px]
            flex
            min-h-[52px]
            w-full
            items-center
            gap-[25px]
            rounded-[8px]
            border
            border-[#262626]
            bg-[#1A1A1A]
            px-[25px]
            py-[15px]
            lg:px-[30px]
          "
        >
          <span
            className="
              shrink-0
              font-['Urbanist']
              text-[13px]
              font-semibold
              text-white
            "
          >
            {noteTitle}
          </span>

          <p
            className="
              font-['Urbanist']
              text-[11px]
              font-medium
              leading-[150%]
              text-[#999999]
            "
          >
            {noteText}
          </p>
        </div>

        {/* ================= PRICING AREA ================= */}

        <div
          className="
            mt-[40px]
            grid
            grid-cols-1
            gap-[30px]

            xl:grid-cols-[minmax(0,230px)_minmax(0,1326px)]
            xl:gap-[40px]
          "
        >
          {/* ================= LISTING PRICE ================= */}

          <div
            className="
              w-full
              xl:w-[230px]
            "
          >
            <p
              className="
                font-['Urbanist']
                text-[12px]
                font-medium
                text-[#999999]
              "
            >
              Listing Price
            </p>

            <h3
              className="
                mt-[8px]
                whitespace-nowrap
                font-['Urbanist']
                text-[24px]
                font-semibold
                leading-[150%]
                text-white
                lg:text-[26px]
              "
            >
              {listingPrice}
            </h3>
          </div>

          {/* ================= RIGHT CONTAINERS ================= */}

          <div
            className="
              flex
              w-full
              min-w-0
              flex-col
              gap-[30px]
            "
          >
            {sections.map((section, index) => (
              <PricingCard
                key={index}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingDetails;