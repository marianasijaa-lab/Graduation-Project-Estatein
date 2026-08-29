import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreSubscriber, DataStatus } from '../types';

export const FALLBACK_SUBSCRIBERS: FirestoreSubscriber[] = [
  {
    id: 'sub-1',
    email: 'olivia.bennett@example.com',
    status: 'subscribed',
    source: 'footer',
    name: 'Olivia Bennett',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sub-2',
    email: 'noah.kim@example.com',
    status: 'subscribed',
    source: 'contact-page',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sub-3',
    email: 'liam.torres@example.com',
    status: 'unsubscribed',
    source: 'footer',
    name: 'Liam Torres',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

interface SubscribersState {
  data: FirestoreSubscriber[];
  status: DataStatus;
  error: string | null;
}

const initialState: SubscribersState = {
  data: [],
  status: 'idle',
  error: null,
};

// Redux slice for the newsletter subscribers collection.
const subscribersSlice = createSlice({
  name: 'subscribers',
  initialState,
  reducers: {
    syncSubscribers(state, action: PayloadAction<FirestoreSubscriber[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setSubscribersLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setSubscribersError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncSubscribers,
  setSubscribersLoading,
  setSubscribersError,
} = subscribersSlice.actions;
export default subscribersSlice.reducer;
