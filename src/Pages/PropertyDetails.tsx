import { useParams } from "react-router";
import PropertyDescription from "../components/sections/property/PropertyDescription";
import { useProperties } from "../hooks/useProperties";
import { LoadingSkeleton } from "../components/ui/LoadingSkeleton";

export const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, status } = useProperties();

  // حالة التحميل
  if (status === 'loading' || status === 'idle') {
    return (
      <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <LoadingSkeleton variant="list" count={3} />
      </div>
    );
  }

  // البحث عن العقار — id الآن string (Firestore document ID)
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-white text-xl">Property not found.</p>
      </div>
    );
  }

  return (
    <>
      <PropertyDescription
        description={property.descriptionLong}
        bedrooms={String(property.bedrooms ?? 0).padStart(2, "0")}
        bathrooms={String(property.bathrooms ?? 0).padStart(2, "0")}
        area="2,500 Square Feet"
        features={[
          "Expansive oceanfront terrace for outdoor entertaining",
          "Gourmet kitchen with top-of-the-line appliances",
          "Private beach access for morning strolls and sunset views",
          "Master suite with a spa-inspired bathroom and ocean-facing balcony",
          "Private garage and ample storage space",
        ]}
      />
    </>
  );
};
