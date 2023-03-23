import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CardWithMultipleContent } from "~/components/card/CardWithMultipleContent";
import { getBlogposts } from "~/models/content.server";
import type { Content } from "@prisma/client";

export const loader = async () => {
  const blogposts = await getBlogposts();
  return json({ blogposts: blogposts });
};

const Blogposts = () => {
  const { blogposts } = useLoaderData<typeof loader>();

  return (
    <CardWithMultipleContent
      content={blogposts as unknown as Content[]}
      categoryHeader={"Bloggposter"}
    />
  );
};

export default Blogposts;
