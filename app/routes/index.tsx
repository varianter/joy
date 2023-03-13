import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import NavigationCard from "~/components/card/NavigationCard";
import { getNumBlogposts } from "~/models/blogposts.server";
import { getNumVideos } from "~/models/videos.server";

export const loader = async () => {
  const [numBlogposts, numVideos] = await Promise.all([
    getNumBlogposts(),
    getNumVideos(),
  ]);
  return json({ numBlogposts, numVideos });
};

export default function Index() {
  const { numBlogposts, numVideos } = useLoaderData<typeof loader>();
  return (
    <main>
      <section className="text-left">
        <h1 className="text-2xl text-white">En variant av</h1>
        <h2 className="text-5xl text-white">Læreglede</h2>
        <p className="mt-4 text-white">
          Lorem ipsum dolor sit amet consectetur. Amet ultrices id posuere purus
          etiam tincidunt non varius. Auctor vitae congue id ac tellus. Nibh
          pellentesque.
        </p>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Link to="blogposts">
          <NavigationCard
            header="Bloggposter"
            count={numBlogposts}
            icon={
              <img
                alt={"Figur av læreglede"}
                className="h-[3rem]"
                src={"/assets/icons/blogpostIcon.svg"}
              />
            }
          />
        </Link>

        <Link to="lecture">
          <NavigationCard
            header="Foredrag"
            count={0}
            icon={
              <img
                alt={"Figur av læreglede"}
                className="h-[3rem]"
                src={"/assets/icons/lectureIcon.svg"}
              />
            }
          />
        </Link>

        <Link to="course">
          <NavigationCard
            header="Kurs"
            count={0}
            icon={
              <img
                alt={"Figur av læreglede"}
                className="h-[3rem]"
                src={"/assets/icons/courseIcon.svg"}
              />
            }
          />

        <Link to="videos">
          <NavigationCard
            header="Videoer"
            count={numVideos}
            icon={
              <img
                alt={"Figur av læreglede"}
                className="h-[3rem]"
                src={"/assets/icons/videoIcon.svg"}
              />
            }
          />
        </Link>

        {/* <Link to="podcasts">
          <NavigationCard
            header="Podcasts"
            count={0}
            icon={
              <img
                alt={"Figur av læreglede"}
                className="h-[3rem]"
                src={"/assets/icons/podcastIcon.svg"}
              />
            }
          />
        </Link> */}
      </section>
    </main>
  );
}
