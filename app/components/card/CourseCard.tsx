import AnimatedButton from "../buttons/AnimatedButton";
import Card from "./Card";

interface CourseCardProps {
  image?: string | null;
  title: string;
  linkToCourse: string;
  createdAt: string;
  altImageText?: string | null;
  author: string;
}

const CourseCard = (props: CourseCardProps) => {
  const { image, altImageText, title, linkToCourse, createdAt, author } = props;

  return (
    <Card>
      <div className="flex h-full flex-col justify-between py-2">
        
          <img
            alt={altImageText ?? "Figur av læreglede"}
            className="h-[15rem] w-full"
            src={image ?? "/assets/default-article-image.svg"}
          />
          <h1 className="my-4 text-left text-base">{title}</h1>
        

        <div className="inline-flex items-end justify-between leading-none">
          <a href={linkToCourse} target="_blank" rel="noreferrer">
            <AnimatedButton text="Ta kurset" />
          </a>

          <p className="text-variant-black">
            {new Date(createdAt).toLocaleDateString("nb")}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
