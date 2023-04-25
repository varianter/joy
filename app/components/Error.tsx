import { isRouteErrorResponse } from "@remix-run/react";

const ErrorComponent = ({ error }: { error: unknown | Error }) => {
  return (
    <div>
      {isRouteErrorResponse(error) ? (
        <div>
          <h1>Oops</h1>
          <p>Status: {error.status}</p>
          <p>{error.data.message}</p>
        </div>
      ) : error instanceof Error ? (
        <div>
          <h1 className="text-white">Error</h1>
          <p className="text-white">{error?.message}</p>
        </div>
      ) : (
        <h1 className="text-white">Unknown error</h1>
      )}
      ;
    </div>
  );
};

export default ErrorComponent;
