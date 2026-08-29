import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreUnlockPropertyValueCard, DataStatus } from '../types';

// Each card is its own Firestore document, same as values/achievements/etc.
// The section's header and InfoBox banner are NOT stored here — they stay
// hardcoded in UnlockPropertyValue.tsx.
export const FALLBACK_UNLOCK_PROPERTY_VALUE: FirestoreUnlockPropertyValueCard[] = [
  {
    id: 'unlock-1',
    title: 'Valuation Mastery',
    description: 'Discover the true worth of your property with our expert valuation services.',
    icon: '/assets/Icon_19.png',
  },
  {
    id: 'unlock-2',
    title: 'Strategic Marketing',
    description: 'Selling a property requires more than just a listing; it demands a strategic marketing approach.',
    icon: '/assets/Icon_20.png',
  },
  {
    id: 'unlock-3',
    title: 'Negotiation Wizardry',
    description: 'Negotiating the best deal is an art, and our negotiation experts are masters of it.',
    icon: '/assets/Icon_21.png',
  },
  {
    id: 'unlock-4',
    title: 'Closing Success',
    description: 'A successful sale is not complete until the closing. We guide you through the intricate closing process.',
    icon: '/assets/Icon_22.png',
  },
];

interface UnlockPropertyValueState {
  data: FirestoreUnlockPropertyValueCard[];
  status: DataStatus;
  error: string | null;
}

const initialState: UnlockPropertyValueState = {
  data: [],
  status: 'idle',
  error: null,
};

// Redux slice for the Unlock Property Value section's cards.
const unlockPropertyValueSlice = createSlice({
  name: 'unlockPropertyValue',
  initialState,
  reducers: {
    syncUnlockPropertyValue(state, action: PayloadAction<FirestoreUnlockPropertyValueCard[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setUnlockPropertyValueLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setUnlockPropertyValueError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncUnlockPropertyValue,
  setUnlockPropertyValueLoading,
  setUnlockPropertyValueError,
} = unlockPropertyValueSlice.actions;
export default unlockPropertyValueSlice.reducer;
