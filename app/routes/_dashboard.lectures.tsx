import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getLectures } from "~/models/content.server";
import CardWithMultipleContent from "~/components/card/CardWithMultipleContent";
import ErrorComponent from "~/components/Error";

export const loader = async () => {
  const lectures = await getLectures();
  return json({ lectures });
};

const Lectures = () => {
  const { lectures } = useLoaderData<typeof loader>();

  const featuredLectures = lectures.filter((lecture) => lecture.featured).splice(0, 2);

  return (
    <div className="flex flex-col gap-4">
      {featuredLectures.length > 0 && (
        <CardWithMultipleContent
          content={featuredLectures}
          heading="Anbefalte 🔥"
          buttonText="Se foredrag"
        />
      )}

      {lectures.length > 0 && (
        <CardWithMultipleContent
          content={lectures}
          heading="Alle foredrag 🤩"
          buttonText="Se foredrag"
        />
      )}
    </div>
  );
};

export default Lectures;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
