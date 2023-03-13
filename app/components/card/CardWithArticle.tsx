import AnimatedButton from "../buttons/AnimatedButton";
import Card from "./Card";

interface CardWithArticleProps {
  image: string | null;
  title: string;
  linkToArticle: string;
  createdAt: string;
  altImageText: string | null;
}

const CardWithArticle = (props: CardWithArticleProps) => {
  const { image, altImageText, title, linkToArticle, createdAt } = props;

  return (
    <Card>
      <div className="flex h-full flex-col justify-between py-2">
        <section>
          <img
            alt={altImageText ?? "Figur av læreglede"}
            className="h-[15rem] w-full"
            src={image ?? "/assets/default-article-image.svg"}
          />
          <h1 className="my-4 text-left text-base">{title}</h1>
        </section>

        <footer className="inline-flex items-end justify-between leading-none">
          <a href={linkToArticle} target="_blank" rel="noreferrer">
            <AnimatedButton text="Les hele" />
          </a>

          <p className="text-variant-black">
            {new Date(createdAt).toLocaleDateString("nb")}
          </p>
        </footer>
      </div>
    </Card>
  );
};

export default CardWithArticle;
