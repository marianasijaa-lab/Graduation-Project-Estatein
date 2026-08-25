import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchCompanies } from '../store/slices/companiesSlice';

export function useCompanies() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.companies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCompanies());
    }
  }, [status, dispatch]);

  return { companies: data, status, error };
}
