import { AxiosError } from 'axios';
import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { FormInput, SubmitBtn } from "../components/index.js";
import { customFetch } from '../utils';

export const action = async ({request}: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/local/register", data);

    toast.success("Registration successful");
    return redirect('/login');
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError && error?.response?.data?.error?.message ||
      'please double check your credentials';
    toast.error(errorMessage);

    return null;
  }
}

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg gap-y-4">
        <h4 className="text-center text-3xl font-bold">Register</h4>

        <FormInput type="text" label="username" name="username" size="lg"/>
        <FormInput type="email" label="email" name="email" size="lg"/>
        <FormInput type="password" label="password" name="password" size="lg"/>

        <div className="mt-4">
          <SubmitBtn text="Register"/>
        </div>

        <p className="text-center">
          Already a member?
          <Link to="/login" className="ml-2 link link-hover link-primary capitalize">Login</Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
