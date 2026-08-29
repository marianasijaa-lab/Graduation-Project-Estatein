import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncSubscribers,
  setSubscribersLoading,
  setSubscribersError,
  FALLBACK_SUBSCRIBERS,
} from '../store/slices/subscribersSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreSubscriber } from '../store/types';

export function useSubscribers() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.subscribers);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setSubscribersLoading());

    const unsubscribe = subscribeToCollection<FirestoreSubscriber>(
      'subscribers',
      (docs) => dispatch(syncSubscribers(docs)),
      (err)  => dispatch(setSubscribersError(err.message)),
      FALLBACK_SUBSCRIBERS,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { subscribers: data, status, error };
}
