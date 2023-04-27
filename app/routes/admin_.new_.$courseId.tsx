import { Link, useParams } from "@remix-run/react";
import SecondaryButton from "~/components/buttons/SecondaryButton";

const CourseInformation = () => {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div className="text-white">
      <Link to={"/admin"}>
        <SecondaryButton text="Tilbake" />
      </Link>
      <h1>Du har laget et nytt kurs!</h1>

      <p>
        Her er ID-en du må gi til getContentById når du lager child routen for
        kurset ditt: {courseId}
      </p>
    </div>
  );
};

export default CourseInformation;
