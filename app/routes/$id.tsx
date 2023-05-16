import { useLoaderData, useRouteError } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import ErrorComponent from "~/components/Error";
import { getContentById } from "~/models/content.server";
import PreviewCard from "~/components/card/PreviewCard";

export const loader = async ({ params }: LoaderArgs) => {
  const content = await getContentById(params.id ?? "");
  if (!content) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    content,
  });
};

const ContentId = () => {
  const { content } = useLoaderData<typeof loader>();

  return (
    <div className="my-12">
      <PreviewCard
        key={content.id}
        content={content}
        className="mb-8"
        horizontal
      />
    </div>
  );
};

export default ContentId;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
