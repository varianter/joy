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

  const suggestedBlogposts = blogposts.filter((blogpost) => blogpost.suggested);
  const otherBlogposts = blogposts.filter((blogpost) => !blogpost.suggested);

  return (
    <div>
      <h1 className="mb-8 text-left text-4xl text-white md:text-5xl">
        Bloggposter
      </h1>

      {suggestedBlogposts.length > 0 && (
        <CardWithMultipleContent
          content={suggestedBlogposts as unknown as Content[]}
          cardHeader={"Fremhevet 🤩"}
        />
      )}

      {otherBlogposts.length > 0 && (
        <div className="mt-5">
          <CardWithMultipleContent
            content={otherBlogposts as unknown as Content[]}
            cardHeader={"Alle bloggposter 🤩"}
          />
        </div>
      )}
    </div>
  );
};

export default Blogposts;
