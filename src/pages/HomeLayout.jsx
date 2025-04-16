import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <h1 className="text-4xl">Home Layout</h1>
      <Outlet />
    </>
  );
};

export default HomeLayout;
