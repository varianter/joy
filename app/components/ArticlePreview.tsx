import { Link } from "@remix-run/react";
import { getIconForCategory } from "~/utils";
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

  console.log("ICON :", icon);

  const buttonText = () => {
    switch (category.toLowerCase()) {
      case "bloggpost":
        return "Les artikkel";
      case "video":
        return "Se video";
      case "podcast":
        return "Hør podcast";
      case "kurs":
        return "Se kurs";
      case "foredrag":
        return "Se foredrag";
      default:
        return "";
    }
  };

  const linkButtonText = (): LinkButtonProps => {
    switch (category.toLowerCase()) {
      case "bloggpost":
        return { text: "Se alle bloggposter", route: "blogposts" };
      case "video":
        return { text: "Se alle videoer", route: "videos" };
      case "podcast":
        return { text: "Se alle pocasts", route: "podcasts" };
      case "kurs":
        return { text: "Se alle kurs", route: "course" };
      case "foredrag":
        return { text: "Se alle foredrag", route: "lecture" };
      default:
        return { text: "", route: "" };
    }
  };

  return (
    <div className="p-10 text-left">
      <div className="mb-5 flex gap-2">
        <img
          alt={"Figur av læreglede"}
          className="fill-current h-[1.5rem] text-variant-pink"
          src={`/assets/icons/${icon}.svg`}
        />
        <span>{category}</span>
        <span className="ml-auto font-bold">{createdDate}</span>
      </div>
      <h1 className="text-left text-4xl">{title}</h1>
      <p className="my-5">{description}</p>
      <div className="mt-16 flex items-center">
        <Link
          className="underline hover:text-variant-pink "
          to={linkButtonText().route}
        >
          {linkButtonText().text}
        </Link>
        <a className="ml-auto" href={url} target="_blank" rel="noreferrer">
          <SecondaryButton text={buttonText()} />
        </a>
      </div>
    </div>
  );
};

export default ArticlePreview;
