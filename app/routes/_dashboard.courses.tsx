import { NavLink, useLoaderData, useRouteError } from "@remix-run/react";
import { getCourses } from "~/models/content.server";
import PreviewCardList from "~/components/card/PreviewCardList";
import { json } from "@remix-run/node";
import ErrorComponent from "~/components/Error";
import SecondaryButton from "~/components/buttons/SecondaryButton";

export const loader = async () => {
  const courses = await getCourses();
  return json({ courses });
};

const Courses = () => {
  const { courses } = useLoaderData<typeof loader>();

  return (
    <div className="my-8 max-w-4xl text-left text-white">
      <NavLink to={"/"}>
        <SecondaryButton size="small" text="Tilbake" />
      </NavLink>
      <h1 className="my-8">Kurs</h1>
      <p className="my-8">
        Av og til ønsker vi å lære bort i dybden. Veldig ofte til studenter, men
        også til oss selv og andre i bransjen. For å gi kursene våre enda mer
        åpenhet og bredde, vil vi her samle alle kurs sånn at du kan utføre de
        der du er når det passer deg. Vi har allerede en del i boks, men for at
        gjennomføringen skal bli smooth as silk, jobber vi fortsatt med
        utformingen. Kom tilbake snarlig, så finner du forhåpentligvis noe du
        kan bygge kunnskap om.
      </p>

      <h2 className="text-center">Kommer snart</h2>

      {/* <section className="flex flex-col items-center justify-center">
        <PreviewCardList content={courses} heading="Kurs" />
      </section> */}
    </div>
  );
};

export default Courses;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
