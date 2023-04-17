interface PrimaryButtonProps {
  text: string;
  disabled?: boolean;
  onClickFunction?: () => void;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { text, disabled, onClickFunction } = props;

  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClickFunction}
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
