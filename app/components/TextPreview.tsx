import { formatDate, getIconForCategory } from "~/utils";

interface TextPreviewProps {
  category: string;
  createdAt: string;
  title: string;
  description: string;
  horizontal?: boolean;
}

const TextPreview = ({
  category,
  createdAt,
  title,
  description,
  horizontal,
}: TextPreviewProps) => {
  const icon = getIconForCategory(category);

  return (
    <div className="m-3 flex flex-col">
      <div className="mb-3 flex items-center gap-2">
        <img
          alt={"Kategoriikon"}
          className="fill-current h-[1rem] text-variant-pink"
          src={`/assets/icons/${icon}.svg`}
        />
        <p>{category}</p>
        <p className="ml-auto">{formatDate(new Date(createdAt))}</p>
      </div>
      <h3 className="line-clamp-2">{title}</h3>
      <p className={`${horizontal ? "line-clamp-5" : "line-clamp-6"}`}>
        {description}
      </p>
    </div>
  );
};

export default TextPreview;
