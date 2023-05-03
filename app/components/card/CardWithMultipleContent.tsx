import type { Content, Tag } from "@prisma/client";
import Card from "./Card";
import type { SerializeFrom } from "@remix-run/node";
import CardWithContent from "./CardWithContent";

interface CardWithMultipleContentProps {
  buttonText: string;
  content: SerializeFrom<(Content & { tags?: Tag[] })[]>;
  heading: string;
}

const CardWithMultipleContent = ({
  buttonText,
  content,
  heading,
}: CardWithMultipleContentProps) => {
  return (
    <Card cssClass="bg-variant-blue-3 p-3">
      <h2 className="my-2 text-left text-xl text-white">{heading}</h2>
      <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-3">
        {content.map((content) => {
          return (
            <div key={content.id}>
              <CardWithContent content={content} buttonText={buttonText} />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CardWithMultipleContent;
