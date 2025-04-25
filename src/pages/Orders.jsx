import { OrdersList, ComplexPaginationContainer, SectionTitle } from "../components";
import { customFetch } from "../utils/index.jsx";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";

export const loader = (store) => async ({request}) => {
  const user = store.getState().user.user;

  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  }

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const response = await customFetch.get('/orders', {
      params,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return { orders: response.data.data, meta: response.data.meta };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.error?.message ||
      'please double check your credentials';

    toast.error(errorMessage);

    if (error.response.status === 401 || error.response.status === 403) {
      return redirect('/login');
    }

    return null;
  }
};

const Orders = () => {
  const {meta} = useLoaderData();

  if (meta.pagination.total < 1) {
    return <SectionTitle text='Please make an order' />;
  }

  return (
    <>
      <SectionTitle text="Orders" />
      <OrdersList />
      <ComplexPaginationContainer></ComplexPaginationContainer>
    </>
  );
};

export default Orders;
