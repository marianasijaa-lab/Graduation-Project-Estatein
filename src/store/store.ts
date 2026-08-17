import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // أضف الـ slices هنا لاحقاً
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
