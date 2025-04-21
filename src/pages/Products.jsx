import { customFetch } from "../utils/index.jsx";
import Filters from "../components/Filters.jsx";
import ProductsContainer from "../components/ProductsContainer.jsx";
import PaginationContainer from "../components/PaginationContainer.jsx";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const response = await customFetch.get('/products', {params});
  const products = response.data.data;
  const meta = response.data.meta;

  return { products, meta, params };
}

const Products = () => {
  return (
    <>
      <Filters/>
      <ProductsContainer/>
      <PaginationContainer/>
    </>
  );
};

export default Products;
