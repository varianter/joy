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
        <Card className="grid h-full bg-variant-blue-4 sm:grid-cols-2">
          <DbImage
            alt={content.imageText ?? "Figur av læreglede"}
            className={`h-full h-[12rem] w-full object-cover sm:h-[20rem]`}
            id={content.id}
          />

          <div className="flex flex-col justify-between">
            <TextPreview {...content} horizontal />
            <a
              className="m-2 flex justify-end no-underline"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <SecondaryButton text={buttonText} />
            </a>
          </div>
        </Card>
      ) : (
        <Card className="flex h-[32rem] flex-col justify-between bg-variant-blue-4">
          <div>
            <DbImage
              alt={content.imageText ?? "Figur av læreglede"}
              className={`h-[12rem] w-full object-cover`}
              id={content.id}
            />
            <TextPreview {...content} />
          </div>
          <a
            className="mb-2 mr-2 flex justify-end no-underline"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
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
