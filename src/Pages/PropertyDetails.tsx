import { useParams } from "react-router";
import PropertyDescription from "../components/sections/property/PropertyDescription";
import InquireSection from "../components/sections/property/InquireSection";
import PricingDetails from "../components/sections/property/PricingDetails";
import FAQSection from "../components/sections/property/FaqSection";
import { useProperties } from "../hooks/useProperties";
import { LoadingSkeleton } from "../components/ui/LoadingSkeleton";
import GallerySlider from "../components/ui/slider/GallerySlider";

export const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, status } = useProperties();

  // حالة التحميل
  if (status === 'loading' || status === 'idle') {
    return (
      <div className="site-container py-14">
        <LoadingSkeleton variant="list" count={3} />
      </div>
    );
  }

  // البحث عن العقار — id الآن string (Firestore document ID)
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-(--text-main) text-xl">Property not found.</p>
      </div>
    );
  }

  const galleryImages = property.images?.length
    ? property.images
    : [
        property.image,
        ...properties
          .filter((item) => item.id !== property.id && item.image !== property.image)
          .map((item) => item.image),
      ];

  return (
    <>
      <GallerySlider
        images={galleryImages}
        propertyName="Seaside Serenity Villa"
        location="Malibu, California"
        price={1250000}
      />
      <PropertyDescription
        description="Discover your own piece of paradise with the Seaside Serenity Villa. With an open floor plan, breathtaking ocean views from every room, and direct access to a pristine sandy beach, this property is the epitome of coastal living."
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

    </>
  );
};
