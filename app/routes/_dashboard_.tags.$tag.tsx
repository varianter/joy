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
  const contentByTag = await searchContent(tag);

  if (!contentByTag) {
    throw new Response("Content by tag not found", { status: 404 });
  }

  return json({ contentByTag, tag });
};

const Tag = () => {
  const { contentByTag, tag } = useLoaderData<typeof loader>();

  return (
    <div>
      <section className="flex flex-col text-white sm:flex-row">
        <p className="font-serif text-xl sm:inline-flex">
          Viser alt innhold relatert til temaet
        </p>
        <TagButton className="my-2 ml-4 sm:my-0" text={tag} notClickable />
      </section>
      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {contentByTag.map((content) => (
          <CardWithContent
            key={content.id}
            buttonText={content.title}
            content={content}
          />
        ))}
      </section>
    </div>
  );
};

export default Tag;
