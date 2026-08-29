import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  syncContacts,
  setContactsLoading,
  setContactsError,
  FALLBACK_CONTACTS,
} from '../store/slices/contactsSlice';
import { subscribeToCollection } from '../api/firestore';
import type { FirestoreContact } from '../store/types';

export function useContacts() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    if (status !== 'idle') return;

    dispatch(setContactsLoading());

    const unsubscribe = subscribeToCollection<FirestoreContact>(
      'contacts',
      (docs) => dispatch(syncContacts(docs)),
      (err)  => dispatch(setContactsError(err.message)),
      FALLBACK_CONTACTS,
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { contacts: data, status, error };
}
