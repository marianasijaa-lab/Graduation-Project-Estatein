import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreCTA, DataStatus } from '../types';

export const FALLBACK_CTA: FirestoreCTA[] = [
  {
    id: 'cta-1',
    heading: 'Start Your Real Estate Journey Today',
    subheading:
      "Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.",
    buttonText: 'Explore Properties',
    buttonLink: '/properties',
  },
];

interface CTAState {
  data: FirestoreCTA[];
  status: DataStatus;
  error: string | null;
}

const initialState: CTAState = {
  data: [],
  status: 'idle',
  error: null,
};

// Redux slice for the home page CTA section.
const ctaSlice = createSlice({
  name: 'cta',
  initialState,
  reducers: {
    syncCTA(state, action: PayloadAction<FirestoreCTA[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setCTALoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setCTAError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
    addCTA(state, action: PayloadAction<FirestoreCTA>) {
      state.data.push(action.payload);
    },
    updateCTA(state, action: PayloadAction<FirestoreCTA>) {
      const index = state.data.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    removeCTA(state, action: PayloadAction<string>) {
      state.data = state.data.filter((c) => c.id !== action.payload);
    },
  },
});

export const {
  syncCTA,
  setCTALoading,
  setCTAError,
  addCTA,
  updateCTA,
  removeCTA,
} = ctaSlice.actions;
export default ctaSlice.reducer;
