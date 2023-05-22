import { json } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import ErrorComponent from "~/components/Error";
import NavigationLink from "~/components/NavigationLink";
import NavigationCard from "~/components/card/NavigationCard";
import {
  getNumberOfBlogposts,
  getNumberOfCourses,
  getNumberOfLectures,
  getNumberOfVideos,
  getNumberOfPodcasts,
} from "~/models/content.server";
import { Category } from "~/utils";

export const loader = async () => {
  const [numVideos, numBlogposts, numCourses, numLectures, numPodcasts] =
    await Promise.all([
      getNumberOfVideos(),
      getNumberOfBlogposts(),
      getNumberOfCourses(),
      getNumberOfLectures(),
      getNumberOfPodcasts(),
    ]);
  return json({
    numVideos,
    numBlogposts,
    numCourses,
    numLectures,
    numPodcasts,
  });
};

export default function Dashboard() {
  const { numVideos, numBlogposts, numCourses, numLectures, numPodcasts } =
    useLoaderData<typeof loader>();

  const { pathname } = useLocation();

  return (
    <div className="container mx-auto w-full max-w-4xl xs:mt-8 sm:mt-16">
      {pathname === "/" ? (
        <div>
          <section className="text-left text-white">
            <p className="font-serif text-xl">Variants</p>
            <h1>Læreglede</h1>
            <p className="mt-8">
              I Variant er læreglede en av våre{" "}
              <a
                aria-label="Variants hovedverdier"
                href="https://variant.no"
                className="text-variant-beige underline"
              >
                hovedverdier
              </a>
              . Vi digger å lære oss nye ting eller å lære bort det vi kan, og
              så blir vi jaggu meg så mye bedre på det når vi deler det med
              hverandre.
            </p>
            <p className="py-1">
              For å gi deg (og oss selv) bedre oversikt over alt faglig innhold
              som vi poster, har vi samlet en god del på denne siden. Vi kaller
              den herved Læringshuben. Sjå dæ rundt og så håper vi du liker det
              du ser.
            </p>
            <p className="py-1">
              PS: Ikke vær sjenert om du vil slå av en prat med oss, om et tema
              som engasjerer deg da ❤️
            </p>
          </section>

          <section className="mb-12 mt-8 grid grid-cols-1 gap-4 xxs:grid-cols-2 xs:grid-cols-3 smmd:grid-cols-5">
            <NavigationCard
              title={`Bloggposter (${numBlogposts})`}
              to="blogposts"
              category={Category.Blogpost}
            />

            <NavigationCard
              title={`Foredrag (${numLectures})`}
              to="lectures"
              category={Category.Lecture}
            />

            <NavigationCard
              title={`Kurs (${numCourses})`}
              to="courses"
              category={Category.Course}
            />

            <NavigationCard
              title={`Videoer (${numVideos})`}
              to="videos"
              category={Category.Video}
            />

            <NavigationCard
              title={`Podkaster (${numPodcasts})`}
              to="podcasts"
              category={Category.Podcast}
            />
          </section>
        </div>
      ) : (
        <section className="mb-12 flex flex-col gap-2 text-left text-white sm:flex-row smmd:mt-8">
          <NavigationLink
            to="blogposts"
            title={`Bloggposter (${numBlogposts})`}
          />

          <NavigationLink to="lectures" title={`Foredrag (${numLectures})`} />

          <NavigationLink to="courses" title={`Kurs (${numCourses})`} />

          <NavigationLink to="videos" title={`Videoer (${numVideos})`} />

          <NavigationLink to="podcasts" title={`Podkaster (${numPodcasts})`} />
        </section>
      )}
      <Outlet />
    </div>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
