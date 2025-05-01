import { useState } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import { useLoaderData } from "react-router-dom";
import { Pagination } from '../models';
import ProductsGrid from "./ProductsGrid.jsx";

import ProductsList from "./ProductsList.jsx";

enum LayoutStates {
  grid = 'grid',
  list = 'list',
}

type LayoutStatesType = LayoutStates.grid | LayoutStates.list

const ProductsContainer = () => {
  const {meta} = useLoaderData<{ meta: Pagination }>();
  const [layout, setLayout] = useState(LayoutStates.grid);
  const totalProducts = meta.pagination.total || 0;

  const setActiveStyles = (pattern: LayoutStatesType) => {
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

    if (layout === LayoutStates.grid) {
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
          <button className={setActiveStyles(LayoutStates.grid)}
                  onClick={() => {
                    setLayout(LayoutStates.grid);
                  }}
          >
            <BsFillGridFill/>
          </button>
          <button className={setActiveStyles(LayoutStates.list)}
                  onClick={() => {
                    setLayout(LayoutStates.list);
                  }}
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
