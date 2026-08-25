import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Stat, DataStatus } from '../types';

// ملاحظة: statsSlice لا تستخدم createAsyncThunk
// لأن Realtime Database تعمل بـ WebSocket مستمر (onValue callback)
// التحديثات تصل عبر callback في useStats hook

interface StatsState {
  data: Stat[];
  status: DataStatus;
  error: string | null;
}

const initialState: StatsState = {
  data: [],
  status: 'idle',
  error: null,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setStats(state, action: PayloadAction<Stat[]>) {
      state.data = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setStatsLoading(state) {
      state.status = 'loading';
    },
    setStatsError(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setStats, setStatsLoading, setStatsError } = statsSlice.actions;
export default statsSlice.reducer;
