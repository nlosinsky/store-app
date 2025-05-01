import { editItem, removeItem } from "../features/cart/cartSlice.jsx";
import { useAppDispatch } from '../hooks';
import { CartProduct } from '../models';
import { formatPrice, generateAmountOptions } from "../utils";

type CartItemProps = {
  cartItem: CartProduct;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { cartID, image, price, productColor, title, amount, company } = cartItem;
  const dispatch = useAppDispatch();

  const removeItemFromTheCart = () => {
    dispatch(removeItem(cartID));
  }

  const handleAmount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
  }

  return (
    <article
      key={cartID}
      className='mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0'>
      <img className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover" src={image} alt={title}/>

      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{title}</h3>
        <h4 className="mt-2 text-neutral-content capitalize text-sm">{company}</h4>
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          Color :
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>

      <div className="sm:ml-12">
        <div className='max-w-xs'>
          <label htmlFor='amount' className='label p-0'>
            <span className='label-text'>Amount</span>
          </label>
          <select
            name='amount'
            id='amount'
            className='mt-2 select select-base select-bordered select-xs'
            value={amount}
            onChange={handleAmount}
          >
            {generateAmountOptions(amount + 5)}
          </select>
        </div>
        <button className="mt-2 link link-primary text-sm link-hover"
                onClick={removeItemFromTheCart}
        >remove</button>
      </div>

      <p className="sm:ml-auto font-medium">
        {formatPrice(price)}
      </p>
    </article>
  );
};

export default CartItem;
