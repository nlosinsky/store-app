import { configureStore } from "@reduxjs/toolkit";

import cart from "../features/cart/cartSlice";
import user from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    cart,
    user
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


