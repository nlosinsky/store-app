import { EnhancedStore } from '@reduxjs/toolkit';
import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User } from '../../models';
import { customFetch } from '../../utils';

const ordersQuery  = (params: Record<string, string>, user: User) => {
  const { page } = params;
  return {
    queryKey: [
      'orders',
      user.username,
      page ? parseInt(page) : 1,
    ],
    queryFn: () => customFetch.get('/orders', {
      params,
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    })
  };
}

export const ordersLoader = (store: EnhancedStore, queryClient: QueryClient) => async ({request}: {request: Request}) => {
  const user = store.getState().user.user;

  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  }

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const response = await queryClient.ensureQueryData(ordersQuery(params, user));
    return { orders: response.data.data, meta: response.data.meta };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof AxiosError && error?.response?.data?.error?.message ||
      'please double check your credentials';

    toast.error(errorMessage);

    if (
      error instanceof AxiosError
      && (error?.response?.status === 401 || error?.response?.status === 403)
    ) {
      return redirect('/login');
    }

    return null;
  }
};
