import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { properties as seedProperties, type Property } from "../../Data/properties";

export type PropertiesLoadStatus = "idle" | "loading" | "succeeded" | "failed";

export interface PropertiesState {
  items: Property[];
  status: PropertiesLoadStatus;
  error: string | null;
}

const initialState: PropertiesState = {
  items: [],
  status: "idle",
  error: null,
};

// Loads the properties list.
export const fetchProperties = createAsyncThunk<Property[]>(
  "properties/fetch",
  async () => {
    return new Promise<Property[]>((resolve) => {
      resolve(seedProperties);
    });
  },
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    addProperty: {
      reducer(state, action: PayloadAction<Property>) {
        state.items.push(action.payload);
      },
      prepare(property: Omit<Property, "id">) {
        return { payload: { ...property, id: nextId() } };
      },
    },
    updateProperty(state, action: PayloadAction<Property>) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProperty(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action: PayloadAction<Property[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load properties.";
      });
  },
});

// Keeps new ids unique even after deletions.
let idSeed = Math.max(0, ...seedProperties.map((p) => p.id));
function nextId(): number {
  idSeed += 1;
  return idSeed;
}

export const { addProperty, updateProperty, deleteProperty } = propertiesSlice.actions;
export default propertiesSlice.reducer;
