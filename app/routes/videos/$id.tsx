import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Card from "~/components/card/Card";
import { getVideo } from "~/models/videos.server";

export async function loader({ params }: LoaderArgs) {
  invariant(params.id, "id not found");

  const video = await getVideo(params.id);
  if (!video) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ video });
}

export default function Video() {
  const { video } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <Card header={video.title}>
        <div className="mt-5">
          <section>
            <iframe
              title={video.title}
              className="block h-[30rem] w-full"
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeid}?controls=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </section>
          <section className="mt-5">
            <p>{video.description}</p>
          </section>
        </div>
      </Card>
    </main>
  );
}
