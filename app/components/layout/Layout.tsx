import { Link, Outlet } from "@remix-run/react";
import PrimaryButton from "../buttons/PrimaryButton";

interface LayoutProps {
  isAuthenticated: boolean;
}

export const Layout = (props: LayoutProps) => {
  const { isAuthenticated } = props;

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#423D89] to-[#E61A6B] p-5 px-6 text-center">
      <div className="flex justify-end gap-4 pb-5">
        {isAuthenticated && (
          <Link to="/admin">
            <PrimaryButton text="Admin" />
          </Link>
        )}

        <form
          action={`/auth/${isAuthenticated ? "logout" : "login"}`}
          method="post"
        >
          <PrimaryButton text={isAuthenticated ? "Logg ut" : "Logg in"} />
        </form>
      </div>
      <Outlet />
    </main>
  );
};
