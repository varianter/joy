import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/card/Card";
import { getVideos } from "~/models/videos.server";
import { requireUserSession } from "~/services/session";

export const loader = async ({ request }: LoaderArgs) => {
  await requireUserSession(request);
  return json({ videos: await getVideos() });
};

const Admin = () => {
  const { videos } = useLoaderData<typeof loader>();

  return (
    <main>
      <section>
        <Card header={"Legg til data"}>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            Her kommer det et form
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Admin;
