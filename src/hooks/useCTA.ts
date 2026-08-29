import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncCTA,
  setCTALoading,
  setCTAError,
  FALLBACK_CTA,
} from '../store/slices/ctaSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreCTA } from '../store/types';

export function useCTA() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.cta);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setCTALoading());

    const unsubscribe = subscribeToCollection<FirestoreCTA>(
      'cta',
      (docs) => dispatch(syncCTA(docs)),
      (err)  => dispatch(setCTAError(err.message)),
      FALLBACK_CTA,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { ctaEntries: data, status, error };
}
