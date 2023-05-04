interface TagButtonProps {
  className?: string;
  notClickable?: boolean;
  isActive?: boolean;
  text: string;
}

const TagButton = ({
  className,
  notClickable,
  isActive,
  text,
}: TagButtonProps) => {
  return (
    <button
      type="button"
      className={`${className} rounded-3xl ${
        isActive
          ? `bg-variant-beige text-black`
          : `bg-variant-blue-3 text-white`
      } px-2 py-1 text-xs ${
        notClickable ? `cursor-default` : `hover:bg-variant-blue`
      } md:px-6 md:text-sm`}
    >
      {text}
    </button>
  );
};

export default TagButton;
