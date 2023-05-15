import DbImage from "../DbImage";
import Card from "./Card";
import type { SerializeFrom } from "@remix-run/server-runtime";
import type { Content, Tag } from "@prisma/client";
import TagButton from "../buttons/TagButton";
import TextPreview from "../TextPreview";
import { Link } from "@remix-run/react";

interface PreviewCardProps {
  content: SerializeFrom<Content & { tags?: Tag[] }>;
  className?: string;
  direction?: "horizontal" | "vertical";
}

const PreviewCard = ({ content, className, direction }: PreviewCardProps) => {
  const { tags } = content;

  return (
    <div className={className}>
      {direction === "horizontal" ? (
        <Card cssClass="bg-variant-blue-4 sm:h-[22rem]">
          <div className="grid h-full sm:grid-cols-2">
            <div className="xs:h-[9rem] sm:relative sm:h-full">
              <DbImage
                alt={content.imageText ?? "Figur av læreglede"}
                className={`h-full w-full object-cover sm:absolute`}
                id={content.id}
              />
            </div>

            <TextPreview {...content} />
          </div>
        </Card>
      ) : (
        <Card cssClass="bg-variant-blue-4 sm:h-[32rem]">
          <div className="grid h-full">
            <div className="h-[12rem] sm:relative">
              <DbImage
                alt={content.imageText ?? "Figur av læreglede"}
                className={`h-full w-full object-cover sm:absolute`}
                id={content.id}
              />
            </div>

            <TextPreview {...content} />
          </div>
        </Card>
      )}

      {tags && tags.length > 0 && (
        // TODO: Ved klikk på tags, så skal man finne all content relevant til denne
        <div className="flex justify-end gap-4">
          {tags.map((tag) => {
            return (
              <Link to={`tags/${tag.text}`} key={tag.id} className="my-4">
                <TagButton text={tag.text} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PreviewCard;
