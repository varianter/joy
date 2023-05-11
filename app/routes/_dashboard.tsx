import { json } from "@remix-run/node";
import {
  NavLink,
  Outlet,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import ErrorComponent from "~/components/Error";
import NavigationCard from "~/components/card/NavigationCard";
import {
  getNumberOfBlogposts,
  getNumberOfCourses,
  getNumberOfLectures,
  getNumberOfVideos,
  getNumberOfPodcasts,
} from "~/models/content.server";

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

  return (
    <div className="w-full sm:mt-16">
      <section className="text-left text-white">
        <p className="font-serif text-xl">En variants</p>
        <h2>Læringshub</h2>
        <p className="mt-8">
          I Variant er læreglede en av våre{" "}
          <a
            aria-label="Variants hovedverdier"
            href="https://variant.no"
            className="text-variant-beige"
          >
            hovedverdier
          </a>
          . Vi digger å lære oss nye ting eller å lære bort det vi kan, og så
          blir vi jaggu meg så mye bedre på det når vi deler det med hverandre.
        </p>
        <p className="py-1">
          For å gi deg (og oss selv) bedre oversikt over alt faglig innhold som
          vi poster, har vi samlet hele sulamitten på denne siden. Vi kaller den
          herved Læringshuben. Sjå dæ rundt og så håper vi du liker det du ser.
        </p>
        <p className="py-1">
          PS: Ikke vær sjenert om du vil slå av en prat med oss, om et tema som
          engasjerer deg da ❤️
        </p>
      </section>

      <section className="mb-12 mt-8 grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        <NavLink
          to="blogposts"
          className={({ isActive }) => (isActive ? "" : "decoration-white")}
        >
          {({ isActive }) => (
            <NavigationCard
              title={`Bloggposter (${numBlogposts})`}
              icon={
                <img
                  alt={"Figur av bloggpost"}
                  className="h-[3rem]"
                  src={
                    isActive
                      ? "/assets/icons/blogpost_dark.svg"
                      : "/assets/icons/blogpost.svg"
                  }
                />
              }
              isActive={isActive}
            />
          )}
        </NavLink>

        <NavLink
          to="lectures"
          className={({ isActive }) => (isActive ? "" : "decoration-white")}
        >
          {({ isActive }) => (
            <NavigationCard
              title={`Foredrag (${numLectures})`}
              icon={
                <img
                  alt={"Figur av foredrag"}
                  className="h-[3rem]"
                  src={
                    isActive
                      ? "/assets/icons/lecture_dark.svg"
                      : "/assets/icons/lecture.svg"
                  }
                />
              }
              isActive={isActive}
            />
          )}
        </NavLink>

        <NavLink
          to="courses"
          className={({ isActive }) => (isActive ? "" : "decoration-white")}
        >
          {({ isActive }) => (
            <NavigationCard
              title={`Kurs (${numCourses})`}
              icon={
                <img
                  alt={"Figur av kurs"}
                  className="h-[3rem]"
                  src={
                    isActive
                      ? "/assets/icons/course_dark.svg"
                      : "/assets/icons/course.svg"
                  }
                />
              }
              isActive={isActive}
            />
          )}
        </NavLink>

        <NavLink
          to="videos"
          className={({ isActive }) => (isActive ? "" : "decoration-white")}
        >
          {({ isActive }) => (
            <NavigationCard
              title={`Videoer (${numVideos})`}
              icon={
                <img
                  alt={"Figur av video"}
                  className="h-[3rem]"
                  src={
                    isActive
                      ? "/assets/icons/video_dark.svg"
                      : "/assets/icons/video.svg"
                  }
                />
              }
              isActive={isActive}
            />
          )}
        </NavLink>

        <NavLink
          to="podcasts"
          className={({ isActive }) => (isActive ? "" : "decoration-white")}
        >
          {({ isActive }) => (
            <NavigationCard
              title={`Podkaster (${numPodcasts})`}
              icon={
                <img
                  alt={"Figur av podkast"}
                  className="h-[3rem]"
                  src={
                    isActive
                      ? "/assets/icons/podcast_dark.svg"
                      : "/assets/icons/podcast.svg"
                  }
                />
              }
              isActive={isActive}
            />
          )}
        </NavLink>
      </section>
      <Outlet />
    </div>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
