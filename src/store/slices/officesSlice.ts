import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreOffice, DataStatus } from '../types';

export const FALLBACK_OFFICES: FirestoreOffice[] = [
  {
    id: 'off-1',
    name: 'Estatein HQ — New York',
    address: '350 Fifth Avenue, Suite 4200',
    city: 'New York',
    country: 'United States',
    phone: '+1 (212) 555-0100',
    email: 'newyork@estatein.com',
    type: 'Regional',
    latitude: 40.7484,
    longitude: -73.9967,
    image: '/assets/Contact1.webp',
    description:
      'Our flagship office in the heart of Manhattan, home to the leadership team and our largest group of advisors.',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=350+Fifth+Avenue+New+York',
    order: 1,
  },
  {
    id: 'off-2',
    name: 'Estatein — Los Angeles',
    address: '9465 Wilshire Boulevard, Suite 300',
    city: 'Los Angeles',
    country: 'United States',
    phone: '+1 (310) 555-0200',
    email: 'losangeles@estatein.com',
    type: 'Regional',
    latitude: 34.0736,
    longitude: -118.3994,
    image: '/assets/Contact2.webp',
    description:
      'Serving the West Coast luxury market from Beverly Hills, with a dedicated team for coastal and hillside properties.',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=9465+Wilshire+Boulevard+Los+Angeles',
    order: 2,
  },
  {
    id: 'off-3',
    name: 'Estatein — London',
    address: '1 Canada Square, Canary Wharf',
    city: 'London',
    country: 'United Kingdom',
    phone: '+44 20 5555 0300',
    email: 'london@estatein.com',
    type: 'International',
    latitude: 51.5045,
    longitude: -0.0199,
    image: '/assets/Contact3.webp',
    description:
      'Our European headquarters, coordinating cross-border investments and international client relationships.',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=1+Canada+Square+Canary+Wharf+London',
    order: 3,
  },
  {
    id: 'off-4',
    name: 'Estatein — Dubai',
    address: 'Level 14, Emaar Square, Downtown Dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    phone: '+971 4 555 0400',
    email: 'dubai@estatein.com',
    type: 'International',
    latitude: 25.1972,
    longitude: 55.2744,
    image: '/assets/Contact4.webp',
    description:
      'Covering the Middle East with expertise in off-plan developments and high-yield investment opportunities.',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Emaar+Square+Downtown+Dubai',
    order: 4,
  },
  {
    id: 'off-5',
    name: 'Estatein — Singapore',
    address: '8 Marina View, Asia Square Tower 1',
    city: 'Singapore',
    country: 'Singapore',
    phone: '+65 6555 0500',
    email: 'singapore@estatein.com',
    type: 'International',
    latitude: 1.2789,
    longitude: 103.8536,
    image: '/assets/Contact5.webp',
    description:
      'Our Asia-Pacific hub, connecting regional investors with premium residential and commercial listings worldwide.',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=8+Marina+View+Asia+Square+Singapore',
    order: 5,
  },
  {
    id: 'off-6',
    name: 'Estatein — Sydney',
    address: '1 Martin Place, Level 20',
    city: 'Sydney',
    country: 'Australia',
    phone: '+61 2 5555 0600',
    email: 'sydney@estatein.com',
    type: 'International',
    latitude: -33.8674,
    longitude: 151.2071,
    image: '/assets/Contact6.webp',
    description:
      'Representing Estatein across Australia and New Zealand, specialising in waterfront and metropolitan homes.',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=1+Martin+Place+Sydney',
    order: 6,
  },
];

interface OfficesState {
  data: FirestoreOffice[];
  status: DataStatus;
  error: string | null;
  activeTab: 'All' | 'Regional' | 'International';
}

const initialState: OfficesState = {
  data: [],
  status: 'idle',
  error: null,
  activeTab: 'All',
};

// Redux slice for the company offices collection.
const officesSlice = createSlice({
  name: 'offices',
  initialState,
  reducers: {
    syncOffices(state, action: PayloadAction<FirestoreOffice[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setOfficesLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setOfficesError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
    setActiveTab(state, action: PayloadAction<'All' | 'Regional' | 'International'>) {
      state.activeTab = action.payload;
    },
  },
});

export const {
  syncOffices,
  setOfficesLoading,
  setOfficesError,
  setActiveTab,
} = officesSlice.actions;
export default officesSlice.reducer;
