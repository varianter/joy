import { Link, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { searchContent } from "~/models/content.server";
import CardWithContent from "~/components/card/CardWithContent";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.tag, "Tag not found");

  const contentByTag = await searchContent(params.tag);

  if (!contentByTag) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ contentByTag });
};

const Tag = () => {
  const { contentByTag } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {contentByTag.map((content) => (
        <CardWithContent
          key={content.id}
          buttonText={content.title}
          content={content}
        />
      ))}
    </div>
  );
};

export default Tag;
