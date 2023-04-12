import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getLectures } from "~/models/content.server";
import CardWithMultipleContent from "~/components/card/CardWithMultipleContent";
import type { Content } from "@prisma/client";

export const loader = async () => {
  const lectures = await getLectures();
  return json({ lectures: lectures });
};

const Lecture = () => {
  const { lectures } = useLoaderData<typeof loader>();

  const suggestedLectures = lectures.filter(
    (lecture) => lecture.suggested
  ) as unknown as Content[];

  const otherLectures = lectures.filter(
    (lecture) => !lecture.suggested
  ) as unknown as Content[];

  return (
    <div className="flex flex-col gap-4">
      {suggestedLectures.length > 0 && (
        <CardWithMultipleContent
          content={suggestedLectures}
          header={"Anbefalte 🔥"}
          buttonText={"Se foredrag"}
        />
      )}

      {otherLectures.length > 0 && (
        <CardWithMultipleContent
          content={otherLectures}
          header={"Alle foredrag 🤩"}
          buttonText={"Se foredrag"}
        />
      )}
    </div>
  );
};

export default Lecture;
