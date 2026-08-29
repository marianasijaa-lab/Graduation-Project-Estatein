import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import propertiesReducer   from './slices/propertiesSlice';
import companiesReducer    from './slices/companiesSlice';
import statsReducer        from './slices/statsSlice';
import valuesReducer       from './slices/valuesSlice';
import achievementsReducer from './slices/achievementsSlice';
import faqsReducer         from './slices/faqSlice';
import servicesReducer     from './slices/servicesSlice';
import infoBoxesReducer    from './slices/infoBoxesSlice';
import testimonialsReducer from './slices/testimonialsSlice';
import officesReducer      from './slices/officesSlice';
import ctaReducer          from './slices/ctaSlice';
import unlockPropertyValueReducer from './slices/unlockPropertyValueSlice';
import effortlessPropertyManagementReducer from './slices/effortlessPropertyManagementSlice';
import smartInvestmentsReducer from './slices/smartInvestmentsSlice';

export const store = configureStore({
  reducer: {
    properties:   propertiesReducer,
    companies:    companiesReducer,
    stats:        statsReducer,
    values:       valuesReducer,
    achievements: achievementsReducer,
    faqs:         faqsReducer,
    services:     servicesReducer,
    infoBoxes:    infoBoxesReducer,
    testimonials: testimonialsReducer,
    offices:      officesReducer,
    cta:          ctaReducer,
    unlockPropertyValue: unlockPropertyValueReducer,
    effortlessPropertyManagement: effortlessPropertyManagementReducer,
    smartInvestments: smartInvestmentsReducer,
  },
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
