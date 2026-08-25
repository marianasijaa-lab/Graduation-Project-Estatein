import PropertyForm from "./PropertyForm";

interface InquireSectionProps {
  propertyName?: string;
  propertyLocation?: string;
}

const InquireSection = ({
  propertyName = "Seaside Serenity Villa",
  propertyLocation = "Seaside Serenity Villa, Malibu, California",
}: InquireSectionProps) => {
  return (
    <section className="w-full overflow-x-hidden bg-[#141414] text-white">
      <div
        className="
          mx-auto flex w-full flex-col
          gap-[100px]
          px-[20px] py-[70px]

          md:flex-row md:items-start
          md:gap-[40px] md:px-[40px] md:py-[80px]

          lg:gap-[70px] lg:px-[80px]

          xl:max-w-[1927px]
          xl:gap-[100px]
          xl:px-[162px]
          xl:py-[150px]
        "
      >
        {/* Description */}
        <div
          className="
            w-full shrink-0
            md:w-[35%]
            xl:h-[239px] xl:w-[519px]
          "
        >
          <h2
            className="
              font-['Urbanist']
              text-[26px] font-semibold
              leading-[130%] text-white
              md:text-[28px] xl:text-[30px]
            "
          >
            Inquire About {propertyName}
          </h2>

          <p
            className="
              mt-[20px] max-w-[519px]
              font-['Urbanist']
              text-[14px] font-medium
              leading-[150%] text-[#999999]
              md:text-[15px] xl:text-[16px]
            "
          >
            Interested in this property? Fill out the form below and our real
            estate experts will get back to you with more details, including
            scheduling a viewing and answering any questions you may have.
          </p>
        </div>

        {/* Form */}
        <PropertyForm propertyLocation={propertyLocation} />
      </div>
    </section>
  );
};

export default InquireSection;