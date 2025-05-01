import { EnhancedStore } from '@reduxjs/toolkit';
import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCart } from '../../features/cart/cartSlice.tsx';
import { RootState } from '../../store/store.ts';
import { customFetch, formatPrice, getErrorMessage } from '../../utils';

export const checkoutFormAction = (store: EnhancedStore, queryClient: QueryClient) => async ({request}: {
  request: Request
}) => {
  const formData = await request.formData();
  const {name, address} = Object.fromEntries(formData);
  const user = (store.getState() as RootState).user.user;
  const {cartItems, orderTotal, numItemsInCart} = (store.getState() as RootState).cart;
  const info = {
    name,
    address,
    cartItems,
    chargeTotal: orderTotal,
    orderTotal: formatPrice(orderTotal),
    numItemsInCart
  }

  if (!user) {
    return;
  }

  try {
    await customFetch.post('/orders', {data: info}, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    queryClient.removeQueries({queryKey: ['orders']});
    store.dispatch(clearCart());
    toast.success('Order placed successfully');
    return redirect('/orders');
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'There was an error placing your order. Please try again.');

    toast.error(errorMessage);

    if (
      error instanceof AxiosError
      && (error.response?.status === 401 || error.response?.status === 403)
    ) {
      return redirect('/login');
    }

    return null;
  }
}
