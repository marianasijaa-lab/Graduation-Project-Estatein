import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { firestoreDb } from '../../firebase/config';
import type { FirestoreInfoBox, DataStatus } from '../types';

const FALLBACK_INFOBOXES: FirestoreInfoBox[] = [
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

export const fetchInfoBoxes = createAsyncThunk<FirestoreInfoBox[]>(
  'infoBoxes/fetchAll',
  async () => {
    if (!firestoreDb) return FALLBACK_INFOBOXES;
    const querySnapshot = await getDocs(collection(firestoreDb, 'infoBoxes'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirestoreInfoBox[];
  }
);

const infoBoxesSlice = createSlice({
  name: 'infoBoxes',
  initialState,
  reducers: {
    addInfoBox(state, action: PayloadAction<FirestoreInfoBox>) {
      state.data.push(action.payload);
    },
    updateInfoBox(state, action: PayloadAction<FirestoreInfoBox>) {
      const index = state.data.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    removeInfoBox(state, action: PayloadAction<string>) {
      state.data = state.data.filter((b) => b.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfoBoxes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchInfoBoxes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchInfoBoxes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'فشل جلب صناديق المعلومات';
      });
  },
});

export const { addInfoBox, updateInfoBox, removeInfoBox } = infoBoxesSlice.actions;
export default infoBoxesSlice.reducer;
