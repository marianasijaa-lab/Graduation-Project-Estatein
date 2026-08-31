import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreTestimonial, DataStatus } from '../types';

export const FALLBACK_TESTIMONIALS: FirestoreTestimonial[] = [
  {
    id: 'test-1',
    clientName: 'Wade Warren',
    clientImage: '/assets/Profile_1.png',
    clientLocation: 'USA, California',
    title: 'Exceptional Service!',
    description: "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
    rating: 5,
    position: 'Software Engineer',
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test-2',
    clientName: 'Emelie Thomson',
    clientImage: '/assets/Profile_2.png',
    clientLocation: 'USA, Florida',
    title: 'Efficient and Reliable',
    description: "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
    rating: 5,
    position: 'Business Owner',
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test-3',
    clientName: 'John Mans',
    clientImage: '/assets/Profile_3.png',
    clientLocation: 'USA, Nevada',
    title: 'Trusted Advisors!',
    description: "The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
    rating: 5,
    position: 'Financial Analyst',
    order: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test-4',
    clientName: 'Cameron Williamson',
    clientImage: '/assets/Profile_1.png',
    clientLocation: 'USA',
    title: 'Stress-Free Experience!',
    description: 'Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. ',
    rating: 5,
    position: 'Corporate Executive',
    order: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test-5',
    clientName: 'Brooklyn Simmons',
    clientImage: '/assets/Profile_2.png',
    clientLocation: 'USA, Illinois',
    title: 'Outstanding Support!',
    description: 'The team at Estatein went above and beyond to help us find our dream home. Their professionalism, attention to detail, and genuine care for their clients sets them apart from the rest.',
    rating: 5,
    position: 'Entrepreneur',
    order: 5,
    createdAt: new Date().toISOString(),
  },
];

interface TestimonialsState {
  data: FirestoreTestimonial[];
  status: DataStatus;
  error: string | null;
}

const initialState: TestimonialsState = {
  data: [],
  status: 'idle',
  error: null,
};

// Redux slice for the testimonials collection.
const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    syncTestimonials(state, action: PayloadAction<FirestoreTestimonial[]>) {
      state.data = [...action.payload].sort(
        (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER),
      );
      state.status = 'succeeded';
      state.error  = null;
    },
    setTestimonialsLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setTestimonialsError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncTestimonials,
  setTestimonialsLoading,
  setTestimonialsError,
} = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
