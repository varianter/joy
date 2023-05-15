import { useLoaderData, useRouteError } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { searchContent } from "~/models/content.server";
import TagButton from "~/components/buttons/TagButton";
import ErrorComponent from "~/components/Error";
import PreviewCard from "~/components/card/PreviewCard";

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
    <div className="text-white">
      {contentByTag.length > 0 ? (
        <div>
          <section className="flex">
            <p className="inline-flex font-serif text-xl">
              Viser alt innhold relatert til temaet
            </p>
            <TagButton className="ml-4" text={tag} notClickable />
          </section>
          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {contentByTag.map((content) => (
              <PreviewCard content={content} key={content.id} />
            ))}
          </section>
        </div>
      ) : (
        <div className="mb-8">
          <section className="flex">
            <p className="inline-flex">Kunne ikke finne noe innhold for</p>
            <TagButton className="ml-4" text={tag} notClickable />
          </section>
          <p className="my-4 text-5xl">😢</p>
        </div>
      )}
    </div>
  );
};

export default Tag;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
