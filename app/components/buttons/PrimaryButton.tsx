interface PrimaryButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: "submit" | "reset" | "button";
  size?: "small" | "medium" | "large";
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { text, disabled, onClick, type, size } = props;

  const setButtonSize = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "px-3 py-1 text-sm";
      case "medium":
        return "px-6 py-2";
      case "large":
        return "px-9 py-3";
      default:
        return "px-9 py-3";
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={(e) => onClick && onClick(e)}
      className={`rounded-3xl font-sans ${
        disabled
          ? "bg-variant-gray"
          : "bg-variant-beige hover:bg-variant-beige-2"
      } ${size ? setButtonSize(size) : `px-9 py-3`} transition-all`}
    >
      {/* String.fromCharCode(160) creates a non-breaking space */}
      {text.replace(" ", String.fromCharCode(160))}
    </button>
  );
};

export default PrimaryButton;
