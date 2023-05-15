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
  horizontal?: boolean;
}

const PreviewCard = ({ content, className, horizontal }: PreviewCardProps) => {
  const { tags } = content;

  return (
    <div className={`${className} text-black`}>
      {horizontal ? (
        <Card cssClass="bg-variant-blue-4">
          <div className="grid sm:grid-cols-2">
            <DbImage
              alt={content.imageText ?? "Figur av læreglede"}
              className={`h-full max-h-[16rem] w-full object-cover`}
              id={content.id}
            />

            <TextPreview {...content} />
          </div>
        </Card>
      ) : (
        <Card cssClass="bg-variant-blue-4">
          <div className="flex flex-col">
            <DbImage
              alt={content.imageText ?? "Figur av læreglede"}
              className={`h-full max-h-[12rem] w-full object-cover`}
              id={content.id}
            />
            <TextPreview {...content} />
          </div>
        </Card>
      )}

      {horizontal && tags && tags.length > 0 && (
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
