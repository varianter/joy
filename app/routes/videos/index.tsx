import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CardWithMultipleContent } from "~/components/card/CardWithMultipleContent";
import { getVideos } from "~/models/content.server";
import type { Content } from "@prisma/client";

export const loader = async () => {
  const videos = await getVideos();
  return json({ videos: videos });
};

const Videos = () => {
  const { videos } = useLoaderData<typeof loader>();

  const suggestedVideos = videos.filter((video) => video.suggested);
  const otherVideos = videos.filter((video) => !video.suggested);

  return (
    <div>
      <h1 className="mb-8 text-left text-4xl text-white md:text-5xl">
        Videoer
      </h1>
      {suggestedVideos.length > 0 && (
        <CardWithMultipleContent
          content={suggestedVideos as unknown as Content[]}
          cardHeader={"Fremhevet 🤩"}
        />
      )}

      {otherVideos.length > 0 && (
        <div className="mt-5">
          <CardWithMultipleContent
            content={otherVideos as unknown as Content[]}
            cardHeader={"Alle Videoer 🤩"}
          />
        </div>
      )}
    </div>
  );
};

export default Videos;
