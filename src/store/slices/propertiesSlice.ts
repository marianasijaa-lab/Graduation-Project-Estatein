import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestoreDb } from '../../firebase/config';
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

export const fetchProperties = createAsyncThunk<FirestoreProperty[]>(
  'properties/fetchAll',
  async () => {
    if (!firestoreDb) return FALLBACK_PROPERTIES;
    const querySnapshot = await getDocs(collection(firestoreDb, 'properties'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirestoreProperty[];
  }
);

// Real Firestore writes for the dashboard. Additive alongside fetchProperties
// and the local addProperty/updateProperty/removeProperty reducers below —
// nothing about the read side changes.
export const createPropertyDoc = createAsyncThunk<FirestoreProperty, Omit<FirestoreProperty, 'id'>>(
  'properties/create',
  async (property) => {
    if (!firestoreDb) return { ...property, id: crypto.randomUUID() };
    const docRef = await addDoc(collection(firestoreDb, 'properties'), property);
    return { id: docRef.id, ...property };
  }
);

export const updatePropertyDoc = createAsyncThunk<FirestoreProperty, FirestoreProperty>(
  'properties/update',
  async (property) => {
    const { id, ...rest } = property;
    if (firestoreDb) await updateDoc(doc(firestoreDb, 'properties', id), rest);
    return property;
  }
);

export const deletePropertyDoc = createAsyncThunk<string, string>(
  'properties/delete',
  async (id) => {
    if (firestoreDb) await deleteDoc(doc(firestoreDb, 'properties', id));
    return id;
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'فشل جلب العقارات';
      })
      .addCase(createPropertyDoc.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updatePropertyDoc.fulfilled, (state, action) => {
        const index = state.data.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deletePropertyDoc.fulfilled, (state, action) => {
        state.data = state.data.filter((p) => p.id !== action.payload);
      });
  },
});

export const { addProperty, updateProperty, removeProperty } = propertiesSlice.actions;
export default propertiesSlice.reducer;
