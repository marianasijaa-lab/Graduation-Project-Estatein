import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreInfoBox, DataStatus } from '../types';

export const FALLBACK_INFOBOXES: FirestoreInfoBox[] = [
  {
    id: 'info-1',
    variant: 'horizontal',
    title: 'Discover Your Dream Property with Estatein',
    description: 'Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.',
    buttonLabel: 'Learn More',
  },
  {
    id: 'info-2',
    variant: 'vertical',
    title: 'Unlock the Door to Your Real Estate Dreams',
    description: "With years of experience and a dedicated team, we're here to make your real estate dreams come true. Whether you're buying, selling, or renting, we offer a seamless and rewarding experience.",
    buttonLabel: 'Get Started',
  },
];

interface InfoBoxesState {
  data: FirestoreInfoBox[];
  status: DataStatus;
  error: string | null;
}

const initialState: InfoBoxesState = {
  data: [],
  status: 'idle',
  error: null,
};

// Redux slice for the info box banners collection.
const infoBoxesSlice = createSlice({
  name: 'infoBoxes',
  initialState,
  reducers: {
    syncInfoBoxes(state, action: PayloadAction<FirestoreInfoBox[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setInfoBoxesLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setInfoBoxesError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncInfoBoxes,
  setInfoBoxesLoading,
  setInfoBoxesError,
} = infoBoxesSlice.actions;
export default infoBoxesSlice.reducer;
