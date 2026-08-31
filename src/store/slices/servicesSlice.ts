import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreService, DataStatus } from '../types';

export const FALLBACK_SERVICES: FirestoreService[] = [
  { id: 'svc-1', icon: '/assets/Icon_1.png', heading: 'Find Your Dream Home' },
  { id: 'svc-2', icon: '/assets/Icon_2.png', heading: 'Unlock Property Value' },
  { id: 'svc-3', icon: '/assets/Icon_3.png', heading: 'Effortless Property Management' },
  { id: 'svc-4', icon: '/assets/Icon_4.png', heading: 'Smart Investments, Informed Decisions' },
];

interface ServicesState {
  data: FirestoreService[];
  status: DataStatus;
  error: string | null;
}

const initialState: ServicesState = {
  data: [],
  status: 'idle',
  error: null,
};

// Redux slice for the services collection (short highlight cards).
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    syncServices(state, action: PayloadAction<FirestoreService[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setServicesLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setServicesError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
    addService(state, action: PayloadAction<FirestoreService>) {
      state.data.push(action.payload);
    },
    updateService(state, action: PayloadAction<FirestoreService>) {
      const index = state.data.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    removeService(state, action: PayloadAction<string>) {
      state.data = state.data.filter((s) => s.id !== action.payload);
    },
  },
});

export const {
  syncServices,
  setServicesLoading,
  setServicesError,
  addService,
  updateService,
  removeService,
} = servicesSlice.actions;
export default servicesSlice.reducer;
