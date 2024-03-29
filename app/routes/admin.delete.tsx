import {
  Form,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import type { ActionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { useState } from "react";
import ErrorComponent from "~/components/Error";
import PrimaryButton from "~/components/buttons/PrimaryButton";
import { SearchInput } from "~/components/search/SearchInput";
import { deleteContent, getContent } from "~/models/content.server";

export const loader = async () => {
  const content = await getContent();
  return json({ content });
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const idToDelete = formData.get("id");

  if (typeof idToDelete !== "string" || idToDelete.length === 0) {
    return json(
      {
        errors: {
          idToDelete: "Id er påkrevd og må være en streng",
        },
      },
      { status: 400 }
    );
  }

  await deleteContent(idToDelete);
  return redirect("/admin");
}

const DeleteContent = () => {
  const { content } = useLoaderData<typeof loader>();
  const [filteredContent, setFilteredContent] = useState(content);
  const [itemToDelete, setItemToDelete] = useState("");

  const navigation = useNavigation();

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
          <Form
            key={c.id}
            method="delete"
            onSubmit={(e) => {
              if (!confirm("Er du sikker?")) {
                e.preventDefault();
              }
            }}
            className="mb-3 grid grid-cols-2 border-b-2 text-left text-white"
          >
            <div>
              <input type="hidden" name="id" value={c.id} />
              <p className="items-center">{c.title}</p>
            </div>

            <div className="mb-5 flex justify-end">
              <PrimaryButton
                type="submit"
                onClick={() => setItemToDelete(c.id)}
                text={
                  (navigation.state === "submitting" ||
                    navigation.state === "loading") &&
                  itemToDelete === c.id
                    ? "sletter ... "
                    : "Slett"
                }
                disabled={
                  (navigation.state === "submitting" ||
                    navigation.state === "loading") &&
                  itemToDelete === c.id
                }
              />
            </div>
          </Form>
        );
      })}
    </div>
  );
};

export default DeleteContent;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
