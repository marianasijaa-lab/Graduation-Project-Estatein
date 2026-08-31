import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreSmartInvestmentsCard, DataStatus } from '../types';

// Each card is its own Firestore document, same as values/achievements/etc.
// The section's header and InfoBox banner are NOT stored here — they stay
// hardcoded in SmartInvestments.tsx.
export const FALLBACK_SMART_INVESTMENTS: FirestoreSmartInvestmentsCard[] = [
  {
    id: 'investment-1',
    title: 'Market Insight',
    description:
      'Stay ahead of market trends with our expert Market Analysis. We provide in-depth insights into real estate market conditions',
    icon: '/assets/Icon_19.png',
  },
  {
    id: 'investment-2',
    title: 'ROI Assessment',
    description:
      'Make investment decisions with confidence. Our ROI Assessment services evaluate the potential returns on your investments',
    icon: '/assets/Icon_27.png',
  },
  {
    id: 'investment-3',
    title: 'Customized Strategies',
    description:
      'Every investor is unique, and so are their goals. We develop Customized Investment Strategies tailored to your specific needs',
    icon: '/assets/Icon_28.png',
  },
  {
    id: 'investment-4',
    title: 'Diversification Mastery',
    description:
      'Diversify your real estate portfolio effectively. Our experts guide you in spreading your investments across various property types and locations',
    icon: '/assets/Icon_4.png',
  },
];

interface SmartInvestmentsState {
  data: FirestoreSmartInvestmentsCard[];
  status: DataStatus;
  error: string | null;
}

const initialState: SmartInvestmentsState = {
  data: [],
  status: 'idle',
  error: null,
};

// Redux slice for the Smart Investments section's cards.
const smartInvestmentsSlice = createSlice({
  name: 'smartInvestments',
  initialState,
  reducers: {
    syncSmartInvestments(state, action: PayloadAction<FirestoreSmartInvestmentsCard[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setSmartInvestmentsLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setSmartInvestmentsError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncSmartInvestments,
  setSmartInvestmentsLoading,
  setSmartInvestmentsError,
} = smartInvestmentsSlice.actions;
export default smartInvestmentsSlice.reducer;
