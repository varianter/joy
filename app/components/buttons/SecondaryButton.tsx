interface SecondaryButtonProps {
  text: string;
}

const SecondaryButton = (props: SecondaryButtonProps) => {
  const { text } = props;

  return (
    <button
      type="button"
      className="group relative inline-flex items-center justify-start overflow-hidden rounded-3xl bg-variant-blue-2 px-9 py-3 text-white transition-all hover:bg-variant-blue-2"
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
