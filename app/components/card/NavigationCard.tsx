interface NavigationCardProps {
  title: string;
  icon: JSX.Element;
  isActive?: boolean;
}

const NavigationCard = (props: NavigationCardProps) => {
  const { title, icon, isActive } = props;
  return (
    <article
      className={`min-w-[10rem] overflow-hidden rounded-xl ${
        isActive
          ? "bg-variant-beige text-variant-dark-gray"
          : "bg-variant-blue-2 text-white hover:bg-variant-blue"
      }  p-4 `}
    >
      <h3 className="text-center text-lg">{title}</h3>
      <div className="flex justify-center">{icon}</div>
    </article>
  );
};

export default NavigationCard;
