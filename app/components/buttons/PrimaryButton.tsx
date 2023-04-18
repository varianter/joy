interface PrimaryButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: "submit" | "reset" | "button";
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { text, disabled, onClick, type } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={(e) => onClick && onClick(e)}
      className={`rounded-3xl ${
        disabled ? "bg-variant-gray" : "bg-variant-beige"
      } px-9 py-3 text-variant-blue transition-all ${
        !disabled && "hover:bg-variant-beige-2"
      }`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
