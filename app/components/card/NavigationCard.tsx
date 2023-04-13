interface NavigationCardProps {
  title: string;
  icon: JSX.Element;
  isActive: boolean;
}

const NavigationCard = (props: NavigationCardProps) => {
  const { title, icon, isActive } = props;
  return (
    <article
      className={`min-w-[10rem] overflow-hidden rounded-xl ${
        isActive ? "bg-variant-blue" : "bg-variant-blue-2"
      }  p-4 text-white hover:bg-variant-blue`}
    >
      <h3 className="text-center text-lg">{title}</h3>
      <div className="flex justify-center">{icon}</div>
    </article>
  );
};

export default NavigationCard;
