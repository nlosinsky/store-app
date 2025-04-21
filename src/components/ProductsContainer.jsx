import { useLoaderData } from "react-router-dom";
import { useState } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';

import ProductsList from "./ProductsList.jsx";
import ProductsGrid from "./ProductsGrid.jsx";

const layoutStates = {
  grid: 'grid',
  list: 'list',
}

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const [layout, setLayout] = useState(layoutStates.list);
  const totalProducts = meta.pagination.total || 0;

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? 'btn-primary text-primary-content'
        : 'btn-ghost text-base-content'
    }`;
  };

  const setContent = () => {
    if (!totalProducts) {
      return <h5 className="text-2xl mt-16">Sorry, no products matched your search...</h5>
    }

    if (layout === layoutStates.grid) {
      return <ProductsGrid/>;
    }

    return <ProductsList/>;
  }

  return (
    <>
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h2 className="font-medium text-md">
          {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
        </h2>

        <div className="flex gap-x-2">
          <button className={setActiveStyles(layoutStates.grid)}
                  onClick={() => setLayout(layoutStates.grid)}
          >
            <BsFillGridFill/>
          </button>
          <button className={setActiveStyles(layoutStates.list)}
                  onClick={() => setLayout(layoutStates.list)}
          >
            <BsList/>
          </button>
        </div>
      </div>

      {setContent()}
    </>
  );
};

export default ProductsContainer;
