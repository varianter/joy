import { Content } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import ArticlePreview from "~/components/ArticlePreview";
import Card from "~/components/card/Card";
import { getCategories } from "~/models/category.server";
import { getContentById } from "~/models/content.server";

export const loader = async ({ params }: LoaderArgs) => {
  const content = await getContentById(params.id ?? "");
  if (!content) {
    throw new Response("Not Found", { status: 404 });
  }

  const categories = await getCategories();

  return json({
    content,
    categories,
  });
};

const Content = () => {
  const { content, categories } = useLoaderData<typeof loader>();
  return (
    <Card>
      <div className="grid items-center md:grid-cols-2">
        <img
          alt={content.imageText ?? "Figur av læreglede"}
          className="h-[15rem] w-full md:h-full"
          src={content.image ?? "/assets/default-article-image.svg"}
        />
        <ArticlePreview
          category={
            categories.find((c) => c.id === content.categoryId)?.text ?? ""
          }
          createdDate={content.createdAt.toString().split("T")[0]}
          title={content.title}
          description={content.description}
          url={content.url}
        />
      </div>
    </Card>
  );
};

export default Content;
