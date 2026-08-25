import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreProperty, DataStatus } from '../types';

const FALLBACK_PROPERTIES: FirestoreProperty[] = [
  {
    id: 'prop-1',
    image: '/assets/Discover1.webp',
    tag: 'Coastal Escapes - Where Waves Beckon',
    name: 'Seaside Serenity Villa',
    descriptionShort: 'A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood...',
    descriptionLong: 'Wake up to the soothing melody of waves. This beachfront villa offers...',
    bedrooms: 4, bathrooms: 3, propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 550000, priceProperties: 1250000,
    location: 'Malibu, California', size: 320, buildYear: 2019,
    amenities: ['Private Pool', 'Beach Access', 'Ocean View', 'Smart Home'],
    featured: true, currency: 'USD',
  },
  {
    id: 'prop-2',
    image: '/assets/Discover2.webp',
    tag: 'Urban Oasis - Life in the Heart of the City',
    name: 'Metropolitan Haven',
    descriptionShort: 'A chic and fully-furnished 2-bedroom apartment with panoramic city views...',
    descriptionLong: 'Immerse yourself in the energy of the city. This modern apartment in the heart...',
    bedrooms: 3, bathrooms: 2, propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 550000, priceProperties: 650000,
    location: 'Manhattan, New York', size: 180, buildYear: 2021,
    amenities: ['City View', 'Concierge', 'Gym', 'Rooftop Terrace'],
    featured: true, currency: 'USD',
  },
  {
    id: 'prop-3',
    image: '/assets/Discover3.webp',
    tag: "Countryside Charm - Escape to Nature's Embrace ",
    name: 'Rustic Retreat Cottage',
    descriptionShort: 'An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community...',
    descriptionLong: 'Find tranquility in the countryside. This charming cottage is nestled amidst rolling hills...',
    bedrooms: 2, bathrooms: 1, propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 550000, priceProperties: 350000,
    location: 'Aspen, Colorado', size: 120, buildYear: 2015,
    amenities: ['Garden', 'Fireplace', 'Mountain View'],
    featured: false, currency: 'USD',
  },
  {
    id: 'prop-4',
    image: '/assets/Villa1.webp',
    tag: 'For Sale',
    name: 'Azure Skyline Penthouse',
    descriptionShort: 'An ultra-luxury penthouse with panoramic 360° city views.',
    descriptionLong: "Perched atop one of the city's most prestigious towers, this extraordinary penthouse redefines luxury living.",
    bedrooms: 5, bathrooms: 4, propertyType: 'Villa',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 2800000, priceProperties: 2800000,
    location: 'Dubai Marina, UAE', size: 650, buildYear: 2022,
    amenities: ['Infinity Pool', 'Private Gym', '360° Views', 'Butler Service'],
    featured: true, currency: 'USD',
  },
  {
    id: 'prop-5',
    image: '/assets/Villa2.webp',
    tag: 'For Rent',
    name: 'Garden View Townhouse',
    descriptionShort: 'A spacious 3-bedroom townhouse with a beautiful private garden.',
    descriptionLong: 'This elegant townhouse offers the perfect blend of space and style with a stunning landscaped garden.',
    bedrooms: 3, bathrooms: 2, propertyType: 'Townhouse',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 3200, priceProperties: 3200,
    location: 'Kensington, London', size: 220, buildYear: 2018,
    amenities: ['Private Garden', 'Terrace', 'Parking'],
    featured: false, currency: 'USD',
  },
  {
    id: 'prop-6',
    image: '/assets/Hero Image_1.webp',
    tag: 'For Sale',
    name: 'Desert Oasis Estate',
    descriptionShort: 'A stunning 6-bedroom estate with resort-style amenities.',
    descriptionLong: 'Set in the exclusive desert landscape, this magnificent estate features resort-style amenities including a full-size tennis court and lagoon pool.',
    bedrooms: 6, bathrooms: 5, propertyType: 'Estate',
    bedroomIcon: '/assets/icon_9.png',
    bathroomIcon: '/assets/icon_7.png',
    propertyTypeIcon: '/assets/icon_8.png',
    priceHome: 4200000, priceProperties: 4200000,
    location: 'Scottsdale, Arizona', size: 850, buildYear: 2020,
    amenities: ['Tennis Court', 'Lagoon Pool', 'Home Theater', 'Guest House'],
    featured: true, currency: 'USD',
  },
];

interface PropertiesState {
  data: FirestoreProperty[];
  status: DataStatus;
  error: string | null;
}

const initialState: PropertiesState = {
  data: [],
  status: 'idle',
  error: null,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    // ── onSnapshot يُطلق هذا عند كل تغيير في Firestore ──────────────────
    syncProperties(state, action: PayloadAction<FirestoreProperty[]>) {
      state.data   = action.payload;
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
    // ── عمليات CRUD المحلية (تُستخدم مع addDocument / updateDocument / deleteDocument) ──
    addProperty(state, action: PayloadAction<FirestoreProperty>) {
      state.data.push(action.payload);
    },
    updateProperty(state, action: PayloadAction<FirestoreProperty>) {
      const index = state.data.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    removeProperty(state, action: PayloadAction<string>) {
      state.data = state.data.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  syncProperties,
  setPropertiesLoading,
  setPropertiesError,
  addProperty,
  updateProperty,
  removeProperty,
} = propertiesSlice.actions;
export default propertiesSlice.reducer;

export { FALLBACK_PROPERTIES };
