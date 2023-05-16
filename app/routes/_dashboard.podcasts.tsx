import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getPodcasts } from "~/models/content.server";
import PreviewCardList from "~/components/card/PreviewCardList";
import ErrorComponent from "~/components/Error";
import { separateFeaturedAndOtherContent } from "~/utils";

export const loader = async () => {
  const podcasts = await getPodcasts();
  return json({ podcasts });
};

const Podcasts = () => {
  const { podcasts } = useLoaderData<typeof loader>();

  const [featuredPodcasts, otherPodcasts] =
    separateFeaturedAndOtherContent(podcasts);

  return (
    <div className="flex flex-col gap-4">
      {featuredPodcasts.length > 0 && (
        <PreviewCardList
          content={featuredPodcasts}
          heading="Tre utvalgte favoritter"
        />
      )}
      {otherPodcasts.length > 0 && (
        <PreviewCardList content={otherPodcasts} heading="Andre podkaster" />
      )}
    </div>
  );
};

export default Podcasts;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
