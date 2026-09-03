import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncOffices,
  setOfficesLoading,
  setOfficesError,
  FALLBACK_OFFICES,
} from '../store/slices/officesSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreOffice } from '../store/types';
import { filterOfficesByType } from '../components/OfficeLocations/officeFilters';

export function useOffices() {
  const dispatch = useAppDispatch();
  const { data, status, error, activeTab } = useAppSelector((state) => state.offices);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setOfficesLoading());

    const unsubscribe = subscribeToCollection<FirestoreOffice>(
      'offices',
      (docs) => dispatch(syncOffices(docs)),
      (err)  => dispatch(setOfficesError(err.message)),
      FALLBACK_OFFICES,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const filteredOffices = useMemo(
    () => filterOfficesByType(data, activeTab),
    [data, activeTab],
  );

  return { offices: filteredOffices, allOffices: data, status, error, activeTab };
}
