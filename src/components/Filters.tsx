import { FormInput, FormRange, SubmitBtn, FormSelect, FormCheckbox } from "./index.js";
import { Form, Link, useLoaderData } from "react-router-dom";

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { categories, companies } = meta;
  const sortOptions = [ 'a-z', 'z-a', 'high', 'low' ];
  const { search, company, category, shipping, order, price } = params;

  return (
    <Form method="post" className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      <FormInput label="Search Product" type="search" name="search" size="sm" defaultValue={search}/>

      <FormSelect label="Select Category" size="sm" name="category" options={categories} defaultValue={category}/>

      <FormSelect label="Select Company" size="sm" name="company" options={companies} defaultValue={company}/>

      <FormSelect label="Sort By" size="sm" name="order" options={sortOptions} defaultValue={order}/>

      <FormRange label="Select Price" name="price" size="sm" price={price} />

      <FormCheckbox label="Free Shipping" defaultValue={shipping} name="shipping" size="sm"/>

      <SubmitBtn text="Search" size="sm"/>
      <Link to="/products" className="btn btn-accent btn-sm uppercase">Reset</Link>
    </Form>
  );
};

export default Filters;
