import { AxiosResponse } from 'axios';
import { Form, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FormInput, SubmitBtn } from '../../components';
import { loginUser } from '../../features/user/userSlice.tsx';
import { UserResponse } from '../../models';
import { customFetch, getErrorMessage } from '../../utils';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const data = {
        identifier: 'test@test.com',
        password: 'secret'
      }
      const response: AxiosResponse<UserResponse> = await customFetch.post("/auth/local", data);
      dispatch(loginUser(response.data));

      toast.success('welcome guest user');
      void navigate('/');
    } catch (error) {
      console.log(error);
      const errorMessage = getErrorMessage(error, 'please double check your credentials');
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

        <button type="button" className="btn btn-secondary btn-block uppercase" onClick={() => void loginAsGuestUser()}>guest user
        </button>
        <p className="text-center">
          Not a member yet? <Link to="/register"
                                  className="ml-2 link link-hover link-primary capitalize">Register</Link>
        </p>
      </Form>
    </section>
  );
};
