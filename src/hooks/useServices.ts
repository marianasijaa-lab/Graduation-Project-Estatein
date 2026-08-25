import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncServices,
  setServicesLoading,
  setServicesError,
  FALLBACK_SERVICES,
} from '../store/slices/servicesSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreService } from '../store/types';

export function useServices() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.services);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setServicesLoading());

    const unsubscribe = subscribeToCollection<FirestoreService>(
      'services',
      (docs) => dispatch(syncServices(docs)),
      (err)  => dispatch(setServicesError(err.message)),
      FALLBACK_SERVICES,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { services: data, status, error };
}
