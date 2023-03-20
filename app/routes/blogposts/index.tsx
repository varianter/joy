import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/card/Card";
import CardWithArticle from "~/components/card/CardWithArticle";
import { getBlogposts } from "~/models/content.server";

export const loader = async () => {
  const blogposts = await getBlogposts();
  return json({ blogposts: blogposts });
};

const Blogposts = () => {
  const { blogposts } = useLoaderData<typeof loader>();

  if (!blogposts || blogposts.length === 0)
    return (
      <h1 className="text-white">Wooops, ingen bloggposter her enda...</h1>
    );

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="max-w-5xl">
        <Card>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogposts?.map((blogpost) => {
              return (
                blogpost.suggested && (
                  <div key={blogpost.id} className="my-1 inline-grid">
                    <CardWithArticle
                      title={blogpost.title}
                      linkToArticle={blogpost.url}
                      image={blogpost.image}
                      createdAt={blogpost.createdAt}
                      altImageText={blogpost.imageText}
                    />
                  </div>
                )
              );
            })}
          </div>
        </Card>
      </section>

      <section className="max-w-5xl pt-5">
        <Card>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogposts?.map((blogpost) => {
              return (
                !blogpost.suggested && (
                  <div key={blogpost.id} className="my-1">
                    <CardWithArticle
                      title={blogpost.title}
                      linkToArticle={blogpost.url}
                      image={blogpost.image}
                      createdAt={blogpost.createdAt}
                      altImageText={blogpost.imageText}
                    />
                  </div>
                )
              );
            })}
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Blogposts;
