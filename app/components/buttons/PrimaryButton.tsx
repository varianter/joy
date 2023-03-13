interface PrimaryButtonProps {
  text: string;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { text } = props;

  return (
    <button className="group relative inline-flex items-center justify-start overflow-hidden rounded-3xl bg-variant-beige px-9 py-3 font-medium text-variant-blue transition-all  hover:bg-variant-secondary-beige">
      {text}
    </button>
  );
};

export default PrimaryButton;
