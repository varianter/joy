import { useRouteError } from "@remix-run/react";
import ErrorComponent from "~/components/Error";

const Courses = () => {
  return (
    <div className="my-8 max-w-4xl text-left text-white">
      <h1 className="mt-8">Kurs</h1>
      <p className="mt-4 mb-12">
        Av og til ønsker vi å lære bort i dybden. Veldig ofte til studenter, men
        også til oss selv og andre i bransjen. For å gi kursene våre enda mer
        åpenhet og bredde, vil vi her samle alle kurs sånn at du kan utføre de
        der du er når det passer deg. Vi har allerede en del i boks, men for at
        gjennomføringen skal bli smooth as silk, jobber vi fortsatt med
        utformingen. Kom tilbake snarlig, så finner du forhåpentligvis noe du
        kan bygge kunnskap om.
      </p>

      <h2 className="text-center">Kommer snart</h2>
    </div>
  );
};

export default Courses;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
