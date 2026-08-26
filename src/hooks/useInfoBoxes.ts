import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncInfoBoxes,
  setInfoBoxesLoading,
  setInfoBoxesError,
  FALLBACK_INFOBOXES,
} from '../store/slices/infoBoxesSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreInfoBox } from '../store/types';

export function useInfoBoxes() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.infoBoxes);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setInfoBoxesLoading());

    const unsubscribe = subscribeToCollection<FirestoreInfoBox>(
      'infoBoxes',
      (docs) => dispatch(syncInfoBoxes(docs)),
      (err)  => dispatch(setInfoBoxesError(err.message)),
      FALLBACK_INFOBOXES,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { infoBoxes: data, status, error };
}
