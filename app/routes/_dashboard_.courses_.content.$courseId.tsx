import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import CourseHeader from "~/components/CourseHeader";
import { getContentById } from "~/models/content.server";

export const loader = async ({ params }: LoaderArgs) => {
  const content = await getContentById(params.courseId ?? "");
  if (!content) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ content });
};

const CourseContent = () => {
  const { content } = useLoaderData<typeof loader>();
  return (
    <div>
      <CourseHeader content={content} />
      <Outlet />
    </div>
  );
};

export default CourseContent;
