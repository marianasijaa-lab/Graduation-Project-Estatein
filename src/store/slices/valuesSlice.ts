import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestoreDb } from '../../firebase/config';
import type { FirestoreValue, DataStatus } from '../types';

const FALLBACK_VALUES: FirestoreValue[] = [
  {
    id: 'val-1',
    icon: '/assets/Icon_33.png',
    title: 'Trust',
    description: 'Trust is the cornerstone of every successful real estate transaction.',
  },
  {
    id: 'val-2',
    icon: '/assets/icon_10.png',
    title: 'Excellence',
    description: 'We set the bar high for ourselves. From the properties we list to the services we provide.',
  },
  {
    id: 'val-3',
    icon: '/assets/icon_11.png',
    title: 'Client-Centric',
    description: 'Your dreams and needs are at the center of our universe. We listen, understand.',
  },
  {
    id: 'val-4',
    icon: '/assets/Icon_33.png',
    title: 'Our Commitment',
    description: 'We are dedicated to providing you with the highest level of service, professionalism, and support.',
  },
];

interface ValuesState {
  data: FirestoreValue[];
  status: DataStatus;
  error: string | null;
}

const initialState: ValuesState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchValues = createAsyncThunk<FirestoreValue[]>(
  'values/fetchAll',
  async () => {
    if (!firestoreDb) return FALLBACK_VALUES;
    const querySnapshot = await getDocs(collection(firestoreDb, 'values'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirestoreValue[];
  }
);

// Real Firestore writes for the dashboard. Additive alongside fetchValues
// and the local addValue/updateValue/removeValue reducers below — nothing
// about the read side changes.
export const createValueDoc = createAsyncThunk<FirestoreValue, Omit<FirestoreValue, 'id'>>(
  'values/create',
  async (value) => {
    if (!firestoreDb) return { ...value, id: crypto.randomUUID() };
    const docRef = await addDoc(collection(firestoreDb, 'values'), value);
    return { id: docRef.id, ...value };
  }
);

export const updateValueDoc = createAsyncThunk<FirestoreValue, FirestoreValue>(
  'values/update',
  async (value) => {
    const { id, ...rest } = value;
    if (firestoreDb) await updateDoc(doc(firestoreDb, 'values', id), rest);
    return value;
  }
);

export const deleteValueDoc = createAsyncThunk<string, string>(
  'values/delete',
  async (id) => {
    if (firestoreDb) await deleteDoc(doc(firestoreDb, 'values', id));
    return id;
  }
);

const valuesSlice = createSlice({
  name: 'values',
  initialState,
  reducers: {
    addValue(state, action: PayloadAction<FirestoreValue>) {
      state.data.push(action.payload);
    },
    updateValue(state, action: PayloadAction<FirestoreValue>) {
      const index = state.data.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    removeValue(state, action: PayloadAction<string>) {
      state.data = state.data.filter((v) => v.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchValues.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchValues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchValues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'فشل جلب القيم المؤسسية';
      })
      .addCase(createValueDoc.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateValueDoc.fulfilled, (state, action) => {
        const index = state.data.findIndex((v) => v.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteValueDoc.fulfilled, (state, action) => {
        state.data = state.data.filter((v) => v.id !== action.payload);
      });
  },
});

export const { addValue, updateValue, removeValue } = valuesSlice.actions;
export default valuesSlice.reducer;
