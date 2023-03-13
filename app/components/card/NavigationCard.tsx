interface NavigationCardProps {
  header: string;
  count: number;
  icon: JSX.Element;
}

const NavigationCard = (props: NavigationCardProps) => {
  const { header, count, icon } = props;
  return (
    <article className="overflow-hidden rounded-xl bg-variant-secondary-blue p-4 text-white hover:bg-variant-blue">
      <h1 className="ml-4 text-center text-lg lg:text-lg">
        {header} ({count})
      </h1>
      <div className="flex justify-center">{icon}</div>
    </article>
  );
};

export default NavigationCard;
