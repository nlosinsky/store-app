import { Hero } from "../components";
import { customFetch } from "../utils";
import FeaturedProducts from "../components/FeaturedProducts.jsx";

export const loader = async () => {
  const response = await customFetch.get('/products?featured=true');
  console.log(response);
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
