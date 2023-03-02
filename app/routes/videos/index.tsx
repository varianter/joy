import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CardWithVideo from "~/components/card/CardWithVideo";
import { getVideos } from "~/models/videos.server";

interface YoutubeContent {
  id: string;
  title: string;
  description: string;
}

export const loader = async () => {
  return json({ videos: await getVideos() });
};

const Videos = () => {
  const { videos } = useLoaderData<typeof loader>();

  return (
    <main>
      <section>
        <h1 className="pt-8">Videoer</h1>
      </section>
      <section>
        <h2 className="pt-8 text-left">Anbefalte videoer 🔥</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            return (
              <div key={video.id} className="my-1">
                <CardWithVideo
                  title={video.title}
                  linkToId={video.id}
                  youtubeId={video.uri}
                  createdAt={video.createdAt}
                />
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="pt-8 text-left">Nytt og fresht! 🤩</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            return (
              <div key={video.id} className="my-1">
                <CardWithVideo
                  title={video.title}
                  linkToId={video.id}
                  youtubeId={video.uri}
                  createdAt={video.createdAt}
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Videos;
