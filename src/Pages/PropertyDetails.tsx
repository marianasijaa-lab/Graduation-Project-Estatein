
import PropertyDescription from "../components/sections/property/PropertyDescription";
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
    </>
  );
};