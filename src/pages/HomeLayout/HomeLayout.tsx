import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading, Navbar } from '../../components';

export const HomeLayout = () => {
  const state = useNavigation();
  const isLoading = state.state === "loading";
  return (
    <>
      <Header/>
      <Navbar/>
      {
        isLoading
          ? <Loading/>
          : <section className='align-element py-20'><Outlet/></section>
      }
    </>
  );
};
