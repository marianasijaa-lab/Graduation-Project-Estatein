import PropertyForm from "./PropertyForm";
import { SectionHeader } from "../../common/SectionHeader";
import { FadeInSection } from "../../common/FadeInSection";
interface InquireSectionProps {
  propertyId?: string;
  propertyName?: string;
  propertyLocation?: string;
}

const InquireSection = ({
  propertyId,
  propertyName = "Seaside Serenity Villa",
  propertyLocation = "Seaside Serenity Villa, Malibu, California",
}: InquireSectionProps) => {
  return (
    <section className="w-full overflow-x-hidden bg-(--bg-secondary) text-(--text-main)">
      <div
        className="
          site-container flex flex-col
          gap-[60px]
          py-[50px]

          lg:flex-row lg:items-start
          lg:gap-[40px] lg:py-[80px]

          xl:gap-[100px]
          xl:py-[150px]
        "
      >
        
        {/* Description */}
        <FadeInSection className="w-full shrink-0 lg:w-[30%] xl:w-[519px]">
          <SectionHeader
            title={`Inquire About ${propertyName}`}
            subtitle="Interested in this property? Fill out the form below and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have."
            className="mb-0"
            fullWidth
          />
        </FadeInSection>

        {/* Form */}
        <div className="w-full min-w-0 lg:flex-1">
          <PropertyForm
            propertyId={propertyId}
            propertyName={propertyName}
            propertyLocation={propertyLocation}
          />
        </div>
      </div>
    </section>
  );
};

export default InquireSection;