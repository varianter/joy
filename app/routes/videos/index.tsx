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

  return (
    <CardWithMultipleContent
      content={videos as unknown as Content[]}
      categoryHeader={"Videoer"}
    />
  );
};

export default Videos;
