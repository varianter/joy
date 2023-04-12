import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBlogposts } from "~/models/content.server";
import type { Content } from "@prisma/client";
import CardWithMultipleContent from "~/components/card/CardWithMultipleContent";

export const loader = async () => {
  const blogposts = await getBlogposts();
  return json({ blogposts: blogposts });
};

const Blogposts = () => {
  const { blogposts } = useLoaderData<typeof loader>();

  const suggestedBlogposts = blogposts.filter(
    (blogpost) => blogpost.suggested
  ) as unknown as Content[];

  const otherBlogposts = blogposts.filter(
    (blogpost) => !blogpost.suggested
  ) as unknown as Content[];

  return (
    <div className="flex flex-col gap-4">
      {suggestedBlogposts.length > 0 && (
        <CardWithMultipleContent
          content={suggestedBlogposts}
          header={"Anbefalte 🔥"}
          buttonText={"Les mer"}
        />
      )}

      {otherBlogposts.length > 0 && (
        <CardWithMultipleContent
          content={otherBlogposts}
          header={"Alle bloggposter 🤩"}
          buttonText={"Les mer"}
        />
      )}
    </div>
  );
};

export default Blogposts;
