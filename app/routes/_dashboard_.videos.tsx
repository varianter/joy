import { json } from "@remix-run/node";
import { NavLink, useLoaderData, useRouteError } from "@remix-run/react";
import { getVideos } from "~/models/content.server";
import PreviewCardList from "~/components/card/PreviewCardList";
import ErrorComponent from "~/components/Error";
import { separateFeaturedAndOtherContent } from "~/utils";
import SecondaryButton from "~/components/buttons/SecondaryButton";

export const loader = async () => {
  const videos = await getVideos();
  return json({ videos });
};

const Videos = () => {
  const { videos } = useLoaderData<typeof loader>();

  const [featuredVideos, otherVideos] = separateFeaturedAndOtherContent(videos);

  return (
    <div className="my-8 max-w-4xl text-left text-white">
      <NavLink to={"/"}>
        <SecondaryButton size="small" text="Tilbake" />
      </NavLink>
      <h1 className="my-8">Videoer</h1>
      <p className="my-8">
        Her har vi samlet opptak fra temaer vi enkeltvis brenner for, som vi har
        laget på eget initiativ. Det kan være både smalt og bredt det du finner
        her. Alt fra tutorials, live streams på et par timer (for de som liker å
        virkelig se i dybden) til korte TLDR's.
      </p>

      <div className="flex flex-col gap-4">
        {featuredVideos.length > 0 && (
          <PreviewCardList
            content={featuredVideos}
            heading="Tre utvalgte favoritter"
          />
        )}

        {otherVideos.length > 0 && (
          <PreviewCardList content={otherVideos} heading="Andre videoer" />
        )}
      </div>
    </div>
  );
};

export default Videos;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
