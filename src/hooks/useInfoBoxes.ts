import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchInfoBoxes } from '../store/slices/infoBoxesSlice';

export function useInfoBoxes() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.infoBoxes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInfoBoxes());
    }
  }, [status, dispatch]);

  return { infoBoxes: data, status, error };
}
