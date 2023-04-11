import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ArticlePreview from "~/components/ArticlePreview";
import TagButton from "~/components/buttons/TagButton";
import Card from "~/components/card/Card";
import NavigationCard from "~/components/card/NavigationCard";
import { getCategories } from "~/models/category.server";
import {
  getNumBlogposts,
  getNumCourses,
  getNumNewestContent,
  getNumVideos,
} from "~/models/content.server";

const numberOfNewContent = 2;

export const loader = async () => {
  const [newestContent, categories, numVideos, numBlogposts, numCourses] =
    await Promise.all([
      getNumNewestContent(numberOfNewContent),
      getCategories(),
      getNumVideos(),
      getNumBlogposts(),
      getNumCourses(),
    ]);
  return json({
    newestContent,
    categories,
    numVideos,
    numBlogposts,
    numCourses,
  });
};

export default function Index() {
  const { newestContent, categories, numVideos, numBlogposts, numCourses } =
    useLoaderData<typeof loader>();

  return (
    <div>
      <section className="text-left">
        <p className="text-2xl text-white">En variant av en</p>
        <h2 className="text-5xl text-white">Læringshub</h2>
        <p className="mt-4 text-white">
          Vi i Variant lager og holder en del kurs og foredrag i flere
          sammenhenger. Vi har noen bloggposter her, noen YouTube-videoer der,
          og noen foredrag en annen plass. Dette har vi samlet i denne
          læringshuben.
        </p>
      </section>

      <section className="my-8 grid grid-cols-2 gap-5 md:grid-cols-4">
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

        <Link to="lecture">
          <NavigationCard
            title="Foredrag (0)"
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
      <section>
        <h2 className="mb-8 text-left text-4xl text-white md:text-5xl">
          Bli inspirert 🤩
        </h2>
        <div>
          {newestContent.map((content, index) => {
            return (
              <div key={content.id} className="my-5">
                <Card cssClass="bg-variant-blue-4 sm:h-[22rem]">
                  <div className="grid sm:grid-cols-2 h-full">
                    <div
                      className={`sm:relative ${
                        index % 2 === 0 ? "sm:order-last" : "sm:order-first"
                      } `}
                    >
                      <img
                        alt={content.imageText ?? "Figur av læreglede"}
                        className={`sm:absolute h-full w-full object-cover`}
                        src={
                          content.image ?? "/assets/default-article-image.svg"
                        }
                      />
                    </div>

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
    </div>
  );
}
