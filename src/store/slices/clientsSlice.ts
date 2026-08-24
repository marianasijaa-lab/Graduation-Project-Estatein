import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { companies as seedCompanies, type Company } from "../../Data/clients";

export type ClientsLoadStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ClientsState {
  items: Company[];
  status: ClientsLoadStatus;
  error: string | null;
}

const initialState: ClientsState = {
  items: [],
  status: "idle",
  error: null,
};

// Loads the "Our Valued Clients" list.
export const fetchClients = createAsyncThunk<Company[]>(
  "clients/fetch",
  async () => {
    return new Promise<Company[]>((resolve) => {
      resolve(seedCompanies);
    });
  },
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClient: {
      reducer(state, action: PayloadAction<Company>) {
        state.items.push(action.payload);
      },
      prepare(client: Omit<Company, "companyId">) {
        return { payload: { ...client, companyId: nextId() } };
      },
    },
    updateClient(state, action: PayloadAction<Company>) {
      const index = state.items.findIndex((item) => item.companyId === action.payload.companyId);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteClient(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.companyId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action: PayloadAction<Company[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load clients.";
      });
  },
});

// Keeps new ids unique even after deletions.
let idSeed = Math.max(0, ...seedCompanies.map((c) => c.companyId));
function nextId(): number {
  idSeed += 1;
  return idSeed;
}

export const { addClient, updateClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;
