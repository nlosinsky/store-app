import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils/index.jsx";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice.js";
import { useDispatch } from "react-redux";

export const action = (store) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { dispatch } = store;

  try {
    const response = await customFetch.post("/auth/local", data);

    dispatch(loginUser(response.data));
    toast.success('logged in successfully');
    return redirect('/');
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.error?.message ||
      'please double check your credentials';

    toast.error(errorMessage);

    return null;
  }
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const data = {
        identifier: 'test@test.com',
        password: 'secret'
      }
      const response = await customFetch.post("/auth/local", data);
      dispatch(loginUser(response.data));

      toast.success('welcome guest user');
      navigate('/');
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials';
      toast.error(errorMessage);
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg gap-y-4">
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" size="lg"/>
        <FormInput type="password" label="password" name="password" size="lg"/>

        <div className="mt-4">
          <SubmitBtn text="Login"/>
        </div>

        <button type="button" className="btn btn-secondary btn-block uppercase" onClick={loginAsGuestUser}>guest user
        </button>
        <p className="text-center">
          Not a member yet? <Link to="/register"
                                  className="ml-2 link link-hover link-primary capitalize">Register</Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
