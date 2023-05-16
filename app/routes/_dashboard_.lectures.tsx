import { json } from "@remix-run/node";
import { NavLink, useLoaderData, useRouteError } from "@remix-run/react";
import { getLectures } from "~/models/content.server";
import PreviewCardList from "~/components/card/PreviewCardList";
import ErrorComponent from "~/components/Error";
import { separateFeaturedAndOtherContent } from "~/utils";
import SecondaryButton from "~/components/buttons/SecondaryButton";

export const loader = async () => {
  const lectures = await getLectures();
  return json({ lectures });
};

const Lectures = () => {
  const { lectures } = useLoaderData<typeof loader>();

  const [featuredLectures, otherLectures] =
    separateFeaturedAndOtherContent(lectures);

  return (
    <div className="my-8 max-w-4xl text-left text-white">
      <NavLink to={"/"}>
        <SecondaryButton size="small" text="Tilbake" />
      </NavLink>
      <h1 className="my-8">Foredrag og presentasjoner</h1>
      <p className="my-8">
        In the name of læreglede, oppfordrer vi alltid folk til å engasjere seg
        i læredeling (ja det er vel et ord?). Vi ønsker selvsagt også å være
        synlige i bransjen, så vi melder oss stadig på interessante og relevante
        konferanser, for å holde foredrag. Da er det jo så deilig og kult at
        sånt blir filma, slik at alle kan se de i ettertid. I tillegg filmer vi
        foredragene når vi har{" "}
        <a
          href="https://handbook.variant.no/#Variantdag"
          rel="noopener"
          className="text-variant-beige underline"
        >
          Variantdag
        </a>
        . Alt legger vi ut på vår egen{" "}
        <a
          href="https://www.youtube.com/channel/UCMBx54cKNj8i9R51IE4bfCg"
          rel="noopener"
          className="text-variant-beige underline"
        >
          YouTube-side
        </a>
        .
      </p>

      <div className="flex flex-col gap-4">
        {featuredLectures.length > 0 && (
          <PreviewCardList
            content={featuredLectures}
            heading="To utvalgte favoritter"
          />
        )}

        {otherLectures.length > 0 && (
          <PreviewCardList content={otherLectures} heading="Andre foredrag" />
        )}
      </div>
    </div>
  );
};

export default Lectures;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
