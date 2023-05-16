import { useLoaderData, useRouteError } from "@remix-run/react";
import { getCourses } from "~/models/content.server";
import PreviewCardList from "~/components/card/PreviewCardList";
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
      <PreviewCardList content={courses} heading="Kurs" />
    </section>
  );
};

export default Courses;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
