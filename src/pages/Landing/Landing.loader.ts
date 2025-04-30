import { QueryClient } from '@tanstack/react-query';
import { customFetch } from '../../utils';

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch.get('/products?featured=true')
};

export const ladingLoader = (queryClient: QueryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = response.data.data;
  return { products };
}
