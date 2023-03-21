import { Form } from "@remix-run/react";

interface SearchInputProps {
  onChange: (e: any) => void;
}

export const SearchInput = (props: SearchInputProps) => {
  const { onChange } = props;

  return (
    <Form>
      <div className="relative w-auto">
        <input
          type="search"
          className="block w-full rounded-full bg-variant-pink p-4 pl-8 text-white md:bg-variant-blue-2 md:text-sm"
          placeholder="Søk ..."
          onChange={onChange}
        />
        <span className="absolute right-2.5 bottom-2.5 rounded-lg px-4 py-2 ">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </span>
      </div>
    </Form>
  );
};
