import { motion } from "framer-motion";
import { SectionHeader } from "../../common/SectionHeader";
import { FadeInSection } from "../../common/FadeInSection";
import { StaggerContainer, staggerItem } from "../../common/StaggerContainer";

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
    <div className="w-full rounded-[10px] border border-bg-gray-1 bg-(--bg-mian)">
      {/* ================= CARD HEADER ================= */}

      <div className="relative flex h-[96px] items-center justify-between px-[32px] after:absolute after:bottom-0 after:left-[32px] after:right-[32px] after:h-px after:bg-[#262626]">
        <h3 className="font-['Urbanist'] text-[20px] font-semibold text-(--text-main)">
          {title}
        </h3>

        <button
          type="button"
          className="
            h-[50px]
            rounded-lg
            border
            border-[#262626]
            bg-(--bg-secondary)
            px-[18px]
            font-['Urbanist']
            text-[14px]
            font-medium
            text-(--text-main)
            transition
            hover:bg-[#222222]
          "
        >
          Learn More
        </button>
      </div>

      {/* ================= ITEMS ================= */}

      <div className="px-[15px] md:px-[32px]">
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
                min-h-[105px]
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
                    ? "md:relative md:pl-[12px] lg:pl-[12px] md:before:absolute md:before:left-0 md:before:top-[30px] md:before:bottom-[30px] md:before:w-px md:before:bg-[#262626]"
                    : ""
                }

                ${
                  !isMonthlyCosts &&
                  !item.fullWidth &&
                  index % 2 === 0
                    ? "md:pr-[12px] lg:pr-[12px]"
                    : ""
                }`
              }
            >
              {/* Label */}

              <p
                className="
                  font-['Urbanist']
                  text-[16px]
                  font-medium
                  text-gray
                  md:text-sm
                "
              >
                {item.label}
              </p>

              {/* Value + Note */}

              <div className="mt-[8px] grid grid-cols-[max-content_minmax(0,1fr)] items-center gap-[16px] md:flex md:flex-wrap">
                <span
                  className="
                    text-[22px]
                    font-semibold
                    text-(--text-main)
                    md:text-[20px]
                  "
                >
                  {item.value}
                </span>

                {item.note && (
                  <span
                    className={`
                      min-w-0
                      w-fit
                      max-w-full
                      ${item.note.length > 35 ? "rounded-[6px]" : "rounded-[28px]"}
                      bg-(--bg-secondary)
                      border border-bg-gray-1
                      px-[12px]
                      py-[8px]
                      font-['Urbanist']
                      text-[16px]
                      font-medium
                      leading-[150%]
                      text-gray
                      md:rounded-full
                      md:text-[13px]
                    `}
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
    <section className="w-full overflow-x-hidden bg-(--bg-main) text-(--text-main)">
      <div
        className="
          mx-auto
          w-full
          max-w-[1596px]
          px-[24px]
          py-[40px]
          sm:px-[32px]
          lg:px-[40px]
          lg:py-[40px]
        "
      >
        {/* ================= HEADER ================= */}

        <SectionHeader
          title={title}
          subtitle={description}
          fullWidth
          className="mb-0"
        />

        {/* ================= NOTE ================= */}

        <FadeInSection
          direction="up"
          className="
            mt-[50px]
            flex
            min-h-[72px]
            w-full
            flex-col
            items-start
            gap-[16px]
            rounded-[8px]
            border
            border-[#262626]
            bg-(--bg-secondary)
            px-[25px]
            py-[22px]
            lg:flex-row
            lg:items-center
            lg:gap-[25px]
            lg:px-[30px]
          "
        >
          <span
            className="
              relative
              w-full
              shrink-0
              pb-[16px]
              font-['Urbanist']
              text-[18px]
              font-semibold
              text-(--text-main)
              after:absolute
              after:bottom-0
              after:left-0
              after:right-0
              after:h-px
              after:w-full
              after:bg-[#262626]
              lg:w-auto
              lg:pb-0
              lg:pr-[25px]
              lg:after:bottom-auto
              lg:after:left-auto
              lg:after:top-1/2
              lg:after:h-[42px]
              lg:after:w-px
              lg:after:-translate-y-1/2
            "
          >
            {noteTitle}
          </span>

          <p
            className="
              font-['Urbanist']
              text-[14px]
              font-medium
              leading-[150%]
              text-gray
            "
          >
            {noteText}
          </p>
        </FadeInSection>

        {/* ================= PRICING AREA ================= */}

        <div
          className="
            mt-[40px]
            grid
            grid-cols-1
            gap-[30px]

            lg:grid-cols-[minmax(0,170px)_minmax(0,1fr)]
            lg:gap-[40px]
          "
        >
          {/* ================= LISTING PRICE ================= */}

          <div
            className="
              w-full
              lg:w-[170px]
              gap-0
            grid
            grid-cols-1
            self-start
            "
          >
            <p
              className="
                font-['Urbanist']
                text-[14px]
                font-medium
                text-gray
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
                text-(--text-main)
                lg:text-[26px]
              "
            >
              {listingPrice}
            </h3>
          </div>

          {/* ================= RIGHT CONTAINERS ================= */}
          <StaggerContainer className="flex w-full min-w-0 flex-col gap-[30px]" staggerDelay={0.1}>
            {sections.map((section, index) => (
              <motion.div key={index} variants={staggerItem}>
                <PricingCard title={section.title} items={section.items} />
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default PricingDetails;