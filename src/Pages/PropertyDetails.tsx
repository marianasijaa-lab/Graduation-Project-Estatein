
import PropertyDescription from "../components/sections/property/PropertyDescription";
import InquireSection from "../components/sections/property/InquireSection";
import PricingDetails from "../components/sections/property/PricingDetails";
import FAQSection from "../components/sections/property/FaqSection";
import FAQSlider from "../components/ui/slider/FAQSlider";
import { CtaSection } from "../components/sections/cta/CTA";
export const  PropertyDetails = () => {
  return (
    <>
      <PropertyDescription
        description="Discover your own piece of paradise with the Seaside Serenity Villa. This stunning property offers breathtaking ocean views, luxurious amenities, and a peaceful atmosphere perfect for relaxation and comfort."
        bedrooms="04"
        bathrooms="03"
        area="2,500 Square Feet"
        features={[
          "Expansive oceanfront terrace for outdoor entertaining",
          "Gourmet kitchen with top-of-the-line appliances",
          "Private beach access for morning strolls and sunset views",
          "Master suite with a spa-inspired bathroom and ocean-facing balcony",
          "Private garage and ample storage space",
        ]}
      />
      <InquireSection
  propertyName="Seaside Serenity Villa"
  propertyLocation="Seaside Serenity Villa, Malibu, California"
/>
<PricingDetails
  title="Comprehensive Pricing Details"
  description="At Estates, transparency is key. We want you to have a clear understanding of all costs associated with your property investment. Below, we break down the pricing for Seaside Serenity Villa to help you make an informed decision."
  noteTitle="Note"
  noteText="The figures provided above are estimates and may vary depending on the property, location, and individual circumstances."
  listingPrice="$1,250,000"
  sections={[
    {
      title: "Additional Fees",
      items: [
        {
          label: "Property Transfer Tax",
          value: "$25,000",
          note: "Based on the sale price and local regulations",
        },
        {
          label: "Legal Fees",
          value: "$3,000",
          note: "Approximate cost for legal services, including title transfer",
        },
        {
          label: "Home Inspection",
          value: "$500",
          note: "Recommended for due diligence",
        },
        {
          label: "Property Insurance",
          value: "$1,200",
          note: "Annual cost for comprehensive property insurance",
        },
        {
          label: "Mortgage Fees",
          value: "Varies",
          note: "If applicable, consult with your lender for specific details",
          fullWidth: true,
        },
      ],
    },

    {
      title: "Monthly Costs",
      items: [
        {
          label: "Property Taxes",
          value: "$1,250",
          note: "Approximate monthly property tax based on sale price and local rates",
        },
        {
          label: "Homeowners Association Fee",
          value: "$300",
          note: "Monthly fee for common area maintenance and security",
        },
      ],
    },

    {
      title: "Total Initial Costs",
      items: [
        {
          label: "Listing Price",
          value: "$1,250,000",
        },
        {
          label: "Additional Fees",
          value: "$29,700",
          note: "Property transfer tax, legal fees, inspection, insurance",
        },
        {
          label: "Down Payment",
          value: "$250,000",
          note: "20%",
        },
        {
          label: "Mortgage Amount",
          value: "$1,000,000",
          note: "If applicable",
        },
      ],
    },

    {
      title: "Monthly Expenses",
      items: [
        {
          label: "Property Taxes",
          value: "$1,250",
        },
        {
          label: "Homeowners Association Fee",
          value: "$300",
        },
        {
          label: "Mortgage Payment",
          value: "Varies based on terms and interest rate",
          note: "If applicable",
        },
        {
          label: "Property Insurance",
          value: "$100",
          note: "Approximate monthly cost",
        },
      ],
    },
  ]}
/>
<FAQSection/>
<FAQSlider/>
<CtaSection
            bgLeftImage="public/assets/Abstract2.png"
            bgRightImage="public/assets/Abstract1.png"
            renderButton={() => (
                <a
                    href="/properties"
                    className="w-full sm:w-auto text-center bg-primary hover:bg-[#5e2ed9] text-white text-sm font-medium px-6 py-3.5 rounded-lg transition-colors whitespace-nowrap inline-block"
                >
                    Explore Properties
                </a>
            )}
        />
    </>
  );
};