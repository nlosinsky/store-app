import { useAppSelector } from '../hooks';
import CartItem from "./CartItem.jsx";

const CartItemsList = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <div>
      {
        cartItems.map(item => <CartItem key={item.cartID} cartItem={item}></CartItem>)
      }
    </div>
  );
};

export default CartItemsList;
