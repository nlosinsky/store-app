import type { EnhancedStore } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../features/user/userSlice.tsx';
import { UserResponse } from '../../models';
import { customFetch, getErrorMessage } from '../../utils';

export const loginAction = (store: EnhancedStore) => async ({ request } : {request: Request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { dispatch } = store;

  try {
    const response: AxiosResponse<UserResponse> = await customFetch.post("/auth/local", data);

    dispatch(loginUser(response.data));
    toast.success('logged in successfully');
    return redirect('/');
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'please double check your credentials');

    toast.error(errorMessage);

    return null;
  }
}
