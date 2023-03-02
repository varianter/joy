import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getVideo } from "~/models/videos.server";


export async function loader({ params }: LoaderArgs) {
    invariant(params.id, "id not found");
  
    const video = await getVideo(params.id ?? "");
    if (!video) {
      throw new Response("Not Found", { status: 404 });
    }
    return json({ video });
  }
  

export default function PostSlug() {
  const { video } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2">{video.title}</h1>
      <p className="my-6 border-b-2 ">{video.description}</p>
    </main>
  );
}
