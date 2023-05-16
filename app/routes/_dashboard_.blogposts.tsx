import { json } from "@remix-run/node";
import { NavLink, useLoaderData, useRouteError } from "@remix-run/react";
import { getBlogposts } from "~/models/content.server";
import PreviewCardList from "~/components/card/PreviewCardList";
import ErrorComponent from "~/components/Error";
import { Category, separateFeaturedAndOtherContent } from "~/utils";
import SecondaryButton from "~/components/buttons/SecondaryButton";

export const loader = async () => {
  const blogposts = await getBlogposts();
  return json({ blogposts });
};

const Blogposts = () => {
  const { blogposts } = useLoaderData<typeof loader>();

  const [featuredBlogposts, otherBlogposts] =
    separateFeaturedAndOtherContent(blogposts);

  return (
    <div className="my-8 max-w-4xl text-left text-white">
      <NavLink to={"/"}>
        <SecondaryButton size="small" text="Tilbake" />
      </NavLink>
      <h1 className="my-8">Bloggposter</h1>
      <p className="my-8">
        Vi mener mye og deler mangt. Her finner du alle våre artikler som vi har
        publisert. Vi legger de som regel ut på{" "}
        <a
          className="text-variant-beige underline"
          href="http://variant.blog"
          rel="noopener"
        >
          Medium
        </a>
        , så du blir tatt med dit for å lese. Håper du finner noen engasjerende
        tema, god lesning!
      </p>
      <div className="flex flex-col gap-4">
        {featuredBlogposts.length > 0 && (
          <PreviewCardList
            content={featuredBlogposts}
            heading="Tre utvalgte favoritter"
          />
        )}

        {otherBlogposts.length > 0 && (
          <PreviewCardList
            content={otherBlogposts}
            heading="Andre bloggposter"
          />
        )}
      </div>
    </div>
  );
};

export default Blogposts;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
