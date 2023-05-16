import DbImage from "../DbImage";
import Card from "./Card";
import type { SerializeFrom } from "@remix-run/server-runtime";
import type { Content, Tag } from "@prisma/client";
import TagButton from "../buttons/TagButton";
import TextPreview from "../TextPreview";
import { Link } from "@remix-run/react";
import SecondaryButton from "../buttons/SecondaryButton";
import { getButtonText } from "~/utils";

interface PreviewCardProps {
  content: SerializeFrom<Content & { tags?: Tag[] }>;
  className?: string;
  horizontal?: boolean;
}

const PreviewCard = ({ content, className, horizontal }: PreviewCardProps) => {
  const { category, tags, url } = content;

  const buttonText = getButtonText(category);

  return (
    <div className={`${className} text-black`}>
      {horizontal ? (
        <Card className="grid h-full bg-variant-blue-4 md:grid-cols-2">
          <DbImage
            alt={content.imageText ?? "Figur av læreglede"}
            className={`h-full max-h-[16rem] w-full object-cover`}
            id={content.id}
          />

          <div className="flex flex-col justify-between">
            <TextPreview {...content} />
            <a className="mb-2" href={url} target="_blank" rel="noreferrer">
              <SecondaryButton text={buttonText} />
            </a>
          </div>
        </Card>
      ) : (
        <Card className="flex h-full flex-col justify-between bg-variant-blue-4">
          <div>
            <DbImage
              alt={content.imageText ?? "Figur av læreglede"}
              className={`max-h-[12rem] w-full object-cover`}
              id={content.id}
            />
            <TextPreview {...content} />
          </div>
          <a className="mb-2" href={url} target="_blank" rel="noreferrer">
            <SecondaryButton text={buttonText} />
          </a>
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
