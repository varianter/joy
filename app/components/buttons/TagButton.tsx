interface TagButtonProps {
  text: string;
}

const TagButton = (props: TagButtonProps) => {
  const { text } = props;

  return (
    <button
      type="button"
      className="rounded-3xl bg-variant-blue-3 px-2 py-1 text-xs text-white hover:bg-variant-blue md:px-6 md:text-sm"
    >
      {text}
    </button>
  );
};

export default TagButton;
