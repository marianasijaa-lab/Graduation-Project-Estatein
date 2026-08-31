import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreContactInfo, DataStatus } from '../types';

/** Well-known document ID for the single contact-settings doc. */
export const CONTACT_INFO_DOC_ID = 'contact';

export const FALLBACK_CONTACT_INFO: FirestoreContactInfo = {
  id: CONTACT_INFO_DOC_ID,
  email: 'info@estatein.com',
  phone: '+1 (123) 456-7890',
  address: '123 Estatein Plaza, City Center, Metropolis',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=123+Estatein+Plaza+Metropolis',
  openingHours: 'Mon–Fri, 9:00 AM – 6:00 PM',
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/estatein', enabled: true },
    { platform: 'linkedin', url: 'https://linkedin.com/company/estatein', enabled: true },
    { platform: 'twitter', url: 'https://twitter.com/estatein', enabled: true },
    { platform: 'youtube', url: 'https://youtube.com/@estatein', enabled: true },
    { platform: 'instagram', url: 'https://instagram.com/estatein', enabled: false },
  ],
};

interface ContactInfoState {
  data: FirestoreContactInfo;
  status: DataStatus;
  error: string | null;
}

const initialState: ContactInfoState = {
  data: FALLBACK_CONTACT_INFO,
  status: 'idle',
  error: null,
};

// Redux slice for the single site contact-settings document.
const contactInfoSlice = createSlice({
  name: 'contactInfo',
  initialState,
  reducers: {
    syncContactInfo(state, action: PayloadAction<FirestoreContactInfo>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setContactInfoLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setContactInfoError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncContactInfo,
  setContactInfoLoading,
  setContactInfoError,
} = contactInfoSlice.actions;
export default contactInfoSlice.reducer;
