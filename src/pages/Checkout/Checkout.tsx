import { CartTotals, CheckoutForm, SectionTitle } from '../../components';
import { useAppSelector } from '../../hooks';

export const Checkout = () => {
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
