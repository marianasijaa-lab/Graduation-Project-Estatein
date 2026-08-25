
export interface Property {
  id: number;
  image: string;
  tag?: string;
  name: string;
  descriptionShort: string;   // ← Home Page
  descriptionLong: string;    // ← Properties Page
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  bedroomIcon?: string;
  bathroomIcon?: string;
  propertyTypeIcon?: string;
  priceHome: number;
  priceProperties: number;
}

export const properties: Property[] = [
  {
    id: 1,
    image: "/assets/Discover1.webp",
    tag: "Coastal Escapes - Where Waves Beckon",
    name: "Seaside Serenity Villa",
    descriptionShort: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
    descriptionLong: "Wake up to the soothing melody of waves. This beachfront villa offers...",
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Villa",
    bedroomIcon: "/assets/icon_9.png",
    bathroomIcon: "/assets/icon_7.png",
    propertyTypeIcon: "/assets/icon_8.png",
    priceHome: 550000,
    priceProperties: 1250000,
  },
  {
    id: 2,
    image: "/assets/Discover2.webp",
    tag: "Urban Oasis - Life in the Heart of the City",
    name: "Metropolitan Haven",
    descriptionShort: "A chic and fully-furnished 2-bedroom apartment with panoramic city views.",
    descriptionLong: "Immerse yourself in the energy of the city. This modern apartment in the heart...",
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "Villa",
    bedroomIcon: "/assets/icon_9.png",
    bathroomIcon: "/assets/icon_7.png",
    propertyTypeIcon: "/assets/icon_8.png",
    priceHome: 550000,
    priceProperties: 650000,

  },
  {
    id: 3,
    image: "/assets/Discover3.webp",
    tag: "Countryside Charm - Escape to Nature's Embrace",
    name: "Rustic Retreat Cottage",
    descriptionShort: "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community.",
    descriptionLong: "Find tranquility in the countryside. This charming cottage is nestled amidst rolling hills...",
    bedrooms: 3,
    bathrooms: 3,
    propertyType: "Villa",
    bedroomIcon: "/assets/icon_9.png",
    bathroomIcon: "/assets/icon_7.png",
    propertyTypeIcon: "/assets/icon_8.png",
    priceHome: 550000,
    priceProperties: 350000,
  },
  {
    id: 4,
    image: "/assets/Discover3.webp",
    tag: "Countryside Charm - Escape to Nature's Embrace",
    name: "Rustic Retreat Cottage",
    descriptionShort: "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community.",
    descriptionLong: "Find tranquility in the countryside. This charming cottage is nestled amidst rolling hills...",
    bedrooms: 2,
    bathrooms:4,
    propertyType: "Villa",
    bedroomIcon: "/assets/icon_9.png",
    bathroomIcon: "/assets/icon_7.png",
    propertyTypeIcon: "/assets/icon_8.png",
    priceHome: 550000,
    priceProperties: 350000,
  },
];
