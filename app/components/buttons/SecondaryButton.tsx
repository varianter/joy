interface SecondaryButtonProps {
  text: string;
}

const SecondaryButton = (props: SecondaryButtonProps) => {
  const { text } = props;

  return (
    <button
      type="button"
      className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-variant-gray px-6 py-3 font-medium text-variant-blue transition-all hover:bg-variant-gray hover:text-variant-pink"
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
