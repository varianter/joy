interface CardProps {
  cssClass?: string;
  children: JSX.Element;
}

const Card = (props: CardProps) => {
  const { children, cssClass } = props;
  return (
    <div className={`overflow-hidden rounded-xl ${cssClass ? cssClass : "bg-variant-blue-4"} shadow-xl`}>
      {children}
    </div>
  );
};

export default Card;
