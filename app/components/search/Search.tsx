import { SearchInput } from "../search/SearchInput";
import { useSearchParams } from "@remix-run/react";
import type { Content } from "@prisma/client";
import { Link, useNavigation } from "@remix-run/react";
import { useState, useMemo, useEffect } from "react";
import type { ChangeEvent } from "react";

import { getIconForCategory } from "~/utils";
const debouce = require("lodash.debounce");

interface SearchProps {
  searchResult: Content[];
}

export const Search = (props: SearchProps) => {
  const { searchResult } = props;
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [focusIndex, setFocusIndex] = useState(0);
  const [searchIsReset, setSearchIsReset] = useState(false);

  let searchValue: string =
    searchParams.get("search") === null
      ? ""
      : searchParams.get("search")!.toString();

  const isLoadingSearchResult =
    navigation.state === "loading" &&
    navigation.location.search.includes("search")
      ? true
      : false;

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

  const debouncedResults = useMemo(() => {
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === "") {
        handleOnResetSearch();
      } else {
        fetchSearchResults(event.target.value.trim());
      }
    };

    return debouce(handleOnChange, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const handleOnKeyDown = (event: any) => {
    var tempFocusIndex;
    switch (event.code) {
      case "Enter":
        if (searchResult.length == 0) {
          fetchSearchResults(event.target.value);
        } else {
          window.location.pathname = searchResult[focusIndex].id;
        }
        event.preventDefault();
        break;
      case "ArrowUp":
        tempFocusIndex =
          focusIndex == 0 ? searchResult.length + 1 : focusIndex - 1;
        setFocusIndex(tempFocusIndex);
        event.preventDefault();
        break;
      case "ArrowDown":
        tempFocusIndex =
          focusIndex == searchResult.length - 1 ? 0 : focusIndex + 1;
        setFocusIndex(tempFocusIndex);
        event.preventDefault();
        break;
    }
  };

  return (
    <div className="my-4 grow lg:px-48">
      <SearchInput
        onChange={debouncedResults}
        searchValue={searchValue}
        onResetSearch={handleOnResetSearch}
        onKeyNavigate={handleOnKeyDown}
      />
      <div className="relative">
        {(searchResult.length > 0 ||
          isLoadingSearchResult ||
          (searchValue!.length > 0 && !isLoadingSearchResult)) && (
          <div
            className="absolute z-10 mt-2 w-full overflow-y-auto rounded-xl border bg-variant-blue-4 text-left"
            id="main-search-menu"
          >
            {isLoadingSearchResult && <p className="p-2">Søker...</p>}
            {!isLoadingSearchResult &&
              searchResult.length > 0 &&
              searchIsReset === false &&
              searchResult.map((res, index) => {
                return (
                  <Link
                    key={res.id}
                    className={`${
                      res.id === searchResult[focusIndex]?.id
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
            {!isLoadingSearchResult && searchResult.length == 0 && (
              <p className="p-2">Ingen resultater på '{searchValue}'</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
