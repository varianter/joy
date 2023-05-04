import { json } from "@remix-run/node";
import { getNewestFeaturedContent } from "~/models/content.server";
import Featured from "~/components/Featured";
import { useLoaderData, useRouteError } from "@remix-run/react";
import ErrorComponent from "~/components/Error";

const numberOfNewContent = 4;

export const loader = async () => {
  const newestFeaturedContent = await getNewestFeaturedContent(
    numberOfNewContent
  );

  return json({
    newestFeaturedContent,
  });
};

export default function Index() {
  const { newestFeaturedContent } = useLoaderData<typeof loader>();

  return <Featured newestFeaturedContent={newestFeaturedContent} />;
}

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
