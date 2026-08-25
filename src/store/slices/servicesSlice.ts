import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { firestoreDb } from '../../firebase/config';
import type { FirestoreService, DataStatus } from '../types';

const FALLBACK_SERVICES: FirestoreService[] = [
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

export const fetchServices = createAsyncThunk<FirestoreService[]>(
  'services/fetchAll',
  async () => {
    if (!firestoreDb) return FALLBACK_SERVICES;
    const querySnapshot = await getDocs(collection(firestoreDb, 'services'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirestoreService[];
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'فشل جلب الخدمات';
      });
  },
});

export const { addService, updateService, removeService } = servicesSlice.actions;
export default servicesSlice.reducer;
