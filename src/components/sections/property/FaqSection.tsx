import React from "react";

const FAQSection = () => {
  return (
    <section
      className="
        w-full
        bg-[#141414]
        px-[24px]
        pt-[80px]
        pb-[40px]

        md:px-[40px]
        md:pt-[100px]
        md:pb-[50px]

        lg:px-[80px]
        lg:pt-[120px]
        lg:pb-[60px]
      "
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1280px]
          flex-col
          gap-[40px]

          md:flex-row
          md:items-start
          md:justify-between
          md:gap-[80px]
        "
      >
        {/* ================= TEXT ================= */}

        <div
          className="
            w-full
            max-w-[1003px]
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

              sm:text-[24px]
              lg:text-[28px]
            "
          >
            Frequently Asked Questions
          </h2>

          {/* Description */}

          <p
            className="
              mt-[10px]
              w-full
              font-['Urbanist']
              text-[12px]
              font-medium
              leading-[150%]
              text-[#999999]

              sm:text-[13px]
              lg:text-[14px]
            "
          >
            Find answers to common questions about Estatein's services,
            property listings, and the real estate process. We're here to
            provide clarity and assist you every step of the way.
          </p>
        </div>

        {/* ================= BUTTON ================= */}

        <div
          className="
            flex
            w-full
            shrink-0
            justify-start

            md:w-[127px]
            md:pt-[66px]
          "
        >
          <button
            type="button"
            className="
              h-[49px]
              w-[127px]
              rounded-[6px]
              border
              border-[#262626]
              bg-[#1A1A1A]
              font-['Urbanist']
              text-[12px]
              font-medium
              text-white
              transition
              hover:bg-[#222222]
            "
          >
            View All FAQ’s
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;