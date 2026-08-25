import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncCompanies,
  setCompaniesLoading,
  setCompaniesError,
  FALLBACK_COMPANIES,
} from '../store/slices/companiesSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreCompany } from '../store/types';

export function useCompanies() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.companies);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setCompaniesLoading());

    const unsubscribe = subscribeToCollection<FirestoreCompany>(
      'companies',
      (docs) => dispatch(syncCompanies(docs)),
      (err)  => dispatch(setCompaniesError(err.message)),
      FALLBACK_COMPANIES,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { companies: data, status, error };
}
