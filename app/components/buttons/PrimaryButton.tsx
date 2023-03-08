interface PrimaryButtonProps {
  text: string;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { text } = props;

  return (
    <button className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-variant-blue px-6 py-3 font-medium text-white transition-all hover:bg-variant-white hover:text-black">
      {text}
    </button>
  );
};

export default PrimaryButton;
