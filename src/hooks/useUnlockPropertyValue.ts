import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncUnlockPropertyValue,
  setUnlockPropertyValueLoading,
  setUnlockPropertyValueError,
  FALLBACK_UNLOCK_PROPERTY_VALUE,
} from '../store/slices/unlockPropertyValueSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreUnlockPropertyValueCard } from '../store/types';

export function useUnlockPropertyValue() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.unlockPropertyValue);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setUnlockPropertyValueLoading());

    const unsubscribe = subscribeToCollection<FirestoreUnlockPropertyValueCard>(
      'unlockPropertyValue',
      (docs) => dispatch(syncUnlockPropertyValue(docs)),
      (err)  => dispatch(setUnlockPropertyValueError(err.message)),
      FALLBACK_UNLOCK_PROPERTY_VALUE,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { unlockPropertyValue: data, status, error };
}
