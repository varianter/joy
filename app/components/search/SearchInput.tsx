import { Form } from "@remix-run/react";
import { useState, useRef } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";
import { DebounceInput } from "react-debounce-input";

interface SearchInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  onResetSearch: () => void;
  onKeyNavigate?: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleOnFocus?: (isFocus: boolean) => void;
}

export const SearchInput = (props: SearchInputProps) => {
  const { onChange, searchValue, onResetSearch, onKeyNavigate, handleOnFocus } =
    props;
  const [searchText, setSearchText] = useState(searchValue);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Form>
      <div
        className="relative w-auto"
        onFocus={() =>
          handleOnFocus != null ? handleOnFocus(true) : undefined
        }
        onBlur={() =>
          handleOnFocus != null ? handleOnFocus(false) : undefined
        }
      >
        <DebounceInput
          type="search"
          className="block w-full rounded-full bg-variant-blue p-4 pl-8 font-sans text-sm text-white placeholder:text-white"
          placeholder="Søk ..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(e);
            setSearchText(e.target.value);
          }}
          onKeyDown={onKeyNavigate}
          value={searchText}
          debounceTimeout={300}
        />
        {searchText.length > 0 && (
          <button
            className="absolute bottom-2.5 right-10 rounded-lg px-4 py-2"
            type="reset"
            aria-label="Tøm søket"
            onClick={() => {
              onResetSearch();
              setSearchText("");
            }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              viewBox="0 0 22 22"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        <button
          className="absolute bottom-2.5 right-2.5 rounded-lg px-4 py-2 "
          onClick={() => inputRef.current?.focus()}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="white"
            viewBox="0 0 22 22"
            strokeWidth="1.5"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </Form>
  );
};
