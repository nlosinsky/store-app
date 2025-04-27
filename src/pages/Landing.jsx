import { Hero } from "../components";
import { customFetch } from "../utils";
import FeaturedProducts from "../components/FeaturedProducts.jsx";

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch.get('/products?featured=true')
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = response.data.data;
  return { products };
}

const Landing = () => {
  return (
    <>
      <Hero/>
      <FeaturedProducts/>
    </>
  );
};

export default Landing;
