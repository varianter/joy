import { Outlet, useRouteError } from "@remix-run/react";
import ErrorComponent from "~/components/Error";

const Tags = () => (
  <div className="mt-24 block w-full text-left">
    {/* Todo: Add functionality for searching for tags here */}
    <div className="my-8">
      <Outlet />
    </div>
  </div>
);

export default Tags;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
