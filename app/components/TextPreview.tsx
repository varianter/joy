import { formatDate, getButtonText, getIconForCategory } from "~/utils";
import SecondaryButton from "./buttons/SecondaryButton";

interface TextPreviewProps {
  category: string;
  createdAt: string;
  title: string;
  description: string;
  url: string;
}

const TextPreview = ({
  category,
  createdAt,
  title,
  description,
  url,
}: TextPreviewProps) => {
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
        <span className="ml-auto font-sans">
          {formatDate(new Date(createdAt))}
        </span>
      </div>
      <h3 className="line-clamp-2">{title}</h3>
      <p className="my-5 line-clamp-5">{description}</p>
      <div className="item-center w-full sm:absolute sm:bottom-1">
        <div className="mx-1 sm:mx-auto sm:max-w-xs">
          <a href={url} target="_blank" rel="noreferrer">
            <SecondaryButton text={buttonText} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TextPreview;
