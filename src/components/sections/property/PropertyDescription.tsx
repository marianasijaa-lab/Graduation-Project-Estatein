import {
  FaBath,
  FaBolt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { FadeInSection } from "../../common/FadeInSection";
import { StaggerContainer, staggerItem } from "../../common/StaggerContainer";

interface PropertyDescriptionProps {
  description: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  features: string[];
}

const PropertyDescription = ({
  description,
  bedrooms,
  bathrooms,
  area,
  features,
}: PropertyDescriptionProps) => {
  
  return (
    <section className="w-full overflow-x-hidden bg-(--bg-main) text-(--text-main) py-[60px]">
      <div
        className="
          site-container
          flex
          w-full
          flex-col
          gap-[30px]
          lg:flex-row
          lg:items-start
        "
      >
        {/* ================= LEFT : PROPERTY DESCRIPTION ================= */}

        <FadeInSection
          direction="left"
          className="
            flex
            h-auto
            w-full
            flex-col
            rounded-[10px]
            border
            border-bg-gray-1
            bg-(--bg-main)
            p-[30px]
            sm:p-[40px]
            lg:flex-1
            lg:p-[50px]
         "
        >
          {/* Title */}

          <h2
            className="
              font-['Urbanist']
              text-[20px]
              font-semibold
              leading-[150%]
              text-(--text-main)
              sm:text-[22px]
            "
          >
            Description
          </h2>

          {/* Description */}

          <p
            className="
              mt-[16px]
              max-w-full
              font-['Urbanist']
              text-[14px]
              font-medium
              leading-[150%]
              text-gray
              sm:text-[15px]
            "
          >
            {description}
          </p>

          {/* Horizontal Divider */}

          <div className="my-[30px] h-px w-full bg-[#333333]" />

          {/* Property Information */}

          <div
            className="
              grid
              grid-cols-2
              gap-y-[25px]
              sm:grid-cols-[1fr_1fr_auto]
              sm:gap-y-0
            "
          >
            {/* ================= BEDROOMS ================= */}

            <div
              className="
                flex
                flex-col
                gap-[10px]
                border-r
                border-[#333333]
                pr-[20px]
                sm:border-r
              "
            >
              <div className="flex items-center gap-[8px]">
                <img
                  src="/assets/icon_9.png"
                  alt=""
                  className="h-[20px] w-[20px] object-contain"
                  style={{ filter: "brightness(0) saturate(100%) invert(60%)" }}
                />

                <span
                  className="
                    leading-[150%]
                    text-[14px]
                    font-medium
                    text-gray
                  "
                >
                  Bedrooms
                </span>
              </div>

              <span
                className="
                  text-[18px]
                  font-semibold
                  leading-[150%]
                  text-(--text-main)
                "
              >
                {bedrooms}
              </span>
            </div>

            {/* ================= BATHROOMS ================= */}

            <div
              className="
                flex
                flex-col
                gap-[10px]
                pl-[20px]
                sm:border-r
                sm:border-[#333333]
              "
            >
              <div className="flex items-center gap-[8px]">
                <FaBath className="text-[20px] text-gray" />

                <span
                  className="
                    leading-[150%]
                    text-[14px]
                    font-medium
                    text-gray
                  "
                >
                  Bathrooms
                </span>
              </div>
              <span
                className="
                  text-[18px]
                  font-semibold
                  leading-[150%]
                  text-(--text-main)
                "
              >
                {bathrooms}
              </span>
            </div>

            {/* ================= AREA ================= */}

            <div
              className="
                col-span-2
                flex
                flex-col
                gap-[10px]
                border-t
                border-[#333333]
                pt-[20px]
                sm:col-span-1
                sm:border-t-0
                sm:pl-[20px]
                sm:pt-0
              "
            >
              <div className="flex items-center gap-[8px]">
                <img
                  src="/assets/Icon_36.png"
                  alt=""
                  className="h-[18px] w-[18px] object-contain"
                />

                <span
                  className="
                    leading-[150%]
                    text-[14px]
                    font-medium
                    text-gray
                  "
                >
                  Area
                </span>
              </div>

              <span
                className="
                  whitespace-nowrap
                  font-['Urbanist']
                  text-[18px]
                  font-semibold
                  leading-[150%]
                  text-(--text-main)
                  
                "
              >
                {area}
              </span>
            </div>
          </div>
        </FadeInSection>

        {/* ================= RIGHT : KEY FEATURES ================= */}

        <FadeInSection
          direction="right"
          className="
            flex
            h-auto
            w-full
            flex-col
            rounded-xl
            border
            border-bg-gray-1
            bg-(--bg-main)
            p-[30px]
            sm:p-[40px]
            lg:flex-1
            lg:p-[38px]
          "
        >
          {/* Title */}

          <h2
            className="
              mb-[30px]
              text-[20px]
              font-semibold
              leading-[150%]
              text-(--text-main)
              sm:text-[22px]
            "
          >
            Key Features and Amenities
          </h2>

          {/* Features */}

          <StaggerContainer className="flex w-full flex-col gap-[20px]">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="
                  flex
                  min-h-[50px]
                  w-full
                  items-center
                  gap-[14px]
                  border-l-[1.5px]
                  border-l-primary
                  bg-(--bg-secondary)
                  px-[16px]
                  py-[12px]
                  sm:min-h-[63px]
                  sm:px-[24px]
                  sm:py-[10px]
                "
              >

                {/* White Lightning Icon */}

                <FaBolt
                  className="
                    h-[16px]
                    w-[16px]
                    shrink-0
                    text-(--text-main)
                    sm:h-[20px]
                    sm:w-[20px]
                  "
                />

                {/* Feature Text */}

                <p
                  className="
                    text-[12px]
                    font-medium
                    leading-[140%]
                    text-gray
                    sm:text-[15px]
                    sm:leading-[150%]
                  "
                >
                  {feature}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </FadeInSection>
      </div>
    </section>
  );
};

export default PropertyDescription;