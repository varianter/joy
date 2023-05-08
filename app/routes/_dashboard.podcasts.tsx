import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getPodcasts } from "~/models/content.server";
import CardWithMultipleContent from "~/components/card/CardWithMultipleContent";
import ErrorComponent from "~/components/Error";

export const loader = async () => {
  const podcasts = await getPodcasts();
  return json({ podcasts });
};

const Podcasts = () => {
  const { podcasts } = useLoaderData<typeof loader>();
  const featuredPodcasts = podcasts
    .filter((podcast) => podcast.featured)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      {featuredPodcasts.length > 0 && (
        <CardWithMultipleContent
          content={featuredPodcasts}
          heading="Anbefalte 🔥"
          buttonText="Hør podkast"
        />
      )}
      {podcasts.length > 0 && (
        <CardWithMultipleContent
          content={podcasts}
          heading="Alle podkaster 🤩"
          buttonText="Hør podkast"
        />
      )}
    </div>
  );
};

export default Podcasts;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
