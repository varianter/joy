import { RefObject } from "react";

interface InputProps {
  error: string | null | undefined;
  label: string | JSX.Element;
  ref: RefObject<HTMLInputElement>;
  name: string;
}

const Input = (props: InputProps) => {
  const { error, label, name, ref } = props;

  return (
    <div className="flex w-full flex-col gap-1 pb-4">
      <label>{label}</label>
      <input
        ref={ref}
        type="text"
        name={name}
        className="rounded-md bg-variant-blue-3 px-3 leading-loose text-black"
        aria-invalid={error ? true : undefined}
        aria-errormessage={error ? "error" : undefined}
      />
      {error && (
        <div className="pb-1 text-variant-pink-2" id="error">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
