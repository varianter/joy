import { Link } from "@remix-run/react";
import { Category, getIconForCategory } from "~/utils";
import SecondaryButton from "./buttons/SecondaryButton";

interface ArticlePreviewProps {
  category: string;
  createdDate: string;
  title: string;
  description: string;
  url: string;
}

interface LinkButtonProps {
  text: string;
  route: string;
}

const ArticlePreview = (props: ArticlePreviewProps) => {
  const { category, createdDate, title, description, url } = props;

  const icon = getIconForCategory(category);

  const buttonText = () => {
    switch (category) {
      case Category.Blogpost:
        return "Les artikkel";
      case Category.Video:
        return "Se video";
      case Category.Podcast:
        return "Hør podkast";
      case Category.Course:
        return "Se kurs";
      case Category.Lecture:
        return "Se foredrag";
      default:
        return "";
    }
  };

  const linkButtonText = (): LinkButtonProps => {
    switch (category) {
      case Category.Blogpost:
        return { text: "Se alle bloggposter", route: "/blogposts" };
      case Category.Video:
        return { text: "Se alle videoer", route: "/videos" };
      case Category.Podcast:
        return { text: "Se alle podkaster", route: "/podcasts" };
      case Category.Course:
        return { text: "Se alle kurs", route: "/courses" };
      case Category.Lecture:
        return { text: "Se alle foredrag", route: "/lectures" };
      default:
        return { text: "", route: "/" };
    }
  };

  return (
    <div className="p-3 text-left sm:relative ">
      <div className="mb-5 flex gap-2">
        <img
          alt={"Kategoriikon"}
          className="fill-current h-[1.5rem] text-variant-pink"
          src={`/assets/icons/${icon}.svg`}
        />
        <span className="font-sans">{category}</span>
        <span className="ml-auto font-sans">{createdDate}</span>
      </div>
      <h1 className="text-left text-4xl line-clamp-2">{title}</h1>
      <p className="my-5 line-clamp-3">{description}</p>
      <div className="flex items-center sm:absolute sm:inset-x-6 sm:bottom-2">
        <Link to={linkButtonText().route}>{linkButtonText().text}</Link>
        <a className="ml-auto" href={url} target="_blank" rel="noreferrer">
          <SecondaryButton text={buttonText()} />
        </a>
      </div>
    </div>
  );
};

export default ArticlePreview;
