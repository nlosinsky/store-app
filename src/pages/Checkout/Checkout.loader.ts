import { EnhancedStore } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export const checkoutLoader = (store: EnhancedStore) => async () => {
  const user = store.getState().user.user;
  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  }

  return null;
}
