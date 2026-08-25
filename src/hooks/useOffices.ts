import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchOffices } from '../store/slices/officesSlice';

export function useOffices() {
  const dispatch = useAppDispatch();
  const { data, status, error, activeTab } = useAppSelector((state) => state.offices);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOffices());
    }
  }, [status, dispatch]);

  // فلترة حسب الـ tab المختار
  const filteredOffices = activeTab === 'All'
    ? data
    : data.filter((o) => o.type === activeTab);

  return { offices: filteredOffices, allOffices: data, status, error, activeTab };
}
