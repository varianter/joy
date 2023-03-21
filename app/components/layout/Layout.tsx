import { Content } from "@prisma/client";
import { Link, Outlet, useSearchParams } from "@remix-run/react";
import PrimaryButton from "../buttons/PrimaryButton";
import { SearchInput } from "../search/SearchInput";

interface LayoutProps {
  isAuthenticated: boolean;
  searchResult: Content[];
}
export const Layout = (props: LayoutProps) => {
  const { isAuthenticated, searchResult } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (event: any) => {
    if (event.target.value === "") setSearchParams(undefined);
    setSearchParams({ search: event.target.value });
  };

  return (
    <main className="background min-h-screen p-5 px-6 text-center">
      <div className="grid pb-5  md:grid-cols-2">
        <div className="flex items-center">
          <Link to="/">
            <img
              alt={"Figur av læreglede"}
              className="h-[2rem]"
              src={"/assets/variant-bw.svg"}
            />
          </Link>
          <h1 className="ml-6 mt-2 text-4xl text-white">Læreglede</h1>
        </div>

        <div className="flex">
          <div className="relative ml-auto mt-5 w-full md:w-2/3">
            <SearchInput onChange={onChange} />
            {searchResult.length > 0 && (
              <div className="absolute z-10 mt-2 max-h-48 w-full divide-y overflow-y-auto rounded-xl border bg-variant-blue-4 text-left">
                <div className="block grid grid-cols-2 gap-4 p-2">
                  <span className="font-bold">Tittel</span>
                  <span className="font-bold">Forfatter</span>
                </div>
                {searchResult.map((res) => {
                  return (
                    <Link
                      key={res.id}
                      className="block grid grid-cols-2 gap-4 p-2 hover:bg-variant-blue-3"
                      to="#"
                    >
                      <span className="truncate">{res.title}</span>
                      <span className="truncate">{res.author}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <form
            className="ml-auto hidden pt-5 md:block"
            action={`/auth/${isAuthenticated ? "logout" : "login"}`}
            method="post"
          >
            <PrimaryButton text={isAuthenticated ? "Logg ut" : "Logg inn"} />
          </form>
        </div>
      </div>
      <div className="mt-36 lg:mx-[15rem]">
        <Outlet />
      </div>
    </main>
  );
};
