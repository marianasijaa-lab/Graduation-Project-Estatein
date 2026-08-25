import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchAchievements } from '../store/slices/achievementsSlice';

export function useAchievements() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.achievements);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAchievements());
    }
  }, [status, dispatch]);

  return { achievements: data, status, error };
}
