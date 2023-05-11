interface SecondaryButtonProps {
  text: string;
}

const SecondaryButton = (props: SecondaryButtonProps) => {
  const { text } = props;

  return (
    <button
      type="button"
      className="s:w-auto w-full rounded-2xl bg-variant-blue-2 px-9 py-3 text-white hover:bg-variant-blue"
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
