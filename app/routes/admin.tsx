import { NavLink, Outlet, useRouteError } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import ErrorComponent from "~/components/Error";
import NavigationCard from "~/components/card/NavigationCard";
import { requireUserSession } from "~/services/session";

export const loader = async ({ request }: LoaderArgs) => {
  return await requireUserSession(request);
};

const Admin = () => {
  return (
    <div className="flex flex-col">
      <section className="text-left text-white sm:w-1/2">
        <h1>Admin 🥷</h1>
        <p>
          Her kan du legge til, fjerne eller endre innhold. Ved spørsmål eller
          problemer, ta kontakt med xx@variant.no
        </p>
      </section>
      <section>
        <div className="mt-5 flex flex-col gap-5 md:flex-row">
          <NavLink to="new">
            {({ isActive }) => (
              <NavigationCard
                title="Legg til innhold"
                isActive={isActive}
                icon={
                  <img
                    alt={"Figur av læreglede"}
                    className="h-[3rem]"
                    src={
                      isActive
                        ? "/assets/icons/newContent_dark.svg"
                        : "/assets/icons/newContent.svg"
                    }
                  />
                }
              />
            )}
          </NavLink>
          <NavLink to="edit">
            {({ isActive }) => (
              <NavigationCard
                title="Endre innhold"
                isActive={isActive}
                icon={
                  <img
                    alt={"Figur av læreglede"}
                    className="h-[3rem]"
                    src={
                      isActive
                        ? "/assets/icons/editContent_dark.svg"
                        : "/assets/icons/editContent.svg"
                    }
                  />
                }
              />
            )}
          </NavLink>
          <NavLink to="delete">
            {({ isActive }) => (
              <NavigationCard
                title="Slett innhold"
                isActive={isActive}
                icon={
                  <img
                    alt={"Figur av læreglede"}
                    className="h-[3rem]"
                    src={
                      isActive
                        ? "/assets/icons/deleteContent_dark.svg"
                        : "/assets/icons/deleteContent.svg"
                    }
                  />
                }
              />
            )}
          </NavLink>
        </div>
      </section>
      <Outlet />
    </div>
  );
};

export default Admin;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
