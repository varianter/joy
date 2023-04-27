import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import ErrorComponent from "~/components/Error";
import NavigationCard from "~/components/card/NavigationCard";
import {
  getNumberOfBlogposts,
  getNumberOfCourses,
  getNumberOfLectures,
  getNumberOfVideos,
} from "~/models/content.server";

export const loader = async () => {
  const [numVideos, numBlogposts, numCourses, numLectures] = await Promise.all([
    getNumberOfVideos(),
    getNumberOfBlogposts(),
    getNumberOfCourses(),
    getNumberOfLectures(),
  ]);
  return json({
    numVideos,
    numBlogposts,
    numCourses,
    numLectures,
  });
};

export default function Dashboard() {
  const { numVideos, numBlogposts, numCourses, numLectures } =
    useLoaderData<typeof loader>();

  return (
    <div className="mt-12 sm:mt-24">
      <section className="text-left text-white">
        <p className="font-serif text-xl">En variant av en</p>
        <h2 className="text-4xl">Læringshub</h2>
        <p className="mt-8">
          Vi i Variant lager og holder en del kurs og foredrag i flere
          sammenhenger. Vi har noen bloggposter her, noen YouTube-videoer der,
          og noen foredrag en annen plass. Dette har vi samlet i denne
          læringshuben.
        </p>
      </section>

      <section className="mt-8 mb-12 grid grid-cols-2 gap-5 md:grid-cols-4">
        <Link to="blogposts">
          <NavigationCard
            title={`Bloggposter (${numBlogposts})`}
            icon={
              <img
                alt={"Figur av bloggpost"}
                className="h-[3rem]"
                src={"/assets/icons/blogpost.svg"}
              />
            }
          />
        </Link>

        <Link to="lectures">
          <NavigationCard
            title={`Foredrag (${numLectures})`}
            icon={
              <img
                alt={"Figur av foredrag"}
                className="h-[3rem]"
                src={"/assets/icons/lecture.svg"}
              />
            }
          />
        </Link>

        <Link to="courses">
          <NavigationCard
            title={`Kurs (${numCourses})`}
            icon={
              <img
                alt={"Figur av kurs"}
                className="h-[3rem]"
                src={"/assets/icons/course.svg"}
              />
            }
          />
        </Link>

        <Link to="videos">
          <NavigationCard
            title={`Videoer (${numVideos})`}
            icon={
              <img
                alt={"Figur av video"}
                className="h-[3rem]"
                src={"/assets/icons/video.svg"}
              />
            }
          />
        </Link>
      </section>
      <Outlet />
    </div>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
