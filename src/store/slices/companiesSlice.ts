import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreCompany, DataStatus } from '../types';

export const FALLBACK_COMPANIES: FirestoreCompany[] = [
  {
    id: 'comp-1',
    date: 'Since 2019',
    heading: 'ABC Corporation',
    link: 'https://abccorporation.example.com',
    domain: 'Commercial Real Estate',
    category: 'Luxury Home Development',
    testimony: "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
  },
  {
    id: 'comp-2',
    date: 'Since 2018',
    heading: 'GreenTech Enterprises',
    link: 'https://greentech.example.com',
    domain: 'Commercial Real Estate',
    category: 'Retail Space',
    testimony: "Estatein's ability to identify prime retail locations helped us expand our brand presence. They are a trusted partner in our growth.",
  },
  {
    id: 'comp-3',
    date: 'Since 2020',
    heading: 'Skyline Developments',
    link: 'https://skyline.example.com',
    domain: 'Residential Real Estate',
    category: 'High-Rise Construction',
    testimony: 'Working with Estatein has been a game-changer for our development projects. Their market knowledge and network are second to none.',
  },
  {
    id: 'comp-4',
    date: 'Since 2017',
    heading: 'Prestige Realty Group',
    link: 'https://prestigerealty.example.com',
    domain: 'Luxury Real Estate',
    category: 'Premium Residential',
    testimony: 'Estatein consistently delivers exceptional results for our luxury portfolio. Their professionalism and attention to detail are unmatched.',
  },
  {
    id: 'comp-5',
    date: 'Since 2021',
    heading: 'Urban Living Co.',
    link: 'https://urbanliving.example.com',
    domain: 'Mixed-Use Development',
    category: 'Urban Residential',
    testimony: 'The team at Estatein helped us identify the best urban locations for our projects. Their insight into city living trends is invaluable.',
  },
];

interface CompaniesState {
  data: FirestoreCompany[];
  status: DataStatus;
  error: string | null;
}

const initialState: CompaniesState = {
  data: [],
  status: 'idle',
  error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    syncCompanies(state, action: PayloadAction<FirestoreCompany[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setCompaniesLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setCompaniesError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
    addCompany(state, action: PayloadAction<FirestoreCompany>) {
      state.data.push(action.payload);
    },
    updateCompany(state, action: PayloadAction<FirestoreCompany>) {
      const index = state.data.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    removeCompany(state, action: PayloadAction<string>) {
      state.data = state.data.filter((c) => c.id !== action.payload);
    },
  },
});

export const {
  syncCompanies,
  setCompaniesLoading,
  setCompaniesError,
  addCompany,
  updateCompany,
  removeCompany,
} = companiesSlice.actions;
export default companiesSlice.reducer;
