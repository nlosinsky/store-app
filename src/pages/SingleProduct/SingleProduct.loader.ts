import { QueryClient } from '@tanstack/react-query';
import { Product } from '../../models';
import { customFetch } from '../../utils';

const singleProductQuery = (id: string) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch.get(`/products/${id}`)
  }
}

export const singleProductLoader = (queryClient: QueryClient) => async ({params}: {
  params: Record<string, string | undefined>
}) => {
  if (!params.id) {
    throw new Error('No product id provided');
  }

  const response = await queryClient.ensureQueryData<{data: {data: Product}}>(singleProductQuery(params.id));
  return {
    product: response.data.data
  };
}
