import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreFAQ, DataStatus } from '../types';

export const FALLBACK_FAQS: FirestoreFAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I search for properties on Estatein?',
    description:
      'Use the search bar on the Properties page to filter listings by location, price range, property type, and more. Each result links straight to its full details page.',
  },
  {
    id: 'faq-2',
    question: 'What documents do I need to buy a property?',
    description:
      'Typically a valid photo ID, proof of funds or a mortgage pre-approval, and a signed offer letter. Our agents walk you through every document at each step.',
  },
  {
    id: 'faq-3',
    question: 'Does Estatein help with property financing?',
    description:
      'Yes. We partner with trusted lenders and can connect you with mortgage advisors to find financing options that fit your budget.',
  },
  {
    id: 'faq-4',
    question: 'Can I schedule a viewing before making an offer?',
    description:
      'Absolutely. You can request an in-person or virtual viewing for any active listing directly from its property details page.',
  },
];

interface FAQsState {
  data: FirestoreFAQ[];
  status: DataStatus;
  error: string | null;
}

const initialState: FAQsState = {
  data: [],
  status: 'idle',
  error: null,
};

// Redux slice for the FAQs collection.
const faqSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {
    syncFAQs(state, action: PayloadAction<FirestoreFAQ[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setFAQsLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setFAQsError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncFAQs,
  setFAQsLoading,
  setFAQsError,
} = faqSlice.actions;
export default faqSlice.reducer;
