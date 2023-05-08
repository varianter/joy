import type { Content } from "@prisma/client";
import { Form, Link, NavLink, useSearchParams } from "@remix-run/react";
import PrimaryButton from "../buttons/PrimaryButton";
import { SearchInput } from "../search/SearchInput";
import type { ReactNode } from "react";
import Footer from "../Footer";

interface LayoutProps {
  children: ReactNode;
  isAuthenticated: boolean;
  isLoadingSearchResult: boolean;
  searchResult: Content[];
}

export const Layout = ({
  children,
  isAuthenticated,
  isLoadingSearchResult,
  searchResult,
}: LayoutProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnChangeSearch = (event: any) => {
    if (event.target.value === "") {
      searchParams.delete("search");
      setSearchParams(searchParams);
    } else {
      searchParams.set("search", event.target.value);
      setSearchParams(searchParams);
    }
  };

  return (
    <main className="background min-h-screen text-center">
      <div className="mx-6 gap-4 py-6 sm:flex sm:px-6">
        <div className="flex sm:items-center">
          <NavLink className="w-32" to="/">
            <img alt={"Variant-logo"} src={"/assets/variant-bw.svg"} />
          </NavLink>
          <h1 className="hidden text-white md:ml-6 md:mt-2 md:block md:text-4xl">
            Læreglede
          </h1>
        </div>

        <div className="my-4 w-full lg:px-48">
          <SearchInput onChange={handleOnChangeSearch} />
          <div className="relative">
            {(searchResult.length > 0 || isLoadingSearchResult) && (
              <div className="absolute z-10 mt-2 w-full overflow-y-auto rounded-xl border bg-variant-blue-4 text-left">
                {isLoadingSearchResult && <p className="p-2">Søker...</p>}
                {!isLoadingSearchResult &&
                  searchResult.length > 0 &&
                  searchResult.map((res) => {
                    return (
                      <Link
                        key={res.id}
                        className="block truncate p-2 hover:bg-variant-blue-3 focus:bg-variant-blue-3"
                        to={res.id}
                      >
                        <span>{res.title}</span>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <div
          className={`hidden items-center sm:flex ${
            isAuthenticated ? "sm:grid-cols-2" : "sm:grid-cols-1"
          } sm:gap-2`}
        >
          {isAuthenticated && (
            <Link to="/admin">
              <PrimaryButton type="button" text="Admin" size="medium" />
            </Link>
          )}

          <Form
            className=""
            action={`/auth/${isAuthenticated ? "logout" : "login"}`}
            method="post"
          >
            <PrimaryButton
              type="submit"
              text={isAuthenticated ? "Logg ut" : "Logg inn"}
              size="medium"
            />
          </Form>
        </div>
      </div>

      <div className="mx-[1rem] flex min-h-[30rem] justify-center sm:mx-[5rem] lg:mx-[20rem] xl:mx-[30rem] ">
        {children}
      </div>
      <Footer isAuthenticated={isAuthenticated} />
    </main>
  );
};
