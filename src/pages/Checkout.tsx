import { useAppSelector } from '../hooks';
import { EnhancedStore } from '@reduxjs/toolkit';
import { CheckoutForm, SectionTitle, CartTotals } from "../components";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = (store: EnhancedStore) => async () => {
  const user = store.getState().user.user;
  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  }

  return null;
}

const Checkout = () => {
  const cartTotal = useAppSelector(state => state.cart.cartTotal);

  if (!cartTotal) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
