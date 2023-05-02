import { json } from "@remix-run/node";
import {
  NavLink,
  Outlet,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import ErrorComponent from "~/components/Error";
import { getTags } from "~/models/tag.server";
import TagButton from "~/components/buttons/TagButton";

export const loader = async () => {
  const tags = await getTags();
  tags.sort((a, b) => a.text.localeCompare(b.text));
  return json({ tags });
};

const Tags = () => {
  const { tags } = useLoaderData<typeof loader>();

  return (
    <div className="grid">
      <h2 className="text-white">Tags</h2>
      <div className="my-12 grid auto-rows-min grid-cols-2 gap-1 text-left sm:grid-cols-4 md:grid-cols-8">
        {tags.map((tag) => (
          <NavLink
            to={`/tags/${tag.text}`}
            key={tag.id}
            className="inline-grid"
          >
            {({ isActive }) => (
              <TagButton text={tag.text} isActive={isActive} />
            )}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Tags;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
