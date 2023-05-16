interface SecondaryButtonProps {
  text: string;
  size?: "small" | "medium" | "large";
}

const SecondaryButton = ({ text, size }: SecondaryButtonProps) => {
  const setButtonSize = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "px-3 py-1 text-xs";
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
      type="button"
      className={`rounded-2xl bg-variant-blue-2 ${
        size ? setButtonSize(size) : `px-9 py-3`
      } text-white hover:bg-variant-blue`}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
