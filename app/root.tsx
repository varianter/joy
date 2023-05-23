import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { Content } from "@prisma/client";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import globalStylesheetUrl from "./styles/shared.css";

import { Layout } from "./components/layout/Layout";
import { authenticator } from "./services/auth.server";
import { searchContent } from "./models/content.server";

import searchStyles from "./components/search/styles.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: globalStylesheetUrl },
    { rel: "stylesheet", href: searchStyles },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Variant - Læreglede",
  viewport: "width=device-width,initial-scale=1, maximum-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const queryParams = new URL(request.url).searchParams;
  const query = queryParams.get("search");

  const [user, searchResults] = await Promise.all([
    authenticator.isAuthenticated(request),
    query && query.length > 0 && searchContent(query ?? ""),
  ]);

  return json({
    user,
    searchResults,
  });
}

export default function Root() {
  const { user, searchResults } = useLoaderData<typeof loader>();

  const isAuthenticated = user?.profile ? true : false;
  const search: Content[] = searchResults
    ? searchResults.map((results) => results as unknown as Content)
    : [];

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout isAuthenticated={isAuthenticated} searchResults={search}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
