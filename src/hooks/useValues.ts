import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncValues,
  setValuesLoading,
  setValuesError,
  FALLBACK_VALUES,
} from '../store/slices/valuesSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreValue } from '../store/types';

export function useValues() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.values);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setValuesLoading());

    const unsubscribe = subscribeToCollection<FirestoreValue>(
      'values',
      (docs) => dispatch(syncValues(docs)),
      (err)  => dispatch(setValuesError(err.message)),
      FALLBACK_VALUES,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { values: data, status, error };
}
