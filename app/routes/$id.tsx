import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import ArticlePreview from "~/components/ArticlePreview";
import Card from "~/components/card/Card";
import { getContentById } from "~/models/content.server";

export const loader = async ({ params }: LoaderArgs) => {
  const content = await getContentById(params.id ?? "");
  if (!content) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    content,
  });
};

const ContentId = () => {
  const { content } = useLoaderData<typeof loader>();
  return (
    <Card cssClass="bg-variant-blue-4 ">
      <div className="grid h-full sm:grid-cols-2">
        <img
          alt={content.imageText ?? "Figur av læreglede"}
          className="h-full w-full object-cover"
          src={content.image ?? "/assets/default-article-image.svg"}
        />

        <ArticlePreview
          category={content.category.text}
          createdDate={content.createdAt.toString().split("T")[0]}
          title={content.title}
          description={content.description}
          url={content.url}
        />
      </div>
    </Card>
  );
};

export default ContentId;
