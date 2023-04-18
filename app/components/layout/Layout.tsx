import type { Content } from "@prisma/client";
import { Link, Outlet, useSearchParams } from "@remix-run/react";
import PrimaryButton from "../buttons/PrimaryButton";
import { SearchInput } from "../search/SearchInput";

interface LayoutProps {
  isAuthenticated: boolean;
  searchResult: Content[];
  isLoadingSearchResult: boolean;
}

export const Layout = (props: LayoutProps) => {
  const { isAuthenticated, searchResult, isLoadingSearchResult } = props;

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
      <div className="grid p-5 px-6 pb-5 md:grid-cols-2">
        <div className="flex items-center">
          <Link to="/">
            <img
              alt={"Variant-logo"}
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
                        className="block truncate p-2 hover:bg-variant-blue-3 focus:bg-variant-blue-3"
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
            <PrimaryButton
              type="submit"
              text={isAuthenticated ? "Logg ut" : "Logg inn"}
            />
          </form>
        </div>
      </div>
      <div className="mx-5 mt-24 min-h-[40rem] sm:mt-32 md:mx-[5rem] xl:mx-[35rem]">
        <Outlet />
      </div>
      <footer className="footer mt-10">
        <div className="footer__inner">
          <div className="footer__item">
            <h2>Utforsk</h2>
            <ul>
              <li>
                <a href="https://variant.no/jobs">Ledige stillinger</a>
              </li>
              <li>
                <a href="https://handbook.variant.no">Håndbok</a>
              </li>
              <li>
                <a href="http://variant.blog" rel="noopener">
                  Blogg
                </a>
              </li>
              <li>
                <a href="https://github.com/varianter" rel="noopener">
                  Open Source
                </a>
              </li>
              <li>
                <a href="https://variant.no/kalkulator">Lønnskalkulator</a>
              </li>
              <li>
                <a href="https://styleguide.variant.no">Styleguide</a>
              </li>
              <li>
                <a
                  href="https://blog.variant.no/tagged/b%C3%A6rekraft"
                  rel="noopener"
                >
                  Bærekraft
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__item">
            <h2>Still oss spørsmål</h2>
            <ul>
              <li>
                Ring på <a href="tel:+4792807375">928 07 375</a>
              </li>
              <li>
                Mail på <a href="mailto:post@variant.no">post@variant.no</a>
              </li>
              <li>
                Tweet på{" "}
                <a
                  href="https://twitter.com/variant_as"
                  aria-label="Twitter @variant_as"
                  rel="noopener"
                >
                  @variant_as
                </a>
              </li>
              <li>
                Se bilder på{" "}
                <a
                  href="https://instagram.com/variant_as"
                  aria-label="Instagram @variant_as"
                  rel="noopener"
                >
                  @variant_as
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__item">
            <h2>Møt oss</h2>

            <p>
              Vi holder til i vårt eget hus i{" "}
              <a
                href="https://www.google.com/maps/place/Varianthuset/@63.4328051,10.397323,17z/data=!3m1!4b1!4m5!3m4!1s0x466d312df4ea1347:0xf63e949e041942ee!8m2!3d63.4328051!4d10.3995117"
                rel="noreferrer"
                target="_blank"
              >
                Thomas Angells gate 10
              </a>{" "}
              i Trondheim, i våre egne lokaler i{" "}
              <a
                href="https://www.google.com/maps/place/Variant+Oslo/@59.910812,10.7393748,17z/data=!4m5!3m4!1s0x46416f4127442c2b:0xe0534eff4f975859!8m2!3d59.9108093!4d10.7415635"
                rel="noreferrer"
                target="_blank"
              >
                Tollbugata 24
              </a>{" "}
              i Oslo og i{" "}
              <a
                href="https://g.page/Vaskerelven-39-5323"
                rel="noreferrer"
                target="_blank"
              >
                Vaskerelven 39
              </a>{" "}
              i Bergen. Kom innom for en kopp kaffe eller bare en hyggelig prat.
            </p>
          </div>
        </div>
        <div className={"footer__inner footer__inner--bottom"}>
          <div className={"footer__item footer__item--address"}>
            <address>
              <strong>Variant Trondheim AS</strong>
              <br />
              Thomas Angells gate 10 <br />
              7011 Trondheim
            </address>
          </div>
          <div className={"footer__item footer__item--address"}>
            <address>
              <strong>Variant Oslo AS</strong>
              <br />
              Tollbugata 24
              <br />
              0157 Oslo
            </address>
          </div>
          <div className={"footer__item footer__item--address"}>
            <address>
              <strong>Variant Bergen AS</strong>
              <br />
              Vaskerelven 39
              <br />
              5014 Bergen
            </address>
          </div>
        </div>
      </footer>
    </main>
  );
};
