import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch, getErrorMessage } from '../../utils';

export const registerAction = async ({request}: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/local/register", data);

    toast.success("Registration successful");
    return redirect('/login');
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'please double check your credentials');

    toast.error(errorMessage);

    return null;
  }
}
