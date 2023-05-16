import type { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card = ({ children, className }: CardProps) => (
  <div
    className={`overflow-hidden rounded-xl 
    shadow-xl ${className ? className : "bg-variant-blue-4"}`}
  >
    {children}
  </div>
);

export default Card;
