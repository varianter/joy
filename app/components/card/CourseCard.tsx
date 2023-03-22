import AnimatedButton from "../buttons/AnimatedButton";
import Card from "./Card";

interface CourseCardProps {
  image?: string | null;
  title: string;
  linkToCourse: string;
  createdAt: string;
  altImageText?: string | null;
  description: string;
}

const CourseCard = (props: CourseCardProps) => {
  const { image, altImageText, title, linkToCourse, createdAt, description } = props;

  return (
    <Card>
      <div className="flex flex-col y-2 justify-between h-full">
        <div className="inline-flex flex-col">
          <div className="flex justify-between">
            <div className="inline-flex items-center"><img
              alt="Kurs icon"
              className="h-[1rem] pr-1.5"
              src={"/assets/icons/course.svg"}
            />
              <p>Kurs</p>
            </div>


            <p className="text-variant-black">
              {new Date(createdAt).toLocaleDateString("nb")}
            </p>
          </div>

          <img
            alt={altImageText ?? "Figur av læreglede"}
            className="h-[15rem] w-full py-3"
            src={image ?? "/assets/default-article-image.svg"}
          />

          <h1 className="mt-2 text-left text-base">{title}</h1>
          <p className="text-left pb-2">{description}</p>
        </div>

        <div className="inline-flex items-end justify-end">
          <a href={linkToCourse} target="_blank" rel="noreferrer">
            <AnimatedButton text="Ta kurset" />

          </a>

        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
