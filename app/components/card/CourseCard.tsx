
import { NavLink } from "@remix-run/react";
import AnimatedButton from "../buttons/AnimatedButton";
import Card from "./Card";

interface CourseCardProps {
  image?: string | null;
  title: string;
  linkToCourse: string;
  createdAt: string;
  altImageText?: string | null;
  description: string;
  tags?: string[];
  id: string;
}

const CourseCard = (props: CourseCardProps) => {
  const {
    image,
    altImageText,
    title,
    linkToCourse,
    createdAt,
    description,
    tags,
    id
  } = props;

  const getLevel = (tag: string) => {
    if (tag == "beginner") {
      return (
        <img
          alt="Beginner icon"
          className="pl-3"
          src={"/assets/icons/beginner.svg"}
        />
      );
    } else if (tag == "intermediate") {
      return (
        <img
          alt="Intermediate icon"
          className="pl-3"
          src={"/assets/icons/intermediate.svg"}
        />
      );
    } else if (tag == "advanced") {
      return (
        <img
          alt="Advanced icon"
          className="pl-3"
          src={"/assets/icons/advanced.svg"}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Card cssClass="bg-variant-blue-3 p-3">
      <div className="y-2 flex h-full flex-col justify-between">
        <div className="inline-flex flex-col">
          <div className="flex justify-between">
            <div className="inline-flex items-center">
              <img
                alt="course icon"
                className="h-[1rem] pr-3"
                src={"/assets/icons/course.svg"}
              />
              <p>Kurs</p>
              {tags && tags.map((tag) => getLevel(tag))}
            </div>

            <p className="text-variant-black">
              {new Date(createdAt).toLocaleDateString("nb")}
            </p>
          </div>

          <img
            alt={altImageText ?? "Variant icon"}
            className="h-[15rem] w-full py-3"
            src={image ?? "/assets/default-article-image.svg"}
          />

          <h1 className="mt-2 text-left text-2xl font-semibold">{title}</h1>
          <p className="pb-2 text-left">{description}</p>
        </div>

        <div className="inline-flex justify-end">
          {/* <a href={linkToCourse} target="_blank" rel="noreferrer">
            <AnimatedButton text="Ta kurset" />
          </a> */}
          <NavLink to={id}>Gå til kurs</NavLink>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
