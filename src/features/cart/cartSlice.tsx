import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CartProduct } from '../../models';

type CartState = {
  cartItems: CartProduct[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
}

const initialState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0
};

const getCartFromLocalStorage = (): CartState => {
  const localStorageCart = localStorage.getItem('cart');
  return localStorageCart ? JSON.parse(localStorageCart) as CartState : initialState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem(state, action: PayloadAction<CartProduct>) {
      const product = action.payload;
      const existingProduct = state.cartItems.find(item => item.cartID === product.cartID);

      if (existingProduct) {
        existingProduct.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += +product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Item added to cart');
    },
    removeItem(state, action: PayloadAction<string>) {
      const cartID = action.payload;
      const product = state.cartItems.find(item => item.cartID === cartID);
      state.cartItems = state.cartItems.filter(item => item.cartID !== cartID);

      if (product) {
        state.numItemsInCart -= product.amount;
        state.cartTotal -= +product.price * product.amount;
      }

      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Item removed from cart');
    },
    clearCart() {
      localStorage.setItem('cart', JSON.stringify(initialState));
      return initialState;
    },
    editItem(state, action: PayloadAction<{ cartID: string; amount: number }>) {
      const {amount, cartID} = action.payload;
      const item = state.cartItems.find(item => item.cartID === cartID);
      if (!item) {
        toast.error('Item not found');
        return;
      }
      const amountDifference = amount - item.amount;

      item.amount = amount;
      state.numItemsInCart += amountDifference;
      state.cartTotal += +item.price * amountDifference;

      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Cart updated');
    },
    calculateTotals(state) {
      state.tax = state.cartTotal * 0.1;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }
});

export const {addItem, editItem, clearCart, removeItem} = cartSlice.actions;

export default cartSlice.reducer;
