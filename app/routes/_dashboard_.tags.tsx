import { Outlet, useRouteError } from "@remix-run/react";
import ErrorComponent from "~/components/Error";

const Tags = () => (
  <div className="mt-24 block w-full text-left">
    <section className="text-left text-white">
      <p className="font-serif text-xl">En variant av en</p>
      <h2>Læringshub</h2>
      <p className="mt-8">
        Vi i Variant lager og holder en del kurs og foredrag i flere
        sammenhenger. <br /> Vi har noen bloggposter her, noen YouTube-videoer
        der, og noen foredrag en annen plass. <br />
        Dette har vi samlet i denne læringshuben.
      </p>
    </section>
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
