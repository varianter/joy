import { Link, useParams } from "@remix-run/react";
import SecondaryButton from "~/components/buttons/SecondaryButton";

const NewCourseInformation = () => {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div className="text-white">
      <Link to={"/admin"}>
        <SecondaryButton text="Tilbake" />
      </Link>
      <h1>Du har laget et nytt kurs!</h1>
      <p>
        Nå er du nødt til å lage en child route i routes mappen til prosjektet
        som heter "_dashboard_.(navnet på kurset ditt).tsx". Her er ID-en du må
        gi til getContentById i denne routen: {courseId}
      </p>
    </div>
  );
};

export default NewCourseInformation;
