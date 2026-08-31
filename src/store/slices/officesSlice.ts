import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreOffice, DataStatus } from '../types';

export const FALLBACK_OFFICES: FirestoreOffice[] = [
  {
    id: 'off-1',
    name: '123 Estatein Plaza, City Center, Metropolis',
    address: '123 Estatein Plaza, City Center, Metropolis',
    city: 'Metropolis',
    country: '',
    phone: '+1 (123) 456-7890',
    email: 'info@estatein.com',
    type: 'International',
    description:
      'Our main headquarters serve as the heart of Estatein. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us.',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Metropolis+889+Francisco+Street+Los+Angeles',
    order: 1,
  },
  {
    id: 'off-2',
    name: '456 Urban Avenue, Downtown District, Metropolis',
    address: '456 Urban Avenue, Downtown District, Metropolis',
    city: 'Metropolis',
    country: '',
    phone: '+1 (123) 628-7890',
    email: 'info@restatein.com',
    type: 'Regional',
    description:
      "Estatein's presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets.",
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Metropolis+889+Francisco+Street+Los+Angeles',
    order: 2,
  },
];

interface OfficesState {
  data: FirestoreOffice[];
  status: DataStatus;
  error: string | null;
  activeTab: string;
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
      state.data = action.payload;
      state.status = 'succeeded';
      state.error = null;

      // Only reset the active tab if the currently selected type no longer
      // exists in the new data (e.g. the last office of that type was deleted).
      // Do NOT reset on every snapshot — that would clear the user's selection
      // every time Firestore pushes an update.
      const tabStillValid =
        state.activeTab === 'All' ||
        action.payload.some((office) => office.type === state.activeTab);

      if (!tabStillValid) {
        state.activeTab = 'All';
      }
    },
    setOfficesLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setOfficesError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
    setActiveTab(state, action: PayloadAction<string>) {
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
