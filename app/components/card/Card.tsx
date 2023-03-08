interface CardProps {
  header?: string;
  buttonRight?: JSX.Element;
  children: JSX.Element;
}

const Card = (props: CardProps) => {
  const { header, buttonRight, children } = props;
  return (
    <article className="overflow-hidden rounded-xl bg-gradient-to-tr from-[#f4f1e7] to-[#ede8d7] p-4 shadow-xl">
      {(header || buttonRight) && (
        <div className="flex flex-row">
          {header && (
            <h1 className="mt-2 ml-4 text-left text-2xl lg:text-3xl">
              {header}
            </h1>
          )}
          {buttonRight && <div className="ml-auto">{buttonRight}</div>}
        </div>
      )}
      {children}
    </article>
  );
};

export default Card;
