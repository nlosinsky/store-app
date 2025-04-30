import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct
} from './pages';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorElement } from "./components";

import { loader as ladingLoader } from './pages/Landing.jsx';
import { loader as singleProductLoader } from './pages/SingleProduct.jsx';
import { loader as productsLoader } from './pages/Products.jsx';
import { action as registerAction } from './pages/Register.jsx';
import { loader as checkoutLoader } from './pages/Checkout.jsx';
import { loader as ordersLoader } from './pages/Orders.jsx';
import { action as loginAction } from './pages/Login.jsx';
import { action as checkoutAction } from "./components/CheckoutForm.jsx";
import store from "./store/store.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Landing/>,
        loader: ladingLoader(queryClient),
        errorElement: <ErrorElement/>
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "products",
        element: <Products/>,
        loader: productsLoader(queryClient),
        errorElement: <ErrorElement/>
      },
      {
        path: "products/:id",
        loader: singleProductLoader(queryClient),
        element: <SingleProduct/>,
        errorElement: <ErrorElement/>
      },
      {
        path: "cart",
        element: <Cart/>,
      },
      {
        path: "checkout",
        element: <Checkout/>,
        action: checkoutAction(store, queryClient),
        loader: checkoutLoader(store),
      },
      {
        path: "orders",
        element: <Orders/>,
        loader: ordersLoader(store, queryClient)
      }
    ]
  },
  {
    path: "login",
    element: <Login/>,
    action: loginAction(store),
    errorElement: <Error/>,
  },
  {
    path: "register",
    element: <Register/>,
    action: registerAction,
    errorElement: <Error/>,
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}/>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  )
}

export default App
