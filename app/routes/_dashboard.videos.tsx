import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getVideos } from "~/models/content.server";
import PreviewCardList from "~/components/card/PreviewCardList";
import ErrorComponent from "~/components/Error";
import { separateFeaturedAndOtherContent } from "~/utils";

export const loader = async () => {
  const videos = await getVideos();
  return json({ videos });
};

const Videos = () => {
  const { videos } = useLoaderData<typeof loader>();

  const [featuredVideos, otherVideos] = separateFeaturedAndOtherContent(videos);

  return (
    <div className="flex flex-col gap-4">
      {featuredVideos.length > 0 && (
        <PreviewCardList
          content={featuredVideos}
          heading="Tre utvalgte favoritter"
        />
      )}

      {otherVideos.length > 0 && (
        <PreviewCardList content={otherVideos} heading="Andre videoer" />
      )}
    </div>
  );
};

export default Videos;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
