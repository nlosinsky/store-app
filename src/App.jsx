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

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Landing/>,
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "products",
        element: <Products/>,
      },
      {
        path: "products/:id",
        element: <SingleProduct/>,
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
