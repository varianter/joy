import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { useState } from "react";
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

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    const tempFilteredContent = content.filter((fc) =>
      fc.title.toLowerCase().includes(e.currentTarget.value.toLowerCase())
    );

    setFilteredContent(tempFilteredContent);
  };

  return (
    <div className="mt-5 w-full">
      <div className="mb-5">
        <SearchInput onChange={handleSearchChange} />
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