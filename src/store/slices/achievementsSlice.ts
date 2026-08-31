import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FirestoreAchievement, DataStatus } from '../types';

export const FALLBACK_ACHIEVEMENTS: FirestoreAchievement[] = [
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

// Redux slice for the achievements collection.
const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    syncAchievements(state, action: PayloadAction<FirestoreAchievement[]>) {
      state.data   = action.payload;
      state.status = 'succeeded';
      state.error  = null;
    },
    setAchievementsLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },
    setAchievementsError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error  = action.payload;
    },
  },
});

export const {
  syncAchievements,
  setAchievementsLoading,
  setAchievementsError,
} = achievementsSlice.actions;
export default achievementsSlice.reducer;
