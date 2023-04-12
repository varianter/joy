import type { Content } from "@prisma/client";
import SecondaryButton from "../buttons/SecondaryButton";
import Card from "./Card";

interface CardWithMultipleContentProps {
  content: Content[];
  header: string;
}

const CardWithMultipleContent = ({
  content,
  header,
}: CardWithMultipleContentProps) => {
  return (
    <Card cssClass="bg-variant-blue-3 p-3">
      <>
        <h1 className="my-4 text-left text-4xl text-white">{header}</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3">
          {content.map((c) => {
            return (
              <div key={c.id}>
                <Card cssClass="bg-variant-blue-4">
                  <div className="grid h-full">
                    <div>
                      <img
                        alt={c.imageText ?? "Figur av læreglede"}
                        src={c.image ?? "/assets/default-article-image.svg"}
                      />
                    </div>
                    <div className="p-3 text-left">
                      <div className="mb-5 flex gap-2">
                        <span className="ml-auto font-bold">
                          {new Date(c.createdAt).toLocaleDateString("nb")}
                        </span>
                      </div>
                      <h1 className="text-left text-3xl line-clamp-2 sm:text-4xl">
                        {c.title}
                      </h1>
                      <p className="my-5 line-clamp-3">{c.description}</p>
                      <div className="flex items-center">
                        <a
                          className="ml-auto"
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <SecondaryButton text={"Les mer"} />
                        </a>
                      </div>
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
