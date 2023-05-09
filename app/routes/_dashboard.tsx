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
    <div className="w-full sm:mt-32">
      <section className="text-left text-white">
        <p className="font-serif text-xl">En variant av en</p>
        <h2 className="text-[40px]">Læringshub</h2>
        <p className="mt-8">
          Vi i Variant lager og holder en del kurs og foredrag i flere
          sammenhenger. <br /> Vi har noen bloggposter her, noen YouTube-videoer
          der, og noen foredrag en annen plass. <br />
          Dette har vi samlet i denne læringshuben.
        </p>
      </section>

      <section className="mb-12 mt-8 grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        <NavLink to="blogposts">
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

        <NavLink to="lectures">
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

        <NavLink to="courses">
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

        <NavLink to="videos">
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

        <NavLink to="podcasts">
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
