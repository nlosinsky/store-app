import { EnhancedStore } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '../../store/store';

export const checkoutLoader = (store: EnhancedStore) => () => {
  const user = (store.getState() as RootState).user.user;

  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  }

  return null;
}
