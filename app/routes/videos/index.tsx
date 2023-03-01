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
        <h3 className="pt-8 text-left">Anbefalte videoer 🔥</h3>
      </section>
      <section>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((y) => {
            return (
              <div className="my-1">
                <CardWithVideo
                  title={y.title}
                  linkToId={y.id}
                  youtubeId={y.uri}
                  createdAt={y.createdAt}
                />
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="pt-8 text-left">Nytt og fresht! 🤩</h3>
      </section>
      <section>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((y) => {
            return (
              <div className="my-1">
                <CardWithVideo
                  title={y.title}
                  linkToId={y.id}
                  youtubeId={y.uri}
                  createdAt={y.createdAt}
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
