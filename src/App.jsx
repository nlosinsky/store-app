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

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Landing/>,
        loader: ladingLoader,
        errorElement: <ErrorElement/>
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "products",
        element: <Products/>,
        loader: productsLoader,
        errorElement: <ErrorElement/>
      },
      {
        path: "products/:id",
        loader: singleProductLoader,
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
        action: checkoutAction(store),
        loader: checkoutLoader(store),
      },
      {
        path: "orders",
        element: <Orders/>,
        loader: ordersLoader(store)
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
])

function App() {
  return <RouterProvider router={routes}/>
}

export default App
