interface TagButtonProps {
    text: string;
  }
  
  const TagButton = (props: TagButtonProps) => {
    const { text } = props;
  
    return (
      <button
        type="button"
        className="rounded-3xl bg-variant-blue-3 px-6 py-1 text-sm text-white hover:bg-variant-blue"
      >
        {text}
      </button>
    );
  };
  
  export default TagButton;
  