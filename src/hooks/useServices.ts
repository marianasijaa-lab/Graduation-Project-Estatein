import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchServices } from '../store/slices/servicesSlice';

export function useServices() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.services);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchServices());
    }
  }, [status, dispatch]);

  return { services: data, status, error };
}
