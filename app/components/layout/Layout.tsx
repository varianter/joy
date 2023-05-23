import type { Content } from "@prisma/client";
import { Form, Link, NavLink } from "@remix-run/react";
import PrimaryButton from "../buttons/PrimaryButton";
import type { ReactNode } from "react";
import Footer from "../Footer";
import { Search } from "../search/Search";

interface LayoutProps {
  children: ReactNode;
  isAuthenticated: boolean;
  searchResult: Content[];
}

export const Layout = ({
  children,
  isAuthenticated,
  searchResult,
}: LayoutProps) => {
  return (
    <main className="background min-h-screen text-center">
      <div className="mx-6 flex flex-wrap justify-between gap-4 py-6 sm:flex-nowrap sm:px-6 ">
        <div className="flex items-center">
          <NavLink className="w-32" to="/">
            <img alt={"Variant-logo"} src={"/assets/variant-bw.svg"} />
          </NavLink>
        </div>

        <div className="my-4 grow lg:px-48">
          <Search searchResult={searchResult} />
        </div>
        <div
          className={`hidden items-center sm:order-last md:flex ${
            isAuthenticated ? "grid-cols-2" : "grid-cols-1"
          } gap-2`}
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

      <div className="mx-4 flex min-h-[30rem] justify-center sm:mx-12 md:mx-16 lg:mx-auto lg:w-full lg:max-w-6xl">
        {children}
      </div>
      <Footer isAuthenticated={isAuthenticated} />
    </main>
  );
};
