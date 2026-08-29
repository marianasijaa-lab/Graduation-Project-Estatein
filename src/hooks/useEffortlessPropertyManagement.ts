import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncEffortlessPropertyManagement,
  setEffortlessPropertyManagementLoading,
  setEffortlessPropertyManagementError,
  FALLBACK_EFFORTLESS_PROPERTY_MANAGEMENT,
} from '../store/slices/effortlessPropertyManagementSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreEffortlessPropertyManagementCard } from '../store/types';

export function useEffortlessPropertyManagement() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.effortlessPropertyManagement);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setEffortlessPropertyManagementLoading());

    const unsubscribe = subscribeToCollection<FirestoreEffortlessPropertyManagementCard>(
      'effortlessPropertyManagement',
      (docs) => dispatch(syncEffortlessPropertyManagement(docs)),
      (err)  => dispatch(setEffortlessPropertyManagementError(err.message)),
      FALLBACK_EFFORTLESS_PROPERTY_MANAGEMENT,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { effortlessPropertyManagement: data, status, error };
}
