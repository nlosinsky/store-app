import { Link } from "react-router-dom";
import { CartItemsList, CartTotals, SectionTitle } from '../../components';
import { useAppSelector } from '../../hooks';

export const Cart = () => {
  const numItemsInCart = useAppSelector((store) => store.cart.numItemsInCart);
  const user = useAppSelector((store) => store.user.user);

  if (numItemsInCart === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }

  return (
    <>
      <SectionTitle text='Shopping Cart' />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>

        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals/>
          {
            user
              ? <Link to="/checkout" className="btn btn-primary btn-block mt-8 uppercase">Proceed to checkout</Link>
              : <Link to="/login" className="btn btn-primary btn-block mt-8 uppercase">Please Login</Link>
          }
        </div>
      </div>
    </>
  );
};
