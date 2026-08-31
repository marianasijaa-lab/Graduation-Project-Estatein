import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncSmartInvestments,
  setSmartInvestmentsLoading,
  setSmartInvestmentsError,
  FALLBACK_SMART_INVESTMENTS,
} from '../store/slices/smartInvestmentsSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreSmartInvestmentsCard } from '../store/types';

export function useSmartInvestments() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.smartInvestments);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setSmartInvestmentsLoading());

    const unsubscribe = subscribeToCollection<FirestoreSmartInvestmentsCard>(
      'smartInvestments',
      (docs) => dispatch(syncSmartInvestments(docs)),
      (err)  => dispatch(setSmartInvestmentsError(err.message)),
      FALLBACK_SMART_INVESTMENTS,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { smartInvestments: data, status, error };
}
