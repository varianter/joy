import type { Content } from "@prisma/client";
import SecondaryButton from "../buttons/SecondaryButton";
import Card from "./Card";

interface CardWithMultipleContentProps {
  content: Content[];
  header: string;
  buttonText: string;
}

const CardWithMultipleContent = ({
  content,
  header,
  buttonText
}: CardWithMultipleContentProps) => {
  return (
    <Card cssClass="bg-variant-blue-3 p-3">
      <>
        <h1 className="my-4 text-left text-4xl text-white">{header}</h1>
        <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3">
          {content.map((c) => {
            return (
              <div key={c.id}>
                <Card cssClass="bg-variant-blue-4 sm:h-[24rem]">
                  <div className="grid h-full">
                    <div className="h-[9rem] sm:relative">
                      <img
                        alt={c.imageText ?? "Figur av læreglede"}
                        className="h-full w-full object-cover sm:absolute"
                        src={c.image ?? "/assets/default-article-image.svg"}
                      />
                    </div>
                    <div className="bottom-0 p-3 text-left">
                      <h1 className="text-left text-2xl line-clamp-1">
                        {c.title}
                      </h1>
                      
                      <p className="my-5 text-base line-clamp-3">
                        {c.description}
                      </p>
                    </div>
                    <div className="flex items-center p-3 ">
                      <span className="font-bold">
                        {new Date(c.createdAt).toLocaleDateString("nb")}
                      </span>
                      <a
                        className="ml-auto"
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <SecondaryButton text={buttonText} />
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </>
    </Card>
  );
};

export default CardWithMultipleContent;
