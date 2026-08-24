import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./slices/propertiesSlice";
import valuesReducer from "./slices/valuesSlice";
import achievementsReducer from "./slices/achievementsSlice";
import clientsReducer from "./slices/clientsSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    values: valuesReducer,
    achievements: achievementsReducer,
    clients: clientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
