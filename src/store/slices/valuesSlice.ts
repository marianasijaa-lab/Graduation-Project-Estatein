import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { values as seedValues, type Value } from "../../Data/aboutData";

export type ValuesLoadStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ValuesState {
  items: Value[];
  status: ValuesLoadStatus;
  error: string | null;
}

const initialState: ValuesState = {
  items: [],
  status: "idle",
  error: null,
};

// Loads the "Our Values" list.
export const fetchValues = createAsyncThunk<Value[]>(
  "values/fetch",
  async () => {
    return new Promise<Value[]>((resolve) => {
      resolve(seedValues);
    });
  },
);

const valuesSlice = createSlice({
  name: "values",
  initialState,
  reducers: {
    addValue: {
      reducer(state, action: PayloadAction<Value>) {
        state.items.push(action.payload);
      },
      prepare(value: Omit<Value, "id">) {
        return { payload: { ...value, id: nextId() } };
      },
    },
    updateValue(state, action: PayloadAction<Value>) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteValue(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchValues.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchValues.fulfilled, (state, action: PayloadAction<Value[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchValues.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load values.";
      });
  },
});

// Keeps new ids unique even after deletions.
let idSeed = Math.max(0, ...seedValues.map((v) => v.id));
function nextId(): number {
  idSeed += 1;
  return idSeed;
}

export const { addValue, updateValue, deleteValue } = valuesSlice.actions;
export default valuesSlice.reducer;
