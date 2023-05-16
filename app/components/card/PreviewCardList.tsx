import type { Content, Tag } from "@prisma/client";
import Card from "./Card";
import type { SerializeFrom } from "@remix-run/node";
import PreviewCard from "./PreviewCard";

interface PreviewCardListProps {
  content: SerializeFrom<(Content & { tags?: Tag[] })[]>;
  heading: string;
}

const PreviewCardList = ({ content, heading }: PreviewCardListProps) => {
  return (
    <Card className="bg-variant-blue-2 p-4 sm:p-8">
      <h2 className="mb-2 text-left text-white">{heading}</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {content.map((content) => {
          return <PreviewCard content={content} key={content.id} />;
        })}
      </div>
    </Card>
  );
};

export default PreviewCardList;
