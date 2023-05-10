import { Link, useParams } from "@remix-run/react";
import SecondaryButton from "~/components/buttons/SecondaryButton";

const NewCourseInformation = () => {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div className="mt-16 flex flex-col items-start text-white md:mt-32">
      <Link to={"/admin"}>
        <SecondaryButton text="Tilbake" />
      </Link>
      <h3 className="mt-10">Du har laget et nytt internt kurs!</h3>
      <p className="mb-3 mt-5">
        Følg disse stegene for å implementere kurset ditt:
      </p>
      <ul className="mx-5 list-disc space-y-4">
        <li>
          Opprett en tsx-fil i routes mappen som du kaller
          "_dashboard_.courses_.&#123;kursnavnet&#125;". F.eks. hvis du kalte
          kurset ttc2022, så vil filen hete '_dashboard_.courses_.ttc2022.tsx'.
        </li>
        <li>
          I loaderen må du bruke getContentById() for å hente dataen som du la
          inn for kurset ditt når du opprettet det. Denne metoden må ha kursets
          ID som input, og det er: {courseId}
        </li>
        <li>
          Se på filen '_dashboard_.courses_.ttc2022.tsx' for inspirasjon til
          hvilke komponenter du kan bruke for å bygge kurset ditt. F.eks. kan du
          bruke CourseHeader for å lage headeren og CourseNavigationLink for å
          lage linker til deler av kurset ditt!
        </li>
      </ul>
    </div>
  );
};

export default NewCourseInformation;
