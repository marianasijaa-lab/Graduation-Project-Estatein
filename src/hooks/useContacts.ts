import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchContacts } from '../store/slices/contactsSlice';

export function useContacts() {
  const dispatch = useAppDispatch();
  const { data, status, error, submitStatus } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContacts());
    }
  }, [status, dispatch]);

  return { contacts: data, status, error, submitStatus };
}
