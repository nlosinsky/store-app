import { configureStore } from "@reduxjs/toolkit";

import cart from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    cart
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
})

export default store;


