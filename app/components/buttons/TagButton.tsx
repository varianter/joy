interface TagButtonProps {
  className?: string;
  isActive?: boolean;
  text: string;
}

const TagButton = ({ className, isActive, text }: TagButtonProps) => {
  return (
    <button
      type="button"
      className={`${className} rounded-3xl ${
        isActive
          ? `bg-variant-beige text-black`
          : `bg-variant-blue-3 text-white`
      } px-2 py-1 text-xs hover:bg-variant-blue md:px-6 md:text-sm`}
    >
      {text}
    </button>
  );
};

export default TagButton;
