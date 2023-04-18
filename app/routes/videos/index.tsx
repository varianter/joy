import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getVideos } from "~/models/content.server";
import CardWithMultipleContent from "~/components/card/CardWithMultipleContent";
import type { Content } from "@prisma/client";

export const loader = async () => {
  const videos = await getVideos();
  return json({ videos });
};

const Videos = () => {
  const { videos } = useLoaderData<typeof loader>();

  const featuredVideos = videos.filter(
    (video) => video.featured
  ) as unknown as Content[];

  const otherVideos = videos.filter(
    (video) => !video.featured
  ) as unknown as Content[];

  return (
    <div className="flex flex-col gap-4">
      {featuredVideos.length > 0 && (
        <CardWithMultipleContent
          content={featuredVideos}
          header={"Anbefalte 🔥"}
          buttonText={"Se video"}
        />
      )}

      {otherVideos.length > 0 && (
        <CardWithMultipleContent
          content={otherVideos}
          header={"Alle videoer 🤩"}
          buttonText={"Se video"}
        />
      )}
    </div>
  );
};

export default Videos;
