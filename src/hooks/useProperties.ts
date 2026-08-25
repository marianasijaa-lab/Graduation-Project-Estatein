import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncProperties,
  setPropertiesLoading,
  setPropertiesError,
} from '../store/slices/propertiesSlice';
import { FALLBACK_PROPERTIES } from '../store/slices/propertiesSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreProperty } from '../store/types';

export function useProperties() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.properties);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setPropertiesLoading());

    const unsubscribe = subscribeToCollection<FirestoreProperty>(
      'properties',
      (docs) => dispatch(syncProperties(docs)),
      (err)  => dispatch(setPropertiesError(err.message)),
      FALLBACK_PROPERTIES,
    );

    return () => unsubscribe();
  // status يكون 'idle' مرة واحدة فقط عند أول تحميل
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { properties: data, status, error };
}
