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

export default function Featured() {
  const { newestContent, categories } = useLoaderData<typeof loader>();

  return (
    <div>
      <section>
        <h2 className="mb-8 text-left text-4xl text-white md:text-5xl">
          Bli inspirert 🤩
        </h2>
        <div>
          {newestContent?.map((content, index) => {
            return (
              <div key={content.id} className="my-5">
                <Card cssClass="bg-variant-blue-4 sm:h-[22rem]">
                  <div className="grid h-full sm:grid-cols-2">
                    <div
                      className={`sm:relative ${
                        index % 2 === 0 ? "sm:order-last" : "sm:order-first"
                      } `}
                    >
                      <img
                        alt={content.imageText ?? "Figur av læreglede"}
                        className={`h-full w-full object-cover sm:absolute`}
                        src={
                          content.image ?? "/assets/default-article-image.svg"
                        }
                      />
                    </div>

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
    </div>
  );
}
