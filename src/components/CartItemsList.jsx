import { useSelector } from "react-redux";
import CartItem from "./CartItem.jsx";

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      {
        cartItems.map(item => <CartItem key={item.cartID} cartItem={item}></CartItem>)
      }
    </div>
  );
};

export default CartItemsList;
