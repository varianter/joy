import { Link, useLoaderData, useRouteError } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { useState } from "react";
import ErrorComponent from "~/components/Error";
import SecondaryButton from "~/components/buttons/SecondaryButton";
import { SearchInput } from "~/components/search/SearchInput";
import { getContent } from "~/models/content.server";

export const loader = async () => {
  const content = await getContent();
  return json({ content });
};

const Edit = () => {
  const { content } = useLoaderData<typeof loader>();
  const [filteredContent, setFilteredContent] = useState(content);
  let searchValue: string = "";

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const tempFilteredContent = content.filter((fc) =>
      fc.title.toLowerCase().includes(target.value.toLowerCase())
    );

    setFilteredContent(tempFilteredContent);
    searchValue = target.value;
  };

  const handleOnResetSearch = () => {
    searchValue = "";
    setFilteredContent(content);
  };

  return (
    <div className="mt-5 w-full">
      <div className="mb-5">
        <SearchInput
          onChange={handleSearchChange}
          searchValue={searchValue}
          onResetSearch={handleOnResetSearch}
        />
      </div>

      {filteredContent.map((c) => {
        return (
          <div
            key={c.id}
            className="mb-3 grid grid-cols-2 border-b-2 text-left text-white"
          >
            <div>
              <input type="hidden" name="id" value={c.id} />
              <p className="items-center">{c.title}</p>
            </div>

            <Link to={`/admin/edit/${c.id}`} className="mb-5 flex justify-end">
              <SecondaryButton text="Endre" />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Edit;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
