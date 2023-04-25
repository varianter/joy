import { json } from "@remix-run/node";
import { getNewestContent } from "~/models/content.server";
import Featured from "~/components/Featured";
import { useLoaderData } from "@remix-run/react";

const numberOfNewContent = 2;

export const loader = async () => {
  const newestContent = await getNewestContent(numberOfNewContent);

  return json({
    newestContent,
  });
};

export default function Index() {
  const { newestContent } = useLoaderData<typeof loader>();

  return <Featured newestContent={newestContent} />;
}
