import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreProperty, DataStatus } from '../types';

const FALLBACK_PROPERTIES: FirestoreProperty[] = [
  {
    id: 'prop-1',
    image: '/assets/Discover1.webp',
    tag: 'Coastal Escapes - Where Waves Beckon',
    name: 'Seaside Serenity Villa',
    descriptionShort: 'A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood...',
    descriptionLong: 'Discover your own piece of paradise with the Seaside Serenity Villa. With an open floor plan, breathtaking ocean views from every room, and direct access to a pristine sandy beach, this property is the epitome of coastal living.',
    bedrooms: 4, bathrooms: 3, propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 550000, priceProperties: 550000,
    location: 'Malibu, California', size: 2500, buildYear: 2019,
    amenities: [
      'Expansive oceanfront terrace for outdoor entertaining',
      'Gourmet kitchen with top-of-the-line appliances',
      'Private beach access for morning strolls and sunset views',
      'Master suite with a spa-inspired bathroom and ocean-facing balcony',
      'Private garage and ample storage space',
    ],
    featured: true, currency: 'USD', order: 1,
  },
  {
    id: 'prop-2',
    image: '/assets/Discover2.webp',
    tag: 'Urban Oasis - Life in the Heart of the City',
    name: 'Metropolitan Haven',
    descriptionShort: 'A chic and fully-furnished 2-bedroom apartment with panoramic city views...',
    descriptionLong: 'Discover your own piece of paradise with the Seaside Serenity Villa. With an open floor plan, breathtaking ocean views from every room, and direct access to a pristine sandy beach, this property is the epitome of coastal living.',
    bedrooms: 4, bathrooms: 3, propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 550000, priceProperties: 550000,
    location: 'Manhattan, New York', size: 2500, buildYear: 2021,
    amenities: [
      'Floor-to-ceiling windows with sweeping panoramic city views',
      'Dedicated concierge service available around the clock',
      'State-of-the-art fitness center with the latest equipment',
      'Private rooftop terrace perfect for entertaining and relaxing',
      'Secure underground parking with direct elevator access',
    ],
    featured: true, currency: 'USD', order: 2,
  },
  {
    id: 'prop-3',
    image: '/assets/Discover3.webp',
    tag: "Countryside Charm - Escape to Nature's Embrace ",
    name: 'Rustic Retreat Cottage',
    descriptionShort: 'An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community...',
    descriptionLong: 'Find tranquility in the countryside. This charming cottage is nestled amidst rolling hills and lush greenery, offering a perfect escape from city life with rustic charm and modern comforts.',
    bedrooms: 2, bathrooms: 1, propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 550000, priceProperties: 550000,
    location: 'Aspen, Colorado', size: 2500, buildYear: 2015,
    amenities: [
      'Expansive oceanfront terrace for outdoor entertaining',
      'Gourmet kitchen with top-of-the-line appliances',
      'Private beach access for morning strolls and sunset views',
      'Master suite with a spa-inspired bathroom and ocean-facing balcony',
      'Private garage and ample storage space',
    ],
    featured: false, currency: 'USD', order: 3,
  },
  {
    id: 'prop-4',
    image: '/assets/Villa1.webp',
    tag: 'For Sale',
    name: 'Azure Skyline Penthouse',
    descriptionShort: 'An ultra-luxury penthouse with panoramic 360° city views.',
    descriptionLong: "Perched atop one of the city's most prestigious towers, this extraordinary penthouse redefines luxury living. Enjoy 360° panoramic views, a private pool, and bespoke interiors crafted by world-renowned designers.",
    bedrooms: 5, bathrooms: 4, propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 2800000, priceProperties: 2800000,
    location: 'Dubai Marina, UAE', size: 2500, buildYear: 2022,
    amenities: [
      'Expansive oceanfront terrace for outdoor entertaining',
      'Gourmet kitchen with top-of-the-line appliances',
      'Private beach access for morning strolls and sunset views',
      'Master suite with a spa-inspired bathroom and ocean-facing balcony',
      'Private garage and ample storage space',
    ],
    featured: true, currency: 'USD', order: 4,
  },
  {
    id: 'prop-5',
    image: '/assets/Villa2.webp',
    tag: 'For Rent',
    name: 'Garden View Townhouse',
    descriptionShort: 'A spacious 3-bedroom townhouse with a beautiful private garden.',
    descriptionLong: 'This elegant townhouse offers the perfect blend of space and style. The open-plan ground floor flows seamlessly into a stunning landscaped garden, while three well-appointed bedrooms upstairs ensure comfort for the whole family.',
    bedrooms: 3, bathrooms: 2, propertyType: 'Townhouse',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 3200, priceProperties: 3200,
    location: 'Kensington, London', size: 2500, buildYear: 2018,
    amenities: [
      'Expansive oceanfront terrace for outdoor entertaining',
      'Gourmet kitchen with top-of-the-line appliances',
      'Private beach access for morning strolls and sunset views',
      'Master suite with a spa-inspired bathroom and ocean-facing balcony',
      'Private garage and ample storage space',
    ],
    featured: false, currency: 'USD', order: 5,
  },
  {
    id: 'prop-6',
    image: '/assets/Hero Image_1.webp',
    tag: 'For Sale',
    name: 'Desert Oasis Estate',
    descriptionShort: 'A stunning 6-bedroom estate with resort-style amenities.',
    descriptionLong: 'Set in the exclusive desert landscape, this magnificent estate features resort-style amenities including a full-size tennis court, a lagoon pool with a waterfall, and a home theater. The gourmet kitchen and formal dining room make it ideal for grand entertaining.',
    bedrooms: 6, bathrooms: 5, propertyType: 'Estate',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 4200000, priceProperties: 4200000,
    location: 'Scottsdale, Arizona', size: 2500, buildYear: 2020,
    amenities: [
      'Expansive oceanfront terrace for outdoor entertaining',
      'Gourmet kitchen with top-of-the-line appliances',
      'Private beach access for morning strolls and sunset views',
      'Master suite with a spa-inspired bathroom and ocean-facing balcony',
      'Private garage and ample storage space',
    ],
    featured: true, currency: 'USD', order: 6,
  },
  {
    id: 'prop-7',
    image: '/assets/Hero Image_1.webp',
    tag: 'For Sale',
    name: 'Seaside Serenity Villa II',
    descriptionShort: 'A stunning beachfront villa with breathtaking ocean views and direct beach access.',
    descriptionLong: 'Discover your own piece of paradise with the Seaside Serenity Villa. With an open floor plan, breathtaking ocean views from every room, and direct access to a pristine sandy beach, this property is the epitome of coastal living.',
    bedrooms: 4, bathrooms: 3, propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 1250000, priceProperties: 1250000,
    location: 'Malibu, California', size: 2500, buildYear: 2020,
    amenities: [
      'Expansive oceanfront terrace for outdoor entertaining',
      'Gourmet kitchen with top-of-the-line appliances',
      'Private beach access for morning strolls and sunset views',
      'Master suite with a spa-inspired bathroom and ocean-facing balcony',
      'Private garage and ample storage space',
    ],
    featured: true, currency: 'USD', order: 7,
  },
];

interface PropertiesState {
  data: FirestoreProperty[];
  status: DataStatus;
  error: string | null;
}

const initialState: PropertiesState = {
  data: FALLBACK_PROPERTIES,
  status: 'idle',
  error: null,
};

// Redux slice for the properties collection.
const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    // Fired by onSnapshot on every Firestore change.
    syncProperties(state, action: PayloadAction<FirestoreProperty[]>) {
      // Sort by order field if present, fallback to prop-N id pattern, then alphabetical
      const sortedData = [...action.payload].sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;
        const aId = typeof a.id === 'string' ? a.id : '';
        const bId = typeof b.id === 'string' ? b.id : '';
        const aNum = parseInt(aId.replace('prop-', ''), 10);
        const bNum = parseInt(bId.replace('prop-', ''), 10);
        if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) return aNum - bNum;
        return aId.localeCompare(bId);
      });
      state.data   = sortedData;
      state.status = 'succeeded';
      state.error  = null;
    },
    setPropertiesLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setPropertiesError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncProperties,
  setPropertiesLoading,
  setPropertiesError,
} = propertiesSlice.actions;
export default propertiesSlice.reducer;

export { FALLBACK_PROPERTIES };
