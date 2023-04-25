import type { ReactNode } from "react";

interface CardProps {
  cssClass?: string;
  children: ReactNode;
}

const Card = ({ children, cssClass }: CardProps) => (
  <div
    className={`overflow-hidden rounded-xl ${
      cssClass ? cssClass : "bg-variant-blue-4"
    } shadow-xl`}
  >
    {children}
  </div>
);

export default Card;
