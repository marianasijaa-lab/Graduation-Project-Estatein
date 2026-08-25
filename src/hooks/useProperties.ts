import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchProperties } from '../store/slices/propertiesSlice';

export function useProperties() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.properties);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProperties());
    }
  }, [status, dispatch]);

  return { properties: data, status, error };
}
