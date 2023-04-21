import { json } from "@remix-run/node";
import { getCategories } from "~/models/category.server";
import { getNumNewestContent } from "~/models/content.server";
import Featured from "~/components/Featured";
import { useLoaderData } from "@remix-run/react";

const numberOfNewContent = 2;

export const loader = async () => {
  const [newestContent, categories] = await Promise.all([
    getNumNewestContent(numberOfNewContent),
    getCategories(),
  ]);
  return json({
    newestContent,
    categories,
  });
};

export default function Index() {
    const { newestContent, categories } = useLoaderData<typeof loader>();

  return (
    <Featured newestContent={newestContent} categories={categories} />
  );
}
