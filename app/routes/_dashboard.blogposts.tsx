import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getBlogposts } from "~/models/content.server";
import CardWithMultipleContent from "~/components/card/CardWithMultipleContent";
import ErrorComponent from "~/components/Error";

export const loader = async () => {
  const blogposts = await getBlogposts();
  return json({ blogposts });
};

const Blogposts = () => {
  const { blogposts } = useLoaderData<typeof loader>();

  const featuredBlogposts = blogposts.filter((blogpost) => blogpost.featured).slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      {featuredBlogposts.length > 0 && (
        <CardWithMultipleContent
          content={featuredBlogposts}
          heading="Anbefalte 🔥"
          buttonText="Les mer"
        />
      )}

      {blogposts.length > 0 && (
        <CardWithMultipleContent
          content={blogposts}
          heading="Alle bloggposter 🤩"
          buttonText="Les mer"
        />
      )}
    </div>
  );
};

export default Blogposts;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
