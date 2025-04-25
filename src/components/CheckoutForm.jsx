import FormInput from "./FormInput.jsx";
import SubmitBtn from "./SubmitBtn.jsx";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features/cart/cartSlice.jsx";
import { toast } from "react-toastify";
import { Form, redirect } from "react-router-dom";

export const action = (store) => async ({ request }) => {
  const formData = await request.formData();
  const { name, address } = Object.fromEntries(formData);
  const user = store.getState().user.user;
  const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;
  const info = {
    name,
    address,
    cartItems,
    chargeTotal: orderTotal,
    orderTotal: formatPrice(orderTotal),
    numItemsInCart
  }

  try {
    await customFetch.post('/orders', { data: info }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    store.dispatch(clearCart());
    toast.success('Order placed successfully');
    return redirect('/orders');
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.error?.message ||
      'There was an error placing your order. Please try again.';
    toast.error(errorMessage);

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      return redirect('/login');
    }

    return null;
  }
}

const CheckoutForm = () => {
  return (
    <Form method="post" className="flex flex-col gap-y-4">
      <h4 className='font-medium text-xl'>Shipping Information</h4>
      <FormInput label="First name" name="name" type="text"></FormInput>
      <FormInput label="Address" name="address" type="text"></FormInput>
      <div className='mt-4'>
        <SubmitBtn text="Place your order"/>
      </div>
    </Form>
  );
};

export default CheckoutForm;
