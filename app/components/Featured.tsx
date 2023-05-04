import type { Content, Tag } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { SerializeFrom } from "@remix-run/server-runtime";
import ArticlePreview from "~/components/ArticlePreview";
import TagButton from "~/components/buttons/TagButton";
import Card from "~/components/card/Card";
import { formatDate } from "~/utils";

interface FeaturedProps {
  newestFeaturedContent: SerializeFrom<(Content & { tags: Tag[] })[]>;
}

const Featured = ({ newestFeaturedContent }: FeaturedProps) => {
  const horizontalFeaturedContent = newestFeaturedContent?.slice(0, 2);
  const verticalFeaturedContent = newestFeaturedContent?.slice(2);

  return (
    <div>
      <section>
        <h3 className="mb-8 text-left text-white">Bli inspirert 🤩</h3>
        <div>
          <div className="grid grid-cols-1 gap-7">
            {horizontalFeaturedContent?.map((content, index) => (
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
                      category={content.category}
                      createdDate={formatDate(new Date(content.createdAt))}
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
                        <Link
                          to={`tags/${tag.text}`}
                          key={tag.id}
                          className="my-4"
                        >
                          <TagButton text={tag.text} />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {verticalFeaturedContent?.map((content) => (
              <div key={content.id} className="my-5">
                <Card cssClass="bg-variant-blue-4 sm:h-[32rem]">
                  <div className="grid h-full">
                    <div className="h-[12rem] sm:relative">
                      <img
                        alt={content.imageText ?? "Figur av læreglede"}
                        className={`h-full w-full object-cover sm:absolute`}
                        src={
                          content.image ?? "/assets/default-article-image.svg"
                        }
                      />
                    </div>

                    <ArticlePreview
                      category={content.category}
                      createdDate={formatDate(new Date(content.createdAt))}
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
            ))}
            ;
          </div>
        </div>
      </section>
    </div>
  );
};

export default Featured;
