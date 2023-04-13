interface PrimaryButtonProps {
  text: string;
  disabled?: boolean;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { text, disabled } = props;

  return (
    <button
      type="submit"
      disabled={disabled}
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
