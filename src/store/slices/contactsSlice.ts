import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreContact, DataStatus } from '../types';

export const FALLBACK_CONTACTS: FirestoreContact[] = [
  {
    id: 'contact-1',
    firstName: 'Jordan',
    lastName: 'Rivera',
    email: 'jordan.rivera@example.com',
    phone: '+1 (415) 555-0148',
    message:
      "I'm relocating to the Bay Area this autumn and would love a call to talk through 3-bedroom options in the $1.2M–$1.6M range.",
    inquiryType: 'Buying',
    howDidYouHear: 'Google',
    status: 'new',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'contact-2',
    firstName: 'Amelia',
    lastName: 'Chen',
    email: 'amelia.chen@example.com',
    phone: '+44 20 5555 0192',
    message:
      'We are considering listing our Kensington townhouse next spring and would like a valuation and marketing plan.',
    inquiryType: 'Selling',
    howDidYouHear: 'Friend',
    status: 'contacted',
    assignedTo: 'London desk',
    adminNote: 'Sent valuation pack on the 12th — following up next week.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'contact-3',
    firstName: 'Marcus',
    lastName: 'Okafor',
    email: 'marcus.okafor@example.com',
    phone: '+971 4 555 0210',
    message:
      'Interested in the Azure Skyline Penthouse — can you share the full pricing breakdown and arrange a viewing?',
    inquiryType: 'Investment',
    howDidYouHear: 'Advertisement',
    propertyId: 'prop-4',
    propertyName: 'Azure Skyline Penthouse',
    status: 'closed',
    assignedTo: 'Dubai desk',
    adminNote: 'Viewing completed, client decided to hold. Archived.',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

interface ContactsState {
  data: FirestoreContact[];
  status: DataStatus;
  error: string | null;
}

const initialState: ContactsState = {
  data: [],
  status: 'idle',
  error: null,
};

// Redux slice for the contacts (inquiries / messages) collection.
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    syncContacts(state, action: PayloadAction<FirestoreContact[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setContactsLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setContactsError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncContacts,
  setContactsLoading,
  setContactsError,
} = contactsSlice.actions;
export default contactsSlice.reducer;
