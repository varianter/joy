import { json } from "@remix-run/node";
import { NavLink, useLoaderData, useRouteError } from "@remix-run/react";
import { getContentById } from "~/models/content.server";
import SecondaryButton from "~/components/buttons/SecondaryButton";
import CheckTask from "~/components/CheckTask";
import ErrorComponent from "~/components/Error";
import CourseHeader from "~/components/course/CourseHeader";
import CourseNavigationLink from "~/components/course/CourseNavigationLink";

export const loader = async () => {
  const ttc2022 = await getContentById("6181d8fe-375a-4263-bc24-36cc22ef4091");
  if (!ttc2022) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ ttc2022 });
};

const Ttc2022 = () => {
  const { ttc2022 } = useLoaderData<typeof loader>();
  let author = "Martin Martinsen";

  return (
    <div className="mt-16 flex flex-col items-start text-white md:mt-32 ">
      <NavLink to={"/courses"}>
        <SecondaryButton text="Tilbake" />
      </NavLink>
      <CourseHeader content={ttc2022} author={author} />

      <hr className="my-5 h-px w-full"></hr>

      <h4>Innhold</h4>
      <CourseNavigationLink id="intro" text="Intro" />
      <CourseNavigationLink id="chapter1" text="Kapittel 1" />
      <CourseNavigationLink id="chapter2" text="Kapittel 2" />

      <h2 id="intro" className="mt-5 py-10">
        Intro
      </h2>
      <div className=" flex w-full rounded-2xl bg-variant-blue-2 p-5">
        Slides...
      </div>

      <h2 id="chapter1" className="mt-5 py-10">
        Kapittel 1 med oppgaveliste
      </h2>
      <CheckTask
        title="Oppgave 1: skriv navnet ditt"
        description="Bruk turtle-komandoene som forward(), left(), right(), penup() og
            pendown() til å skrive navnet ditt i Python."
        done={true}
      />
      <CheckTask
        title="Oppgave 2: Fyldte bokstaver"
        description=" Som neste utfordring skal du lage den første bokstaven i navnet ditt som en fyllt bokstav.
        Her kan det være lurt å dele bokstaven opp i enkle figurer som firkanter, trekanter og halvsirkler, og tegne én og én del."
        done={true}
      />
      <CheckTask
        title="Oppgave 3: Figurer"
        description="Lek deg med ulike farger, og tegn et hus, en bil eller noe annet du har lyst til å lage. Bruk fantasien!"
        done={false}
      />

      <h2 id="chapter2" className="mt-5 py-10">
        Kapittel 2 med oppgaveliste
      </h2>
      <CheckTask
        title="Oppgave 4: Figurer"
        description="Lek deg med ulike farger, og tegn et hus, en bil eller noe annet du har lyst til å lage. Bruk fantasien!"
        done={false}
      />
    </div>
  );
};

export default Ttc2022;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
