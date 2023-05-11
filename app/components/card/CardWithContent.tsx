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
  const iconName = () => {
    switch (content.category) {
      case Category.Blogpost.toString():
        return "blogpost";
      case Category.Lecture:
        return "lecture";
      case Category.Course:
        return "course";
      case Category.Video:
        return "video";
      case Category.Podcast:
        return "podcast";
      default:
        console.log("Noe annet");
        return "";
    }
  };

  return (
    <Card cssClass="bg-variant-blue-4 sm:h-[24rem] min-w-[17rem] ">
      <div className="grid h-full p-6 sm:p-0">
        <div className="mb-6 flex justify-between sm:hidden">
          <div className="flex">
            <img
              alt={`Figur av ${content.category.toLowerCase()}`}
              className="h-[2rem] pr-4"
              src={`/assets/icons/${iconName()}_dark.svg`}
            />
            <p className="text-xl"> {content.category} </p>
          </div>
          <span className="font-sans text-xl font-medium">
            {formatDate(new Date(content.createdAt))}
          </span>
        </div>
        <div className="h-[9rem] sm:relative ">
          <img
            alt={content.imageText ?? "Figur av læreglede"}
            className="h-full w-full rounded-xl object-cover sm:absolute sm:rounded-none"
            src={content.image ?? "/assets/default-article-image.svg"}
          />
        </div>
        <div className="bottom-0 overflow-hidden py-3 sm:p-3">
          <h3 className="text-left text-2xl line-clamp-1">{content.title}</h3>
          <p className="my-5 text-base line-clamp-3">{content.description}</p>
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
