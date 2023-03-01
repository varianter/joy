import { Outlet } from "@remix-run/react";

export const Layout = () => {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#423D89] to-[#E61A6B] px-6 text-center">
      <Outlet />
    </main>
  );
};
