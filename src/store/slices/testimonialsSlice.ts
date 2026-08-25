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
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test-2',
    clientName: 'Arlene McCoy',
    clientImage: '/assets/Profile_2.png',
    clientLocation: 'USA, New York',
    title: 'Efficient and Transparent!',
    description: 'Estatein provided us with top-notch service. They helped us sell our property at a great price and found us our perfect new home. Their transparency and efficiency were remarkable.',
    rating: 5,
    position: 'Business Owner',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test-3',
    clientName: 'Devon Lane',
    clientImage: '/assets/Profile_3.png',
    clientLocation: 'USA, Texas',
    title: 'Trusted Advisors!',
    description: "Estatein guided us through every step of the buying process. Their knowledge and commitment to our needs made all the difference. We couldn't be happier with our new home.",
    rating: 5,
    position: 'Financial Analyst',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'test-4',
    clientName: 'Cameron Williamson',
    clientImage: '/assets/Profile_1.png',
    clientLocation: 'USA, Florida',
    title: 'Stress-Free Experience!',
    description: 'Estatein made the entire buying process incredibly smooth and stress-free. Their expertise and dedication to client satisfaction is truly commendable. We found our perfect home thanks to them.',
    rating: 5,
    position: 'Corporate Executive',
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

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    syncTestimonials(state, action: PayloadAction<FirestoreTestimonial[]>) {
      state.data   = action.payload;
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
    addTestimonial(state, action: PayloadAction<FirestoreTestimonial>) {
      state.data.push(action.payload);
    },
    updateTestimonial(state, action: PayloadAction<FirestoreTestimonial>) {
      const index = state.data.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    removeTestimonial(state, action: PayloadAction<string>) {
      state.data = state.data.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  syncTestimonials,
  setTestimonialsLoading,
  setTestimonialsError,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
} = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
