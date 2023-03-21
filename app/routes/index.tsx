import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ArticlePreview from "~/components/ArticlePreview";
import TagButton from "~/components/buttons/TagButton";
import Card from "~/components/card/Card";
import NavigationCard from "~/components/card/NavigationCard";
import { getCategories } from "~/models/category.server";
import {
  getNumBlogposts,
  getNumNewestContent,
  getNumVideos,
  searchContent,
} from "~/models/content.server";

const numberOfNewContent = 2;

export const loader = async ({ request }: LoaderArgs) => {
  const [numBlogposts, numVideos, newestContent, categories] =
    await Promise.all([
      getNumBlogposts(),
      getNumVideos(),
      getNumNewestContent(numberOfNewContent),
      getCategories(),
    ]);
  return json({
    numBlogposts,
    numVideos,
    newestContent,
    categories,
  });
};

export default function Index() {
  const { numBlogposts, numVideos, newestContent, categories } =
    useLoaderData<typeof loader>();

  return (
    <main>
      <section className="text-left">
        <p className="text-2xl text-white">En variant av</p>
        <h1 className="text-5xl text-white">Læreglede</h1>
        <p className="mt-4 text-white">
          Lorem ipsum dolor sit amet consectetur. Amet ultrices id posuere purus
          etiam tincidunt non varius. Auctor vitae congue id ac tellus. Nibh
          pellentesque.
        </p>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Link to="blogposts">
          <NavigationCard
            header={`Bloggposter (${numBlogposts})`}
            icon={
              <img
                alt={"Figur av bloggpost"}
                className="h-[3rem]"
                src={"/assets/icons/blogpost.svg"}
              />
            }
          />
        </Link>

        <Link to="lecture">
          <NavigationCard
            header="Foredrag (0)"
            icon={
              <img
                alt={"Figur av foredrag"}
                className="h-[3rem]"
                src={"/assets/icons/lecture.svg"}
              />
            }
          />
        </Link>

        <Link to="course">
          <NavigationCard
            header="Kurs (0)"
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
            header={`Videoer (${numVideos})`}
            icon={
              <img
                alt={"Figur av video"}
                className="h-[3rem]"
                src={"/assets/icons/video.svg"}
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
                src={"/assets/icons/podcast.svg"}
              />
            }
          />
        </Link> */}
      </section>

      <section className="mt-16">
        <h1 className="mb-8 text-left text-4xl text-white md:text-5xl">
          Bli inspirert 🤩
        </h1>
        <div>
          {newestContent.map((content, index) => {
            return (
              <div className="my-5">
                <Card>
                  <div className="grid items-center md:grid-cols-2">
                    <img
                      alt={content.imageText ?? "Figur av læreglede"}
                      className={`h-[15rem] w-full md:h-full  ${
                        index % 2 === 0 ? "md:order-last" : "md:order-first"
                      } `}
                      src={content.image ?? "/assets/default-article-image.svg"}
                    />
                    <ArticlePreview
                      category={
                        categories.find((c) => c.id === content.categoryId)
                          ?.text ?? ""
                      }
                      createdDate={content.createdAt.split("T")[0]}
                      title={content.title}
                      description={content.description}
                      url={content.url}
                    />
                  </div>
                </Card>
                {content.tags.length > 0 && (
                  // TODO: Ved klikk på tags, så skal man finne all content relevant til denne
                  <div className="flex justify-end gap-4">
                    {content.tags.map((tag) => {
                      return (
                        <div key={tag.id} className="my-4">
                          <TagButton text={tag.text} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
