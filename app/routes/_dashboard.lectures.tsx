import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getLectures } from "~/models/content.server";
import PreviewCardList from "~/components/card/PreviewCardList";
import ErrorComponent from "~/components/Error";
import { separateFeaturedAndOtherContent } from "~/utils";

export const loader = async () => {
  const lectures = await getLectures();
  return json({ lectures });
};

const Lectures = () => {
  const { lectures } = useLoaderData<typeof loader>();

  const [featuredLectures, otherLectures] =
    separateFeaturedAndOtherContent(lectures);

  return (
    <div className="flex flex-col gap-4">
      {featuredLectures.length > 0 && (
        <PreviewCardList
          content={featuredLectures}
          heading="Tre utvalgte favoritter"
          buttonText="Se foredrag"
        />
      )}

      {otherLectures.length > 0 && (
        <PreviewCardList
          content={otherLectures}
          heading="Andre foredrag"
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
