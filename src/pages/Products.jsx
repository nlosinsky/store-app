import { customFetch } from "../utils/index.jsx";
import Filters from "../components/Filters.jsx";
import ProductsContainer from "../components/ProductsContainer.jsx";
import PaginationContainer from "../components/PaginationContainer.jsx";

const productsQuery = (params) => {
  const { search, category, company, sort, price, shipping, page } = params;
  return  {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1
    ],
    queryFn: () => customFetch.get('/products', {params})
  };
}

export const loader = (queryClient) => async ({ request }) => {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const response = await queryClient.ensureQueryData(productsQuery(params));
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
