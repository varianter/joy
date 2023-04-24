import type { Content, Tag } from "@prisma/client";
import SecondaryButton from "../buttons/SecondaryButton";
import Card from "./Card";
import type { SerializeFrom } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
interface CardWithMultipleContentProps {
  content: SerializeFrom<(Content & { tags?: Tag[] })[]>;
  contentType?: "course" | "blogpost" | "video" | "lecture" | "podcast";
  heading: string;
  buttonText: string;
}

const CardWithMultipleContent = ({
  content,
  contentType,
  heading,
  buttonText,
}: CardWithMultipleContentProps) => {
  return (
    <Card cssClass="bg-variant-blue-3 p-3">
      <h1 className="my-4 text-left text-4xl text-white">{heading}</h1>
      <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3">
        {content.map((content) => {
          return (
            <div key={content.id}>
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
                    <h1 className="text-left text-2xl line-clamp-1">
                      {content.title}
                    </h1>

                    <p className="my-5 text-base line-clamp-3">
                      {content.description}
                    </p>
                  </div>
                  <div className="flex items-center p-3 ">
                    <span className="font-bold">
                      {new Date(content.createdAt).toLocaleDateString("nb")}
                    </span>
                    {contentType === "course" ? (
                      <NavLink to={content.id} className="ml-auto">
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
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CardWithMultipleContent;
