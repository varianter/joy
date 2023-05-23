interface ToggleProps {
  leftText: string;
  rightText: string;
  label: string;
  inputName: string;
  defaultChecked?: boolean;
}

const Toggle = (props: ToggleProps) => {
  const { leftText, rightText, label, inputName, defaultChecked } = props;

  return (
    <div className="flex flex-col">
      <span className="mb-3">{label}</span>
      <label
        htmlFor="toggle"
        className="text-gray-100 inline-flex cursor-pointer items-center space-x-4"
      >
        <span>{leftText}</span>
        <span className="relative">
          <input
            id="toggle"
            name={inputName}
            type="checkbox"
            className="peer hidden"
            defaultChecked={defaultChecked}
          />
          <div className="h-6 w-10 rounded-full bg-variant-blue-3 shadow-inner"></div>
          <div className="absolute inset-y-0 left-0 m-1 h-4 w-4 rounded-full bg-variant-blue shadow peer-checked:right-0 peer-checked:left-auto"></div>
        </span>
        <span>{rightText}</span>
      </label>
    </div>
  );
};

export default Toggle;
