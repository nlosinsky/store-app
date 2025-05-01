import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice.js";
import { clearCart } from "../features/cart/cartSlice.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from '../hooks';

const Header = () => {
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    queryClient.removeQueries();
    void navigate('/');
  }

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {
          user
            ?
            <div className="flex gap-x-2 sm:gap-x-8 items-center">
              <p className="text-xs sm:text-sm">Hello, {user.username}</p>
              <button type="button" onClick={logout} className="btn btn-primary btn-xs btn-outline uppercase">Logout</button>
            </div>
            :
            <div className="flex gap-x-6 justify-center items-center">
              <Link to="/login" className="link link-hover text-xs sm:text-sm">Sign in / Guest</Link>
              <Link to="/register" className="link link-hover text-xs sm:text-sm">Create Account</Link>
            </div>
        }
      </div>
    </header>
  );
};

export default Header;
