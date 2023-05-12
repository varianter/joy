import { getButtonText, getIconForCategory } from "~/utils";
import SecondaryButton from "./buttons/SecondaryButton";

interface ArticlePreviewProps {
  category: string;
  createdDate: string;
  title: string;
  description: string;
  url: string;
}

const ArticlePreview = (props: ArticlePreviewProps) => {
  const { category, createdDate, title, description, url } = props;

  const icon = getIconForCategory(category);

  const buttonText = getButtonText(category);

  return (
    <div className="m-3 text-left sm:relative ">
      <div className="mb-5 flex gap-2">
        <img
          alt={"Kategoriikon"}
          className="fill-current h-[1.5rem] text-variant-pink"
          src={`/assets/icons/${icon}.svg`}
        />
        <span className="font-sans">{category}</span>
        <span className="ml-auto font-sans">{createdDate}</span>
      </div>
      <h3 className="text-left text-2xl line-clamp-2">{title}</h3>
      <p className="my-5 line-clamp-3">{description}</p>
      <div className="item-center w-full sm:absolute sm:bottom-2">
        <div className="mx-1 sm:mx-auto sm:w-52">
          <a className="" href={url} target="_blank" rel="noreferrer">
            <SecondaryButton text={buttonText} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
