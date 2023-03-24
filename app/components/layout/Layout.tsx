import type { Content } from "@prisma/client";
import { Link, Outlet, useSearchParams } from "@remix-run/react";
import PrimaryButton from "../buttons/PrimaryButton";
import NavigationCard from "../card/NavigationCard";
import { SearchInput } from "../search/SearchInput";

interface LayoutProps {
  isAuthenticated: boolean;
  searchResult: Content[];
  isLoadingSearchResult: boolean;
  numVideos: number;
  numBlogposts: number;
}

export const Layout = (props: LayoutProps) => {
  const {
    isAuthenticated,
    searchResult,
    isLoadingSearchResult,
    numVideos,
    numBlogposts
  } = props;

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
    <main className="background min-h-screen p-5 px-6 text-center">
      <div className="grid pb-5 md:grid-cols-2">
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
            <SearchInput onChange={handleOnChangeSearch} />
            {(searchResult.length > 0 || isLoadingSearchResult) && (
              <div className="absolute z-10 mt-2 max-h-48 w-full divide-y  overflow-y-auto rounded-xl border bg-variant-blue-4 text-left">
                {isLoadingSearchResult && <p className="p-2">Laster...</p>}
                {!isLoadingSearchResult &&
                  searchResult.length > 0 &&
                  searchResult.map((res) => {
                    return (
                      <Link
                        key={res.id}
                        className="block truncate p-2 hover:bg-variant-blue-3"
                        to={"/content/" + res.id}
                      >
                        <span>{res.title}</span>
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

      <div className="mt-24 md:mx-[5rem] md:mt-32 lg:mx-[15rem] xl:mx-[35rem]">
        <section className="text-left">
          <p className="text-2xl text-white">En variant av</p>
          <h1 className="text-5xl text-white">Læreglede</h1>
          <p className="mt-4 text-white">
            Lorem ipsum dolor sit amet consectetur. Amet ultrices id posuere
            purus etiam tincidunt non varius. Auctor vitae congue id ac tellus.
            Nibh pellentesque.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Link to="blogposts">
            <NavigationCard
              header={`Bloggposter (${numBlogposts})`}
              icon={
                <img
                  alt={"Figur av bloggpost"}
                  className="h-[3rem]"
                  src={"/assets/icons/blogpost.svg"}
                />
              }
            />
          </Link>

          <Link to="lecture">
            <NavigationCard
              header="Foredrag (0)"
              icon={
                <img
                  alt={"Figur av foredrag"}
                  className="h-[3rem]"
                  src={"/assets/icons/lecture.svg"}
                />
              }
            />
          </Link>

          <Link to="course">
            <NavigationCard
              header="Kurs (0)"
              icon={
                <img
                  alt={"Figur av kurs"}
                  className="h-[3rem]"
                  src={"/assets/icons/course.svg"}
                />
              }
            />
          </Link>

          <Link to="videos">
            <NavigationCard
              header={`Videoer (${numVideos})`}
              icon={
                <img
                  alt={"Figur av video"}
                  className="h-[3rem]"
                  src={"/assets/icons/video.svg"}
                />
              }
            />
          </Link>

          {/* <Link to="podcasts">
          <NavigationCard
            header="Podcasts"
            count={0}
            icon={
              <img
                alt={"Figur av læreglede"}
                className="h-[3rem]"
                src={"/assets/icons/podcast.svg"}
              />
            }
          />
        </Link> */}
        </section>
        <div className="mt-10">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
