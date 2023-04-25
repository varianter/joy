import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getLectures } from "~/models/content.server";
import CardWithMultipleContent from "~/components/card/CardWithMultipleContent";

export const loader = async () => {
  const lectures = await getLectures();
  return json({ lectures });
};

const Lectures = () => {
  const { lectures } = useLoaderData<typeof loader>();

  const featuredLectures = lectures.filter((lecture) => lecture.featured);

  const otherLectures = lectures.filter((lecture) => !lecture.featured);

  return (
    <div className="flex flex-col gap-4">
      {featuredLectures.length > 0 && (
        <CardWithMultipleContent
          content={featuredLectures}
          heading="Anbefalte 🔥"
          buttonText="Se foredrag"
        />
      )}

      {otherLectures.length > 0 && (
        <CardWithMultipleContent
          content={otherLectures}
          heading="Alle foredrag 🤩"
          buttonText="Se foredrag"
        />
      )}
    </div>
  );
};

export default Lectures;
