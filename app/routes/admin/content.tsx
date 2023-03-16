import { Outlet } from "@remix-run/react";

const Content = () => {
  return (
    <div className="items-left mt-5 flex">
      <Outlet />
    </div>
  );
};

export default Content;
