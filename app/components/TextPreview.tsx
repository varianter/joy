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
    <div className="m-3 flex flex-col justify-between">
      <div className="mb-2 flex flex-col">
        <div className="mb-4 flex items-center gap-2">
          <img
            alt={"Kategoriikon"}
            className="fill-current h-[1rem] text-variant-pink"
            src={`/assets/icons/${icon}.svg`}
          />
          <p>{category}</p>
          <p className="ml-auto">{formatDate(new Date(createdAt))}</p>
        </div>
        <h3 className="line-clamp-2">{title}</h3>
        <p className="line-clamp-5">{description}</p>
      </div>
      <a href={url} target="_blank" rel="noreferrer">
        <SecondaryButton text={buttonText} />
      </a>
    </div>
  );
};

export default TextPreview;
