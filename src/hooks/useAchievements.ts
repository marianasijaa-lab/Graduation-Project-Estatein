import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncAchievements,
  setAchievementsLoading,
  setAchievementsError,
  FALLBACK_ACHIEVEMENTS,
} from '../store/slices/achievementsSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreAchievement } from '../store/types';

export function useAchievements() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.achievements);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setAchievementsLoading());

    const unsubscribe = subscribeToCollection<FirestoreAchievement>(
      'achievements',
      (docs) => dispatch(syncAchievements(docs)),
      (err)  => dispatch(setAchievementsError(err.message)),
      FALLBACK_ACHIEVEMENTS,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { achievements: data, status, error };
}
