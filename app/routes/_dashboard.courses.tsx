import { useLoaderData, useRouteError } from "@remix-run/react";
import { getCourses } from "~/models/content.server";
import CardWithMultipleContent from "~/components/card/CardWithMultipleContent";
import { json } from "@remix-run/node";
import ErrorComponent from "~/components/Error";

export const loader = async () => {
  const courses = await getCourses();
  return json({ courses });
};

const Courses = () => {
  const { courses } = useLoaderData<typeof loader>();

  return (
    <section className="flex flex-col items-center justify-center">
      <CardWithMultipleContent
        content={courses}
        heading="Kurs"
        buttonText="Gå til kurs"
      />
    </section>
  );
};

export default Courses;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
