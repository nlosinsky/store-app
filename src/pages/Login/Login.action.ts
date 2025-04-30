import type { EnhancedStore } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../features/user/userSlice.tsx';
import { customFetch } from '../../utils';

export const loginAction = (store: EnhancedStore) => async ({ request } : {request: Request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { dispatch } = store;

  try {
    const response = await customFetch.post("/auth/local", data);

    dispatch(loginUser(response.data));
    toast.success('logged in successfully');
    return redirect('/');
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof AxiosError && error?.response?.data?.error?.message ||
      'please double check your credentials';

    toast.error(errorMessage);

    return null;
  }
}
