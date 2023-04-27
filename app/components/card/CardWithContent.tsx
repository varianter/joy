import type { Content, Tag } from "@prisma/client";
import SecondaryButton from "../buttons/SecondaryButton";
import Card from "./Card";
import type { SerializeFrom } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
import { Category, formatDate } from "~/utils";

interface CardWithContentProps {
  buttonText: string;
  content: SerializeFrom<Content & { tags?: Tag[] }>;
}

const CardWithContent = ({ buttonText, content }: CardWithContentProps) => {
  return (
    <Card cssClass="bg-variant-blue-4 sm:h-[24rem]">
      <div className="grid h-full">
        <div className="h-[9rem] sm:relative">
          <img
            alt={content.imageText ?? "Figur av læreglede"}
            className="h-full w-full object-cover sm:absolute"
            src={content.image ?? "/assets/default-article-image.svg"}
          />
        </div>
        <div className="bottom-0 p-3 text-left">
          <h3 className="text-left text-2xl line-clamp-1">{content.title}</h3>
          <p className="my-5 text-base line-clamp-3">{content.description}</p>
        </div>
        <div className="flex items-center p-3 ">
          <span className="font-bold">
            {formatDate(new Date(content.createdAt))}
          </span>
          {content.category === Category.Course ? (
            <NavLink to={content.url} className="ml-auto">
              <SecondaryButton text={buttonText} />
            </NavLink>
          ) : (
            <a
              className="ml-auto"
              href={content.url}
              target="_blank"
              rel="noreferrer"
            >
              <SecondaryButton text={buttonText} />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CardWithContent;
