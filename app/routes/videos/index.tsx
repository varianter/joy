import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import AnimatedButton from "~/components/buttons/AnimatedButton";
import Card from "~/components/card/Card";
import CardWithVideo from "~/components/card/CardWithVideo";
import { getVideos } from "~/models/content.server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  const [user, videos] = await Promise.all([
    authenticator.isAuthenticated(request),
    getVideos(),
  ]);
  return json({ user, videos });
};

const Videos = () => {
  const { user, videos } = useLoaderData<typeof loader>();
  const isAuthenticated = user?.profile ? true : false;

  if (!videos || videos.length === 0)
    return <h1 className="text-white">Wooops, ingen videoer her enda...</h1>;

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="max-w-6xl">
        <Card>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => {
              return (
                video.suggested && (
                  <div key={video.id} className="my-1 inline-grid">
                    <CardWithVideo
                      title={video.title}
                      linkToId={video.id}
                      youtubeId={video.url}
                      createdAt={video.createdAt}
                    />
                  </div>
                )
              );
            })}
          </div>
        </Card>
      </section>

      <section className="max-w-6xl pt-5">
        <Card>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => {
              return (
                !video.suggested && (
                  <div key={video.id} className="my-1 inline-grid">
                    <CardWithVideo
                      title={video.title}
                      linkToId={video.id}
                      youtubeId={video.url}
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
