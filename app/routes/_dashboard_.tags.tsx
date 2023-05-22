import { Outlet, useRouteError } from "@remix-run/react";
import ErrorComponent from "~/components/Error";

const Tags = () => (
  <div className="mt-24 block w-full max-w-4xl text-left">
    {/* Todo: Add functionality for searching for tags here */}
    <Outlet />
  </div>
);

export default Tags;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
