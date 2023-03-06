import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/card/Card";
import CardWithVideo from "~/components/card/CardWithVideo";
import { getVideos } from "~/models/videos.server";

export const loader = async () => {
  return json({ videos: await getVideos() });
};

const Videos = () => {
  const { videos } = useLoaderData<typeof loader>();

  return (
    <main>
      <section>
        <Card header={"Populære 🔥"}>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => {
              return (
                video.suggested && (
                  <div key={video.id} className="my-1">
                    <CardWithVideo
                      title={video.title}
                      linkToId={video.id}
                      youtubeId={video.youtubeid}
                      createdAt={video.createdAt}
                    />
                  </div>
                )
              );
            })}
          </div>
        </Card>
      </section>

      <section className="pt-5">
        <Card header={"Nytt og fresht 🤩"}>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => {
              return (
                !video.suggested && (
                  <div key={video.id} className="my-1">
                    <CardWithVideo
                      title={video.title}
                      linkToId={video.id}
                      youtubeId={video.youtubeid}
                      createdAt={video.createdAt}
                    />
                  </div>
                )
              );
            })}
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Videos;
