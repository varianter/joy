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
      <>
        <img
          alt={altImageText ?? "Figur av læreglede"}
          className="h-[15rem] w-full"
          src={image ?? "/assets/default-article-image.svg"}
        />
        <h1 className="my-6 ml-4 text-left text-base">{title}</h1>

        <footer className="flex items-center justify-between p-2 leading-none md:p-4">
          <a href={linkToArticle} target="_blank" rel="noreferrer">
            <AnimatedButton text="Les hele" />
          </a>

          <p className="text-variant-black">
            {new Date(createdAt).toLocaleDateString("nb")}
          </p>
        </footer>
      </>
    </Card>
  );
};

export default CardWithArticle;
