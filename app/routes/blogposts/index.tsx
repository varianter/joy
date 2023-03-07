import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/card/Card";
import CardWithArticle from "~/components/card/CardWithArticle";
import { getBlogposts } from "~/models/blogposts.server";

export const loader = async () => {
  return json({ blogposts: await getBlogposts() });
};

const Blogposts = () => {
  const { blogposts } = useLoaderData<typeof loader>();

  return (
    <main>
      <section>
        <Card header={"Anbefalt 🔥"}>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogposts.map((blogpost) => {
              return (
                blogpost.suggested && (
                  <div key={blogpost.id} className="my-1">
                    <CardWithArticle
                      title={blogpost.title}
                      linkToArticle={blogpost.url}
                      image={blogpost.image}
                      createdAt={blogpost.createdAt}
                    />
                  </div>
                )
              );
            })}
          </div>
        </Card>
      </section>

      <section className="pt-5">
        <Card header={"Nytt og fresht 🤩"}>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogposts.map((blogpost) => {
              return (
                !blogpost.suggested && (
                  <div key={blogpost.id} className="my-1">
                    <CardWithArticle
                      title={blogpost.title}
                      linkToArticle={blogpost.url}
                      image={blogpost.image}
                      createdAt={blogpost.createdAt}
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
