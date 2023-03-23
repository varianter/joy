import AnimatedButton from "../buttons/AnimatedButton";
import Card from "./Card";

interface CardWithArticleProps {
  image: string | null;
  title: string;
  linkToArticle: string;
  createdAt: Date;
  altImageText: string | null;
}

const CardWithArticle = (props: CardWithArticleProps) => {
  const { image, altImageText, title, linkToArticle, createdAt } = props;

  return (
    <Card cssClass="bg-variant-blue-4 min-w-[full]">
      <div className="flex h-full flex-col justify-between">
        <section>
          <img
            alt={altImageText ?? "Figur av læreglede"}
            className="h-[15rem] w-full"
            src={image ?? "/assets/default-article-image.svg"}
          />
          <h1 className="p-2 text-left text-base">{title}</h1>
        </section>

        <footer className="inline-flex items-end justify-between p-2 leading-none">
          <p className="text-black">
            {new Date(createdAt).toLocaleDateString("nb")}
          </p>
          <a href={linkToArticle} target="_blank" rel="noreferrer">
            <AnimatedButton text="Les hele" />
          </a>
        </footer>
      </div>
    </Card>
  );
};

export default CardWithArticle;
