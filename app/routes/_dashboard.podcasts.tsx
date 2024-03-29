import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { getPodcasts } from "~/models/content.server";
import PreviewCardList from "~/components/card/PreviewCardList";
import ErrorComponent from "~/components/Error";
import { separateFeaturedAndOtherContent } from "~/utils";

export const loader = async () => {
  const podcasts = await getPodcasts();
  return json({ podcasts });
};

const Podcasts = () => {
  const { podcasts } = useLoaderData<typeof loader>();

  const [featuredPodcasts, otherPodcasts] =
    separateFeaturedAndOtherContent(podcasts);

  return (
    <div className="my-8 max-w-4xl text-left text-white">
      <h1 className="mt-8">Podkaster</h1>
      <p className="mt-4 mb-12">
        Enkelte tema engasjerer oss så mye at vi aldri får sagt nok om det. Av
        og til er det også godt for oss å diskutere noe høyt med hverandre. Så
        godt at vi inviterer deg til å høre på. Podkastene våre kan være spissa
        om fag eller myke om mer menneskelige verdier. Følg oss på din
        foretrukne podkast-leverandør om du vil holde deg skikkelig oppdatert.
      </p>
      <div className="flex flex-col gap-4">
        {featuredPodcasts.length > 0 && (
          <PreviewCardList
            content={featuredPodcasts}
            heading="To utvalgte favoritter"
          />
        )}
        {otherPodcasts.length > 0 && (
          <PreviewCardList content={otherPodcasts} heading="Andre podkaster" />
        )}
      </div>
    </div>
  );
};

export default Podcasts;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
