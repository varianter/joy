import type { Content } from "@prisma/client";
import ArticlePreview from "../ArticlePreview";
import Card from "./Card";
import CardWithArticle from "./CardWithArticle";

interface CardWithMultipleContentProps {
  content: Content[];
  cardHeader: string;
}

export const CardWithMultipleContent = (
  props: CardWithMultipleContentProps
) => {
  const { content, cardHeader } = props;

  if (!content || content.length === 0)
    return <h1 className="text-white">Wooops, ikke noe innhold her enda...</h1>;

  return (
    <Card cssClass="bg-variant-blue-3">
      <div className="p-3">
        <h1 className="text-left text-3xl md:text-5xl">{cardHeader}</h1>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {content?.map((content) => {
            return (
              <div key={content.id} className="my-5">
                <Card cssClass="bg-variant-blue-4">
                  <div className="grid h-full">
                    <div>
                      <img
                        alt={content.imageText ?? "Figur av læreglede"}
                        className={`h-full w-full object-cover`}
                        src={
                          content.image ?? "/assets/default-article-image.svg"
                        }
                      />
                    </div>

                    <ArticlePreview
                      category={"bloggpost"}
                      createdDate={content.createdAt.toString()}
                      title={content.title}
                      description={content.description}
                      url={content.url}
                    />
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
