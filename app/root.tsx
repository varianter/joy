import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import globalStylesheetUrl from "./styles/shared.css";

import { Layout } from "./components/layout/Layout";
import { authenticator } from "./services/auth.server";
import {
  getNumBlogposts,
  getNumVideos,
  searchContent,
} from "./models/content.server";
import type { Content } from "@prisma/client";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: globalStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Variant - Læreglede",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const queryParams = new URL(request.url).searchParams;
  const query = queryParams.get("search");

  const [user, searchResult, numBlogposts, numVideos] = await Promise.all([
    authenticator.isAuthenticated(request),
    query && query.length > 0 && searchContent(query ?? ""),
    getNumBlogposts(),
    getNumVideos(),
  ]);

  return json({
    user,
    searchResult,
    numBlogposts,
    numVideos
  });
}

export default function App() {
  const { user, searchResult, numVideos, numBlogposts } =
    useLoaderData<typeof loader>();

  const isAuthenticated = user?.profile ? true : false;
  const search: Content[] = searchResult
    ? searchResult.map((result) => result as unknown as Content)
    : [];

  const navigation = useNavigation();

  const isLoadingSearchResult =
    navigation.state === "loading" &&
    navigation.location.search.includes("search")
      ? true
      : false;

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout
          isAuthenticated={isAuthenticated}
          searchResult={search}
          isLoadingSearchResult={isLoadingSearchResult}
          numVideos={numVideos}
          numBlogposts={numBlogposts}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
