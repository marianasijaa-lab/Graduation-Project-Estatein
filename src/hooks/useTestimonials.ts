import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncTestimonials,
  setTestimonialsLoading,
  setTestimonialsError,
  FALLBACK_TESTIMONIALS,
} from '../store/slices/testimonialsSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreTestimonial } from '../store/types';

export function useTestimonials() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.testimonials);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setTestimonialsLoading());

    const unsubscribe = subscribeToCollection<FirestoreTestimonial>(
      'testimonials',
      (docs) => dispatch(syncTestimonials(docs)),
      (err)  => dispatch(setTestimonialsError(err.message)),
      FALLBACK_TESTIMONIALS,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { testimonials: data, status, error };
}
