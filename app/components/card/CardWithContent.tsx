import type { Content, Tag } from "@prisma/client";
import SecondaryButton from "../buttons/SecondaryButton";
import Card from "./Card";
import type { SerializeFrom } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
import { Category, formatDate, getIconForCategory } from "~/utils";
import DbImage from "../DbImage";

interface CardWithContentProps {
  buttonText: string;
  content: SerializeFrom<Content & { tags?: Tag[] }>;
}

const CardWithContent = ({ buttonText, content }: CardWithContentProps) => {
  const iconName = getIconForCategory(content.category);

  return (
    <Card cssClass="bg-variant-blue-4 sm:h-[24rem] min-w-[17rem] ">
      <div className="grid h-full p-6 sm:p-0">
        <div className="mb-6 flex justify-between sm:hidden">
          <div className="flex">
            <img
              alt={`Figur av ${content.category.toLowerCase()}`}
              className="h-[2rem] pr-4"
              src={`/assets/icons/${iconName}_dark.svg`}
            />
            <p className="text-xl"> {content.category} </p>
          </div>
          <span className="font-sans text-xl">
            {formatDate(new Date(content.createdAt))}
          </span>
        </div>
        <div className="h-[9rem] sm:relative ">
          <DbImage
            alt={content.imageText ?? "Figur av læreglede"}
            className="h-full w-full rounded-xl object-cover sm:absolute sm:rounded-none"
            id={content.id}
          />
        </div>
        <div className="overflow-hidden p-3">
          <h3 className="line-clamp-2">{content.title}</h3>
          <p className="my-5 line-clamp-5">{content.description}</p>
        </div>
        <div className="w-full items-center sm:flex sm:px-3 sm:pb-6">
          <span className="hidden font-sans sm:flex">
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
