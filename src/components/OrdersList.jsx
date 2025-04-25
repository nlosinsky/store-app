import { useLoaderData } from "react-router-dom";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat);

const OrdersList = () => {
  const { orders, meta } = useLoaderData();

  return (
    <div className="mt-8">
      <h4 className="capitalize mb-4">Total Orders: {meta.pagination.total}</h4>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Products</th>
            <th>Cost</th>
            <th className='hidden sm:block'>Date</th>
          </tr>
          </thead>
          <tbody>
          {
            orders.map((order) => {
              const { id, attributes: { name, address, cartItems, orderTotal, createdAt } } = order;
              const date = dayjs(createdAt).format('hh:mm a - MMM Do, YYYY');
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{cartItems.length}</td>
                  <td>{orderTotal}</td>
                  <td>{date}</td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
