import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncFAQs,
  setFAQsLoading,
  setFAQsError,
  FALLBACK_FAQS,
} from '../store/slices/faqSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreFAQ } from '../store/types';

export function useFAQs() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.faqs);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setFAQsLoading());

    const unsubscribe = subscribeToCollection<FirestoreFAQ>(
      'faqs',
      (docs) => dispatch(syncFAQs(docs)),
      (err)  => dispatch(setFAQsError(err.message)),
      FALLBACK_FAQS,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { faqs: data, status, error };
}
