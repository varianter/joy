import { json } from "@remix-run/node";
import { getNewestFeaturedContent } from "~/models/content.server";
import Featured from "~/components/Featured";
import { useLoaderData, useRouteError } from "@remix-run/react";
import ErrorComponent from "~/components/Error";

const numberOfNewContent = 4;

export const loader = async () => {
  const newestContent = await getNewestFeaturedContent(numberOfNewContent);

  return json({
    newestContent,
  });
};

export default function Index() {
  const { newestContent } = useLoaderData<typeof loader>();

  return <Featured newestContent={newestContent} />;
}

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
