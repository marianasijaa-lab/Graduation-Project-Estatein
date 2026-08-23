import {
    FaBed,
    FaBath,
    FaRulerCombined,
    FaBolt,
  } from "react-icons/fa";
  
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
      <section className="w-full overflow-x-hidden bg-black text-white px-[20px] py-[60px] sm:px-[40px] lg:px-[80px]">
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1596px]
            flex-col
            gap-[30px]
            lg:flex-row
            lg:items-start
          "
        >
          {/* ================= LEFT : PROPERTY DESCRIPTION ================= */}
  
          <div
            className="
              flex
              h-auto
              w-full
              flex-col
              rounded-[10px]
              border
              border-[#262626]
              bg-[#141414]
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
                text-white
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
                text-[#999999]
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
                  <FaBed className="text-[16px] text-[#999999]" />
  
                  <span
                    className="
                      font-['Urbanist']
                      text-[14px]
                      font-medium
                      text-[#999999]
                    "
                  >
                    Bedrooms
                  </span>
                </div>
  
                <span
                  className="
                    font-['Urbanist']
                    text-[18px]
                    font-semibold
                    leading-[150%]
                    text-white
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
                  <FaBath className="text-[16px] text-[#999999]" />
  
                  <span
                    className="
                      font-['Urbanist']
                      text-[14px]
                      font-medium
                      text-[#999999]
                    "
                  >
                    Bathrooms
                  </span>
                </div>
                <span
                  className="
                    font-['Urbanist']
                    text-[18px]
                    font-semibold
                    leading-[150%]
                    text-white
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
                  <FaRulerCombined className="text-[16px] text-[#999999]" />
  
                  <span
                    className="
                      font-['Urbanist']
                      text-[14px]
                      font-medium
                      text-[#999999]
                    "
                  >
                    Area
                  </span>
                </div>
  
                <span
                  className="
                    whitespace-nowrap
                    font-['Urbanist']
                    text-[13px]
                    font-semibold
                    leading-[150%]
                    text-white
                    sm:text-[15px]
                  "
                >
                  {area}
                </span>
              </div>
            </div>
          </div>
  
          {/* ================= RIGHT : KEY FEATURES ================= */}
  
          <div
            className="
              flex
              h-auto
              w-full
              flex-col
              rounded-[10px]
              border
              border-[#262626]
              bg-[#141414]
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
                text-white
                sm:text-[22px]
              "
            >
              Key Features and Amenities
            </h2>
  
            {/* Features */}
  
            <div className="flex w-full flex-col gap-[20px]">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="
                    flex
                    h-[63px]
                    w-full
                    items-center
                    gap-[14px]
                    border-l-[1.5px]
                    border-l-[#703BF7]
                    bg-[#1A1A1A]
                    px-[22px]
                    sm:px-[24px]
                  "
                >
  
                  {/* White Lightning Icon */}
  
                  <FaBolt
                    className="
                      h-[20px]
                      w-[20px]
                      shrink-0
                      text-white
                    "
                  />
  
                  {/* Feature Text */}
  
                  <p
                    className="
                      truncate
                      font-['Urbanist']
                      text-[14px]
                      font-medium
                      leading-[150%]
                      text-[#999999]
                      sm:text-[15px]
                    "
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default PropertyDescription;