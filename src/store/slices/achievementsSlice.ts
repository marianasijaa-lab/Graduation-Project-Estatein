import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { achievements as seedAchievements, type Achievement } from "../../Data/aboutData";

export type AchievementsLoadStatus = "idle" | "loading" | "succeeded" | "failed";

export interface AchievementsState {
  items: Achievement[];
  status: AchievementsLoadStatus;
  error: string | null;
}

const initialState: AchievementsState = {
  items: [],
  status: "idle",
  error: null,
};

// Loads the "Our Achievements" list.
export const fetchAchievements = createAsyncThunk<Achievement[]>(
  "achievements/fetch",
  async () => {
    return new Promise<Achievement[]>((resolve) => {
      resolve(seedAchievements);
    });
  },
);

const achievementsSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {
    addAchievement: {
      reducer(state, action: PayloadAction<Achievement>) {
        state.items.push(action.payload);
      },
      prepare(achievement: Omit<Achievement, "id">) {
        return { payload: { ...achievement, id: nextId() } };
      },
    },
    updateAchievement(state, action: PayloadAction<Achievement>) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteAchievement(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievements.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAchievements.fulfilled, (state, action: PayloadAction<Achievement[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAchievements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load achievements.";
      });
  },
});

// Keeps new ids unique even after deletions.
let idSeed = Math.max(0, ...seedAchievements.map((a) => a.id));
function nextId(): number {
  idSeed += 1;
  return idSeed;
}

export const { addAchievement, updateAchievement, deleteAchievement } = achievementsSlice.actions;
export default achievementsSlice.reducer;
