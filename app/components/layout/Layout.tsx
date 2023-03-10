import { Link, Outlet } from "@remix-run/react";
import PrimaryButton from "../buttons/PrimaryButton";

interface LayoutProps {
  isAuthenticated: boolean;
}

export const Layout = (props: LayoutProps) => {
  const { isAuthenticated } = props;

  return (
    <main className="background min-h-screen p-5 px-6 text-center">
      <div className="flex items-center pb-5">
        <Link to="/">
          <img
            alt={"Figur av læreglede"}
            className="h-[2rem]"
            src={"/assets/variant-bw.svg"}
          />
        </Link>
        <h1 className="ml-6 mt-2 text-4xl text-white">Læreglede</h1>

        <form
          className="ml-auto pt-5"
          action={`/auth/${isAuthenticated ? "logout" : "login"}`}
          method="post"
        >
          <PrimaryButton text={isAuthenticated ? "Logg ut" : "Logg inn"} />
        </form>
      </div>
      <div className="md:mx-24 mt-36">
        <Outlet />
      </div>
    </main>
  );
};
