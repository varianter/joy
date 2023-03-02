interface CardProps {
  header?: string;
  children: JSX.Element;
}

const Card = (props: CardProps) => {
  const { header, children } = props;
  return (
    <article className="overflow-hidden rounded-xl bg-gradient-to-tr from-[#f4f1e7] to-[#ede8d7] p-4 shadow-xl">
      <h1 className="mt-2 ml-4 text-left text-3xl">{header}</h1>
      {children}
    </article>
  );
};

export default Card;
