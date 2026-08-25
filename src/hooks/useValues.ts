import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchValues } from '../store/slices/valuesSlice';

export function useValues() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.values);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchValues());
    }
  }, [status, dispatch]);

  return { values: data, status, error };
}
