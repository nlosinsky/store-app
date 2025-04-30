import { Form } from "react-router-dom";
import { FormInput, SubmitBtn } from '../index.ts';

export const CheckoutForm = () => {
  return (
    <Form method="post" className="flex flex-col gap-y-4">
      <h4 className='font-medium text-xl'>Shipping Information</h4>
      <FormInput label="First name" name="name" type="text"></FormInput>
      <FormInput label="Address" name="address" type="text"></FormInput>
      <div className='mt-4'>
        <SubmitBtn text="Place your order"/>
      </div>
    </Form>
  );
};
