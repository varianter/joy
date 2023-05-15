import type { Content, Tag } from "@prisma/client";
import Card from "./Card";
import type { SerializeFrom } from "@remix-run/node";
import PreviewCard from "./PreviewCard";

interface CardWithMultipleContentProps {
  content: SerializeFrom<(Content & { tags?: Tag[] })[]>;
  heading: string;
}

const CardWithMultipleContent = ({
  content,
  heading,
}: CardWithMultipleContentProps) => {
  return (
    <Card cssClass="bg-variant-blue-2 p-4 sm:p-8 ">
      <h2 className="my-2 text-left text-xl text-white">{heading}</h2>
      <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-3">
        {content.map((content) => {
          return <PreviewCard content={content} key={content.id} />;
        })}
      </div>
    </Card>
  );
};

export default CardWithMultipleContent;
