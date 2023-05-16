interface SecondaryButtonProps {
  text: string;
}

const SecondaryButton = ({ text }: SecondaryButtonProps) => {
  return (
    <button
      type="button"
      className="rounded-2xl bg-variant-blue-2 px-9 py-3 text-white hover:bg-variant-blue"
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
