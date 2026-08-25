import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { firestoreDb } from '../../firebase/config';
import type { FirestoreAchievement, DataStatus } from '../types';

const FALLBACK_ACHIEVEMENTS: FirestoreAchievement[] = [
  {
    id: 'ach-1',
    title: '3+ Years of Excellence',
    description: "With over 3 years in the industry, we've amassed a wealth of knowledge and experience, becoming a go-to resource for all things real estate.",
  },
  {
    id: 'ach-2',
    title: 'Happy Clients',
    description: 'Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do.',
  },
  {
    id: 'ach-3',
    title: 'Industry Recognition',
    description: "We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence.",
  },
];

interface AchievementsState {
  data: FirestoreAchievement[];
  status: DataStatus;
  error: string | null;
}

const initialState: AchievementsState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchAchievements = createAsyncThunk<FirestoreAchievement[]>(
  'achievements/fetchAll',
  async () => {
    if (!firestoreDb) return FALLBACK_ACHIEVEMENTS;
    const querySnapshot = await getDocs(collection(firestoreDb, 'achievements'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirestoreAchievement[];
  }
);

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    addAchievement(state, action: PayloadAction<FirestoreAchievement>) {
      state.data.push(action.payload);
    },
    updateAchievement(state, action: PayloadAction<FirestoreAchievement>) {
      const index = state.data.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    removeAchievement(state, action: PayloadAction<string>) {
      state.data = state.data.filter((a) => a.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievements.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAchievements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'فشل جلب الإنجازات';
      });
  },
});

export const { addAchievement, updateAchievement, removeAchievement } = achievementsSlice.actions;
export default achievementsSlice.reducer;
