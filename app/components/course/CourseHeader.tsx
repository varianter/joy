import type { Content, Tag } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import Level from "~/components/Level";
import { formatDate } from "~/utils";

type CourseHeaderProps = {
  content: SerializeFrom<Content & { tags?: Tag[] }>;
  author: string;
};

const CourseHeader = ({ content, author }: CourseHeaderProps) => {
  const sortedDifficultTags = content?.tags
    ?.filter((tag: Tag) =>
      ["Nybegynner", "Middels", "Avansert"].includes(tag.text)
    )
    .sort((a: Tag, b: Tag) => {
      const order: string[] = ["Nybegynner", "Middels", "Avansert"];
      return order.indexOf(a.text) - order.indexOf(b.text);
    });

  const otherTags = content?.tags?.filter(
    (tag: Tag) => !["Nybegynner", "Middels", "Avansert"].includes(tag.text)
  );

  return (
    <div className="flex w-full flex-col justify-between pt-10">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            alt="course icon"
            className="h-[1rem] pr-2"
            src={"/assets/icons/course.svg"}
          />
          <h4>Kurs</h4>
        </div>
        <p>{formatDate(new Date(content?.createdAt))} </p>
      </div>

      <h1 className="pt-2 text-left">{content?.title}</h1>

      <div className="flex flex-row items-start justify-between pb-12 pt-10">
        <div>
          {author !== undefined && <h4 className="pb-5">{`av ${author}`}</h4>}
          {sortedDifficultTags?.map((tag: Tag) => (
            <Level key={tag.id} tag={tag.text} />
          ))}
        </div>
        <ul className="flex w-6/12 flex-wrap justify-end gap-2">
          {otherTags?.map((tag: Tag) => (
            <li
              key={tag.id}
              className="rounded-3xl bg-variant-blue-3 px-2 py-1 text-xs hover:bg-variant-blue md:px-6 md:text-sm"
            >
              {tag.text}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-left">{content?.description}</p>
    </div>
  );
};

export default CourseHeader;
