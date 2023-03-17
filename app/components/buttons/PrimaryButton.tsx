interface PrimaryButtonProps {
  text: string;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { text } = props;

  return (
    <button
      type="submit"
      className="group relative inline-flex items-center justify-start overflow-hidden rounded-3xl bg-variant-beige px-9 py-3 text-variant-blue transition-all hover:bg-variant-beige-2 "
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
