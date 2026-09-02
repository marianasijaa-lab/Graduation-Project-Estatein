import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreEffortlessPropertyManagementCard, DataStatus } from '../types';

export const FALLBACK_EFFORTLESS_PROPERTY_MANAGEMENT: FirestoreEffortlessPropertyManagementCard[] = [
  {
    id: 'effortless-1',
    title: 'Tenant Harmony',
    description: 'Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies.',
    icon: '/assets/Icon_23.png',
  },
  {
    id: 'effortless-2',
    title: 'Maintenance Ease',
    description: 'Say goodbye to property maintenance headaches. We handle all aspects of property upkeep.',
    icon: '/assets/Icon_24.png',
  },
  {
    id: 'effortless-3',
    title: 'Financial Peace of Mind',
    description: 'Managing property finances can be complex. Our financial experts take care of rent collection',
    icon: '/assets/Icon_25.png',
  },
  {
    id: 'effortless-4',
    title: 'Legal Guardian',
    description: 'Stay compliant with property laws and regulations effortlessly.',
    icon: '/assets/Icon_27.png',
  },
];

interface EffortlessPropertyManagementState {
  data: FirestoreEffortlessPropertyManagementCard[];
  status: DataStatus;
  error: string | null;
}

const initialState: EffortlessPropertyManagementState = {
  data: [],
  status: 'idle',
  error: null,
};

// Redux slice for the Effortless Property Management section's cards.
const effortlessPropertyManagementSlice = createSlice({
  name: 'effortlessPropertyManagement',
  initialState,
  reducers: {
    syncEffortlessPropertyManagement(state, action: PayloadAction<FirestoreEffortlessPropertyManagementCard[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setEffortlessPropertyManagementLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setEffortlessPropertyManagementError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncEffortlessPropertyManagement,
  setEffortlessPropertyManagementLoading,
  setEffortlessPropertyManagementError,
} = effortlessPropertyManagementSlice.actions;
export default effortlessPropertyManagementSlice.reducer;
