import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchTestimonials } from '../store/slices/testimonialsSlice';

export function useTestimonials() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.testimonials);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTestimonials());
    }
  }, [status, dispatch]);

  return { testimonials: data, status, error };
}
