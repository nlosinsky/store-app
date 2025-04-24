import { configureStore } from "@reduxjs/toolkit";

import cart from "../features/cart/cartSlice";
import user from "../features/user/userSlice.js";

const store = configureStore({
  reducer: {
    cart,
    user
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
})

export default store;


