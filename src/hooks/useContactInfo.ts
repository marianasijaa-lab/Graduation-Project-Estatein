import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncContactInfo,
  setContactInfoLoading,
  setContactInfoError,
  FALLBACK_CONTACT_INFO,
  CONTACT_INFO_DOC_ID,
} from '../store/slices/contactInfoSlice';
import { subscribeToDocument } from '../api/firestore';
import type { FirestoreContactInfo } from '../store/types';

export function useContactInfo() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.contactInfo);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setContactInfoLoading());

    // The contact settings are a single well-known doc — listen to it directly.
    const unsubscribe = subscribeToDocument<FirestoreContactInfo>(
      'siteSettings',
      CONTACT_INFO_DOC_ID,
      (settings) => dispatch(syncContactInfo(settings ?? FALLBACK_CONTACT_INFO)),
      (err) => dispatch(setContactInfoError(err.message)),
      FALLBACK_CONTACT_INFO,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { contactInfo: data, status, error };
}
