import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreFAQ, DataStatus } from '../types';

export const FALLBACK_FAQS: FirestoreFAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I search for properties on Estatein?',
    description:
      'Learn how to use our user-friendly search tools to find properties that match your criteria.',
  },
  {
    id: 'faq-2',
    question: 'What documents do I need to sell my property through Estatein?',
    description:
      'Find out about the necessary documentation for listing your property with us.',
  },
  {
    id: 'faq-3',
    question: 'How can I contact an Estatein agent?',
    description:
      'Discover the different ways you can get in touch with our experienced agents.',
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
