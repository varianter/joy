import { Link } from "@remix-run/react";

interface ShowMoreButtonProps {
  linkToId: string;
}

const ShowMoreButton = (props: ShowMoreButtonProps) => {
  const { linkToId } = props;
  return (
    <Link
      to={linkToId}
      className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-variant-blue px-6 py-3 font-medium transition-all hover:bg-variant-blue"
    >
      <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-variant-pink transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
      <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
        Se mer
      </span>
    </Link>
  );
};

export default ShowMoreButton;
