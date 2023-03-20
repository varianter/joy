interface CardProps {
  children: JSX.Element;
}

const Card = (props: CardProps) => {
  const { children } = props;
  return (
    <div className="overflow-hidden rounded-xl bg-variant-blue-4 shadow-xl">
      {children}
    </div>
  );
};

export default Card;
