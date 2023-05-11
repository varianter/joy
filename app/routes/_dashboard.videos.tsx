import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getVideos } from "~/models/content.server";
import CardWithMultipleContent from "~/components/card/CardWithMultipleContent";
import ErrorComponent from "~/components/Error";

export const loader = async () => {
  const videos = await getVideos();
  return json({ videos });
};

const Videos = () => {
  const { videos } = useLoaderData<typeof loader>();

  const featuredVideos = videos.filter((video) => video.featured).slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      {featuredVideos.length > 0 && (
        <CardWithMultipleContent
          content={featuredVideos}
          heading="Tre utvalgte favoritter"
          buttonText="Se video"
        />
      )}

      {videos.length > 0 && (
        <CardWithMultipleContent
          content={videos}
          heading="Alle videoer"
          buttonText="Se video"
        />
      )}
    </div>
  );
};

export default Videos;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
