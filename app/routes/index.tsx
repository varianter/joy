import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ArticlePreview from "~/components/ArticlePreview";
import TagButton from "~/components/buttons/TagButton";
import Card from "~/components/card/Card";
import { getCategories } from "~/models/category.server";
import { getNumNewestContent } from "~/models/content.server";

const numberOfNewContent = 2;

export const loader = async () => {
  const [newestContent, categories] = await Promise.all([
    getNumNewestContent(numberOfNewContent),
    getCategories(),
  ]);
  return json({
    newestContent,
    categories,
  });
};

export default function Index() {
  const { newestContent, categories } = useLoaderData<typeof loader>();

  return (
    <section>
      <h1 className="mb-8 text-left text-4xl text-white md:text-5xl">
        Bli inspirert 🤩
      </h1>
      <div className="">
        {newestContent.map((content, index) => {
          return (
            <div key={content.id} className="my-5">
              <Card>
                <div className="grid items-center md:grid-cols-2">
                  <img
                    alt={content.imageText ?? "Figur av læreglede"}
                    className={`h-[15rem] w-full md:h-full  ${
                      index % 2 === 0 ? "md:order-last" : "md:order-first"
                    } `}
                    src={content.image ?? "/assets/default-article-image.svg"}
                  />
                  <ArticlePreview
                    category={
                      categories.find((c) => c.id === content.categoryId)
                        ?.text ?? ""
                    }
                    createdDate={content.createdAt.split("T")[0]}
                    title={content.title}
                    description={content.description}
                    url={content.url}
                  />
                </div>
              </Card>
              {content.tags.length > 0 && (
                // TODO: Ved klikk på tags, så skal man finne all content relevant til denne
                <div className="flex justify-end gap-4">
                  {content.tags.map((tag) => {
                    return (
                      <div key={tag.id} className="my-4">
                        <TagButton text={tag.text} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
