import type { Content } from "@prisma/client";
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
    <div className="flex flex-col items-center justify-center">
      <Card cssClass="bg-variant-blue-3">
        <div className="p-3">
          <h1 className="text-left text-3xl md:text-5xl">{cardHeader}</h1>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {content?.map((c) => {
              return (
                <div key={c.id} className="my-1 inline-grid">
                  <CardWithArticle
                    title={c.title}
                    linkToArticle={c.url}
                    image={c.image}
                    createdAt={c.createdAt}
                    altImageText={c.imageText}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};
