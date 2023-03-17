interface NavigationCardProps {
  header: string;
  icon: JSX.Element;
}

const NavigationCard = (props: NavigationCardProps) => {
  const { header, icon } = props;
  return (
    <article className="min-w-[15rem] overflow-hidden rounded-xl bg-variant-blue-2 p-4 text-white hover:bg-variant-blue">
      <h1 className="ml-4 text-center text-lg">{header}</h1>
      <div className="flex justify-center">{icon}</div>
    </article>
  );
};

export default NavigationCard;
