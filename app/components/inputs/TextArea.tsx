import { RefObject } from "react";

interface TextAreaProps {
  error: string | null | undefined;
  label: string;
  htmlRef: RefObject<HTMLTextAreaElement>;
  name: string;
}

const TextArea = (props: TextAreaProps) => {
  const { error, label, name, htmlRef } = props;

  return (
    <div className="flex w-full flex-col gap-1 pb-4">
      <label>{label}</label>
      <textarea
        ref={htmlRef}
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

export default TextArea;
