import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getBlogposts } from "~/models/content.server";
import PreviewCardList from "~/components/card/PreviewCardList";
import ErrorComponent from "~/components/Error";
import { separateFeaturedAndOtherContent } from "~/utils";

export const loader = async () => {
  const blogposts = await getBlogposts();
  return json({ blogposts });
};

const Blogposts = () => {
  const { blogposts } = useLoaderData<typeof loader>();

  const [featuredBlogposts, otherBlogposts] =
    separateFeaturedAndOtherContent(blogposts);

  return (
    <div className="flex flex-col gap-4">
      {featuredBlogposts.length > 0 && (
        <PreviewCardList
          content={featuredBlogposts}
          heading="Tre utvalgte favoritter"
          buttonText="Les mer"
        />
      )}

      {otherBlogposts.length > 0 && (
        <PreviewCardList
          content={otherBlogposts}
          heading="Andre bloggposter"
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
