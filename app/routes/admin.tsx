import { Link, Outlet } from "@remix-run/react";
import NavigationCard from "~/components/card/NavigationCard";

const Admin = () => {
  return (
    <>
      <section className="md:w-1/2 text-left text-white">
        <h1>Admin 🥷</h1>
        <p>
          Her kan du legge til, fjerne eller endre innhold. Ved spørsmål eller
          problemer, ta kontakt med xx@variant.no
        </p>
      </section>
      <section>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
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
