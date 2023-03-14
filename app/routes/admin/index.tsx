import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import Card from "~/components/card/Card";
import { getCategories } from "~/models/category.server";
import { createContent } from "~/models/content.server";
import { getTags } from "~/models/tag.server";

import { requireUserSession } from "~/services/session";

export const loader = async ({ request }: LoaderArgs) => {
  await requireUserSession(request);
  const [tags, categories] = await Promise.all([getTags(), getCategories()]);
  return json({ tags, categories });
};

export async function action({ request }: ActionArgs) {
  await requireUserSession(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const url = formData.get("url");
  const suggested = formData.get("suggested") === "true" ? true : false;
  const image = formData.get("image");
  const imageText = formData.get("imageText");
  const categoryId = formData.get("categoryId");
  const tags = (formData.getAll("tag") as string[]) ?? [];

  const errors = {
    title: null,
    description: null,
    url: null,
    suggested: null,
    categoryId: null,
    image: null,
    imageText: null,
    tags: null,
  };

  if (typeof title !== "string" || title.length === 0) {
    return json(
      {
        errors: {
          ...errors,
          title: "Tittel er påkrevd",
        },
      },
      { status: 400 }
    );
  }

  if (typeof description !== "string" || description.length === 0) {
    return json(
      {
        errors: {
          ...errors,
          description: "Beskrivelse er påkrevd",
        },
      },
      { status: 400 }
    );
  }

  if (typeof url !== "string" || url.length === 0) {
    return json(
      {
        errors: {
          ...errors,
          url: "URL er påkrevd",
        },
      },
      { status: 400 }
    );
  }

  if (typeof categoryId !== "string") {
    return json(
      {
        errors: {
          ...errors,
          categoryId: "Kategori er påkrevd",
        },
      },
      { status: 400 }
    );
  }

  if (typeof image !== "string" || image.length === 0) {
    return json(
      {
        errors: {
          ...errors,
          image: "Bilde er påkrevd",
        },
      },
      { status: 400 }
    );
  }

  if (!image.includes("base64")) {
    return json(
      {
        errors: {
          ...errors,
          image: "Bilde er ser ikke ut til å være base64",
        },
      },
      { status: 400 }
    );
  }

  if (typeof imageText !== "string" || imageText.length === 0) {
    return json(
      {
        errors: {
          ...errors,
          imageText: "Alt-tekst på bilde er påkrevd",
        },
      },
      { status: 400 }
    );
  }

  const author = "Legg til bruker her";

  await createContent(
    {
      title,
      description,
      url,
      suggested,
      categoryId,
      image,
      imageText,
      author,
    },
    tags
  );

  return redirect(`/`);
}

const Admin = () => {
  const { tags, categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const suggestedRef = useRef<HTMLSelectElement>(null);
  const tagsRef = useRef<HTMLUListElement>(null);
  const categoriesRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const imageAltTextRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.description) {
      descriptionRef.current?.focus();
    } else if (actionData?.errors?.suggested) {
      suggestedRef.current?.focus();
    } else if (actionData?.errors?.url) {
      urlRef.current?.focus();
    } else if (actionData?.errors?.image) {
      imageRef.current?.focus();
    } else if (actionData?.errors?.imageText) {
      imageAltTextRef.current?.focus();
    }
  }, [actionData]);

  return (
    <main>
      <section>
        <div className="flex justify-center text-left">
          <Card>
            <Form method="post" className="w-auto lg:w-[50rem]">
              <div>
                <label className="flex w-full flex-col gap-1">
                  <span>Tittel:</span>
                  <input
                    ref={titleRef}
                    name="title"
                    className="rounded-md border-2 px-3 leading-loose"
                    aria-invalid={actionData?.errors?.title ? true : undefined}
                    aria-errormessage={
                      actionData?.errors?.title ? "title-error" : undefined
                    }
                  />
                </label>
                {actionData?.errors?.title && (
                  <div className="text-red-700 pt-1" id="title-error">
                    {actionData.errors.title}
                  </div>
                )}
              </div>

              <div>
                <label className="flex flex-col gap-1">
                  <span>Beskrivelse:</span>
                  <textarea
                    ref={descriptionRef}
                    name="description"
                    className="rounded-md border-2 py-2 px-3"
                    aria-invalid={
                      actionData?.errors?.description ? true : undefined
                    }
                    aria-errormessage={
                      actionData?.errors?.description
                        ? "description-error"
                        : undefined
                    }
                  />
                </label>
                {actionData?.errors?.description && (
                  <div className="text-red-700 pt-1" id="description-error">
                    {actionData.errors.description}
                  </div>
                )}
              </div>

              <div>
                <label className="flex w-full flex-col gap-1">
                  <span>Url: </span>
                  <input
                    ref={urlRef}
                    name="url"
                    className="border-blue-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
                    aria-invalid={actionData?.errors?.url ? true : undefined}
                    aria-errormessage={
                      actionData?.errors?.url ? "url-error" : undefined
                    }
                  />
                </label>
                {actionData?.errors?.url && (
                  <div className="text-red-700 pt-1" id="url-error">
                    {actionData.errors.url}
                  </div>
                )}
              </div>

              <div>
                <label className="flex w-full flex-col gap-1">
                  <span>Bilde base64 streng: </span>
                  <input
                    ref={imageRef}
                    name="image"
                    className="border-blue-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
                    aria-invalid={actionData?.errors?.url ? true : undefined}
                    aria-errormessage={
                      actionData?.errors?.image ? "image-error" : undefined
                    }
                  />
                </label>
                {actionData?.errors?.image && (
                  <div className="text-red-700 pt-1" id="image-error">
                    {actionData.errors.image}
                  </div>
                )}
              </div>

              <div>
                <label className="flex w-full flex-col gap-1">
                  <span>Alt-tekst for bilde: </span>
                  <input
                    ref={imageAltTextRef}
                    name="imageText"
                    className="border-blue-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
                    aria-invalid={
                      actionData?.errors?.imageText ? true : undefined
                    }
                    aria-errormessage={
                      actionData?.errors?.imageText ? "url-error" : undefined
                    }
                  />
                </label>
                {actionData?.errors?.imageText && (
                  <div className="text-red-700 pt-1" id="imageText-error">
                    {actionData.errors.imageText}
                  </div>
                )}
              </div>

              <div>
                <label className="flex w-full flex-col gap-1">
                  <span>Anbefalt:</span>
                  <select
                    ref={suggestedRef}
                    name="suggested"
                    className="border-blue-500 flex-1 rounded-md border-2 px-3 text-lg"
                    aria-invalid={
                      actionData?.errors?.suggested ? true : undefined
                    }
                    aria-errormessage={
                      actionData?.errors?.suggested
                        ? "suggested-error"
                        : undefined
                    }
                  >
                    <option value="false">Nei</option>
                    <option value="true">Ja</option>
                  </select>
                </label>
                {actionData?.errors?.suggested && (
                  <div className="text-red-700 pt-1" id="suggested-error">
                    {actionData.errors.suggested}
                  </div>
                )}
              </div>

              <div>
                <label className="flex w-full flex-col gap-1">
                  <span>Kategori:</span>
                  <select
                    ref={categoriesRef}
                    name="categoryId"
                    className="border-blue-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
                  >
                    {categories?.map((category) => {
                      return (
                        <option value={category.id}>{category.text}</option>
                      );
                    })}
                  </select>
                </label>
                {actionData?.errors?.categoryId && (
                  <div className="text-red-700 pt-1" id="categoryId-error">
                    {actionData.errors.categoryId}
                  </div>
                )}
              </div>

              <div>
                <label className="flex w-full flex-col gap-1">
                  <span>Tags: </span>
                  <ul
                    ref={tagsRef}
                    className="flex w-full rounded-lg border bg-white text-sm font-medium"
                  >
                    {tags?.map((tag) => {
                      return (
                        <li>
                          <div className="flex items-center pl-3">
                            <input
                              name="tag"
                              id={tag.id}
                              type="checkbox"
                              value={tag.id}
                            />
                            <label htmlFor={tag.id} className="ml-2 py-3">
                              {tag.text}
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </label>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="hover:bg-blue-600 focus:bg-blue-400 rounded bg-variant-blue py-2 px-4 text-white"
                >
                  Save
                </button>
              </div>
            </Form>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Admin;
