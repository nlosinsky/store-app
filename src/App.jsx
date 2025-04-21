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
        errorElement: <ErrorElement />
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "products",
        element: <Products/>,
        loader: productsLoader,
        errorElement: <ErrorElement />
      },
      {
        path: "products/:id",
        loader: singleProductLoader,
        element: <SingleProduct/>,
        errorElement: <ErrorElement />
      },
      {
        path: "cart",
        element: <Cart/>,
      },
      {
        path: "checkout",
        element: <Checkout/>,
      },
      {
        path: "orders",
        element: <Orders/>,
      }
    ]
  },
  {
    path: "login",
    element: <Login/>,
    errorElement: <Error/>,
  },
  {
    path: "register",
    element: <Register/>,
    errorElement: <Error/>,
  }
])

function App() {
  return <RouterProvider router={routes} />
}

export default App
