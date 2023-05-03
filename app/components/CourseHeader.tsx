import type { Content, Tag } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import Level from "~/components/Level";

type CourseHeaderProps = {
  content: SerializeFrom<Content & { tags?: Tag[] }>;
};

const CourseHeader = ({ content }: CourseHeaderProps) => {
  return (
    <div className="flex w-full justify-between pt-10">
      <div className="flex items-center">
        <img
          alt="course icon"
          className="h-[1rem] pr-2"
          src={"/assets/icons/course.svg"}
        />
        <p>Kurs</p>
      </div>
      <p>{content?.createdAt} </p>
      <h1>{content?.title}</h1>
      <div className="flex w-full flex-row justify-between pb-5 pt-10">
        {content?.tags?.map((tag: Tag) => (
          <Level key={tag.id} tag={tag.text} />
        ))}
        <ul className="flex items-end">
          {content?.tags &&
            content.tags.map((tag: Tag) => (
              <li
                key={tag.id}
                className=" mr-3 rounded-3xl bg-variant-blue-3 px-2 py-1 text-xs hover:bg-variant-blue md:px-6 md:text-sm"
              >
                {tag.text}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseHeader;
