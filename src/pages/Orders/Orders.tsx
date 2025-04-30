import { useLoaderData } from "react-router-dom";
import { ComplexPaginationContainer, OrdersList, SectionTitle } from '../../components';

export const Orders = () => {
  const {meta} = useLoaderData();

  if (meta.pagination.total < 1) {
    return <SectionTitle text='Please make an order' />;
  }

  return (
    <>
      <SectionTitle text="Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};
