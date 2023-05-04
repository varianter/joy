import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { searchContent } from "~/models/content.server";
import CardWithContent from "~/components/card/CardWithContent";
import TagButton from "~/components/buttons/TagButton";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.tag, "Tag not found");

  const tag = params.tag;
  const contentByTag = await searchContent(params.tag);

  if (!contentByTag) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ contentByTag, tag });
};

const Tag = () => {
  const { contentByTag, tag } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="text-white">
        <p className="inline-flex font-serif text-xl">
          Viser alt innhold relatert til temaet
        </p>
        <TagButton className="ml-4" text={tag} />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {contentByTag.map((content) => (
          <CardWithContent
            key={content.id}
            buttonText={content.title}
            content={content}
          />
        ))}
      </div>
    </div>
  );
};

export default Tag;
