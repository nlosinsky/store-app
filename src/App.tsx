import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { checkoutFormAction, ErrorElement } from "./components";

import {
  About,
  Cart,
  Checkout,
  checkoutLoader,
  Error,
  HomeLayout,
  ladingLoader,
  Landing,
  Login,
  loginAction,
  Orders,
  ordersLoader,
  Products,
  productsLoader,
  Register,
  registerAction,
  SingleProduct,
  singleProductLoader
} from './pages';
import store from "./store/store.js";

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
        action: checkoutFormAction(store, queryClient),
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
