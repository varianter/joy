import { Link } from "@remix-run/react";

interface CourseNavigtionLinkProps {
  id: string;
  text: string;
}

const CourseNavigationLink = ({ id, text }: CourseNavigtionLinkProps) => {
  return (
    <Link to={`#${id}`} className="no-underline md:mx-32">
      <div className="mb-2 flex flex-row items-center border-b text-variant-white">
        <p>{text}</p>
        <img
          alt="arrowRight"
          className="h-[0.8rem] pl-2"
          src={"/assets/icons/arrowRight.svg"}
        />
      </div>
    </Link>
  );
};

export default CourseNavigationLink;
