import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreValue, DataStatus } from '../types';

export const FALLBACK_VALUES: FirestoreValue[] = [
  {
    id: 'val-1',
    icon: '/assets/Icon_33.png',
    title: 'Trust',
    description: 'Trust is the cornerstone of every successful real estate transaction.',
  },
  {
    id: 'val-2',
    icon: '/assets/icon_10.png',
    title: 'Excellence',
    description: 'We set the bar high for ourselves. From the properties we list to the services we provide.',
  },
  {
    id: 'val-3',
    icon: '/assets/icon_11.png',
    title: 'Client-Centric',
    description: 'Your dreams and needs are at the center of our universe. We listen, understand.',
  },
  {
    id: 'val-4',
    icon: '/assets/Icon_33.png',
    title: 'Our Commitment',
    description: 'We are dedicated to providing you with the highest level of service, professionalism, and support.',
  },
];

interface ValuesState {
  data: FirestoreValue[];
  status: DataStatus;
  error: string | null;
}

const initialState: ValuesState = {
  data: [],
  status: 'idle',
  error: null,
};

// Redux slice for the core values collection.
const valuesSlice = createSlice({
  name: 'values',
  initialState,
  reducers: {
    syncValues(state, action: PayloadAction<FirestoreValue[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setValuesLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setValuesError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncValues,
  setValuesLoading,
  setValuesError,
} = valuesSlice.actions;
export default valuesSlice.reducer;
