import { Form } from "@remix-run/react";
import type { KeyboardEvent } from "react";
import { useState } from "react";

interface SearchInputProps {
  onChange: (e: any) => void;
  searchValue: string;
}

export const SearchInput = (props: SearchInputProps) => {
  const { onChange, searchValue } = props;
  const [searchText, setSearchText] = useState(searchValue);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Form>
      <div className="relative w-auto">
        <input
          type="search"
          className="block w-full rounded-full bg-variant-blue p-4 pl-8 font-sans text-sm text-white placeholder:text-white"
          placeholder="Søk ..."
          onChange={(e) => {
            onChange(e);
            setSearchText(e.target.value);
          }}
          onKeyDown={onKeyDown}
          value={searchText}
        />
        <span className="absolute bottom-2.5 right-2.5 rounded-lg px-4 py-2 ">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </span>
      </div>
    </Form>
  );
};
