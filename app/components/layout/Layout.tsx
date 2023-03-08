import { Link, Outlet } from "@remix-run/react";
import PrimaryButton from "../buttons/PrimaryButton";

interface LayoutProps {
  isAuthenticated: boolean;
}

export const Layout = (props: LayoutProps) => {
  const { isAuthenticated } = props;

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#423D89] to-[#E61A6B] p-5 px-6 text-center">
      <div className="flex pb-5">
        <Link to="/">
          <img
            alt={"Figur av læreglede"}
            className="h-[7rem]"
            src={"/assets/default-article-image.svg"}
          />
        </Link>

        <form
          className="ml-auto pt-5"
          action={`/auth/${isAuthenticated ? "logout" : "login"}`}
          method="post"
        >
          <PrimaryButton text={isAuthenticated ? "Logg ut" : "Logg inn"} />
        </form>
      </div>
      <Outlet />
    </main>
  );
};
