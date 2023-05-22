import { NavLink } from "@remix-run/react";

interface NavigationLinkProps {
  title: string;
  to: string;
}

const NavigationLink = ({ title, to }: NavigationLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "navlink text-variant-pink-2" : ""
      }
    >
      {title}
    </NavLink>
  );
};

export default NavigationLink;
