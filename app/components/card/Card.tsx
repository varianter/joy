import ShowMoreButton from "../buttons/ShowMoreButton";

interface CardProps {
  title: string;
  createdAt: string;
  linkToId: string;
  children: JSX.Element;
}

const Card = (props: CardProps) => {
  const { title, linkToId, createdAt, children } = props;
  return (
    <article className="overflow-hidden rounded-lg bg-gradient-to-br from-[#f4f1e7] to-[#ede8d7] shadow-lg">
      {children}

      <h1 className="ml-4 my-6 text-left text-base">{title}</h1>

      <footer className="flex items-center justify-between p-2 leading-none md:p-4">
        <ShowMoreButton linkToId={linkToId} />
        <p className="text-variant-black">
          {new Date(createdAt).toLocaleDateString("nb")}
        </p>
      </footer>
    </article>
  );
};

export default Card;
