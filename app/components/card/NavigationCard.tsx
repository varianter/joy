import { NavLink } from "@remix-run/react";
import { getIconForCategory } from "~/utils";

interface NavigationCardProps {
  title: string;
  to: string;
  category?: string;
  src?: string;
}

const NavigationCard = ({ title, to, category, src }: NavigationCardProps) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <article
          className={`mx-1 min-h-[5rem] min-w-[8rem] rounded-xl ${
            isActive
              ? "bg-variant-beige text-variant-dark-gray"
              : "bg-variant-blue-2 text-white no-underline hover:bg-variant-blue"
          }  p-3 `}
        >
          <p className="text-left font-serif">{title}</p>
          <div className="flex justify-center">
            <img
              alt={`Figur av ${category}`}
              className="mt-3 h-[1.75rem]"
              src={
                src ||
                (category &&
                  `/assets/icons/${getIconForCategory(category, isActive)}.svg`)
              }
            />
          </div>
        </article>
      )}
    </NavLink>
  );
};

export default NavigationCard;
