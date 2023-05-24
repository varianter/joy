import { SearchInput } from "../search/SearchInput";
import { useSearchParams } from "@remix-run/react";
import type { Content } from "@prisma/client";
import { Link, useNavigation, useNavigate } from "@remix-run/react";
import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { getIconForCategory } from "~/utils";

interface SearchProps {
  searchResults: Content[];
}

enum SearchState {
  Hide,
  Searching,
  ShowResults,
  NoResults,
}

export const Search = (props: SearchProps) => {
  const { searchResults } = props;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [focusIndex, setFocusIndex] = useState(0);
  const [searchIsReset, setSearchIsReset] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(
    searchResults.length > 0
  );

  let searchValue: string =
    searchParams.get("search") === null
      ? ""
      : searchParams.get("search")!.toString();

  const isLoadingSearchResults =
    navigation.state === "loading" &&
    navigation.location.search.includes("search")
      ? true
      : false;

  const setInitialSearchState = () => {
    if (isLoadingSearchResults) {
      return SearchState.Searching;
    } else if (
      searchResults.length > 0 &&
      showSearchResults &&
      !searchIsReset
    ) {
      return SearchState.ShowResults;
    } else if (searchValue.length > 0 && searchResults.length === 0) {
      return SearchState.NoResults;
    } else {
      return SearchState.Hide;
    }
  };

  const searchState = setInitialSearchState();

  const fetchSearchResults = (searchText: string) => {
    searchParams.set("search", searchText);
    setSearchParams(searchParams);
    setSearchIsReset(false);
    setFocusIndex(0);
  };

  const handleOnResetSearch = () => {
    searchParams.delete("search");
    setSearchParams(searchParams);
    // Close searchResult-dropdown before search has completed
    setSearchIsReset(true);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      handleOnResetSearch();
    } else {
      fetchSearchResults(event.target.value.trim());
    }
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    let tempFocusIndex;
    switch (event.code) {
      case "Enter":
        if (searchResults.length == 0) {
          const target = event.target as HTMLInputElement;
          fetchSearchResults(target.value);
        } else {
          navigate(searchResults[focusIndex].id);
        }
        event.preventDefault();
        break;
      case "ArrowUp":
        tempFocusIndex =
          focusIndex == 0 ? searchResults.length + 1 : focusIndex - 1;
        setFocusIndex(tempFocusIndex);
        event.preventDefault();
        break;
      case "ArrowDown":
        tempFocusIndex =
          focusIndex == searchResults.length - 1 ? 0 : focusIndex + 1;
        setFocusIndex(tempFocusIndex);
        event.preventDefault();
        break;
    }
  };

  return (
    <div className="my-4 grow lg:px-48">
      <SearchInput
        onChange={handleOnChange}
        searchValue={searchValue}
        onResetSearch={handleOnResetSearch}
        onKeyNavigate={handleOnKeyDown}
        handleOnFocus={(isFocus) => {
          setShowSearchResults(isFocus);
        }}
      />
      <div className="relative">
        {(searchState === SearchState.Searching ||
          searchState === SearchState.ShowResults ||
          searchState === SearchState.NoResults) && (
          <div
            className="absolute z-10 mt-2 w-full overflow-y-auto rounded-xl border bg-variant-blue-4 text-left"
            id="main-search-menu"
          >
            {searchState === SearchState.Searching && (
              <p className="p-2">Søker...</p>
            )}
            {searchState === SearchState.ShowResults &&
              searchResults.map((res, index) => {
                return (
                  <Link
                    key={res.id}
                    className={`${
                      res.id === searchResults[focusIndex]?.id
                        ? "bg-variant-blue-3"
                        : ""
                    } block truncate p-2 hover:bg-variant-blue-3 hover:font-medium focus:bg-variant-blue-3`}
                    to={res.id}
                    onMouseEnter={(e) => setFocusIndex(index)}
                  >
                    <span>{res.title}</span>
                    <img
                      alt={"Kategoriikon"}
                      className="fill-current ml-1 inline h-[1rem] text-variant-pink"
                      src={`/assets/icons/${getIconForCategory(
                        res.category
                      )}_dark.svg`}
                    />
                  </Link>
                );
              })}
            {searchState === SearchState.NoResults && (
              <p className="p-2">Ingen resultater på '{searchValue}'</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
