import { Link, Outlet } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/server-runtime";
import NavigationCard from "~/components/card/NavigationCard";
import { requireUserSession } from "~/services/session";

export const loader = async ({ request }: LoaderArgs) => {
  return await requireUserSession(request);
};

const Admin = () => {
  return (
    <>
      <section className="text-left text-white md:w-1/2">
        <h1>Admin 🥷</h1>
        <p>
          Her kan du legge til, fjerne eller endre innhold. Ved spørsmål eller
          problemer, ta kontakt med xx@variant.no
        </p>
      </section>
      <section>
        <div className="mt-5 flex flex-col gap-5 md:flex-row">
          <Link to="content/new">
            <NavigationCard
              header="Legg til innhold"
              icon={
                <img
                  alt={"Figur av læreglede"}
                  className="h-[3rem]"
                  src={"/assets/icons/newContent.svg"}
                />
              }
            />
          </Link>
          <Link to="content/edit">
            <NavigationCard
              header="Endre innhold"
              icon={
                <img
                  alt={"Figur av læreglede"}
                  className="h-[3rem]"
                  src={"/assets/icons/editContent.svg"}
                />
              }
            />
          </Link>
          <Link to="content/delete">
            <NavigationCard
              header="Slett innhold"
              icon={
                <img
                  alt={"Figur av læreglede"}
                  className="h-[3rem]"
                  src={"/assets/icons/deleteContent.svg"}
                />
              }
            />
          </Link>
        </div>
      </section>
      <Outlet />
    </>
  );
};

export default Admin;
