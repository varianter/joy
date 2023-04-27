import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import PrimaryButton from "~/components/buttons/PrimaryButton";
import ErrorComponent from "~/components/Error";
import Input from "~/components/inputs/Input";
import TextArea from "~/components/inputs/TextArea";
import Toggle from "~/components/Toggle";
import { createContent } from "~/models/content.server";
import { getTags } from "~/models/tag.server";
import { CATEGORIES, Category, isValidUrl } from "~/utils";

export const loader = async () => {
  const tags = await getTags();
  return json({ tags });
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const title = formData.get("title");
  const description = formData.get("description");
  const url = formData.get("url");
  const featured = formData.get("featured") === "on";
  const image = formData.get("image");
  const imageText = formData.get("imageText");
  const author = formData.get("author");
  const category = formData.get("category");
  const tags = (formData.getAll("tag") as string[]) ?? [];

  const errors = {
    title: null,
    description: null,
    url: null,
    featured: null,
    category: null,
    image: null,
    imageText: null,
    author: null,
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

  if (category !== Category.Course && !isValidUrl(url)) {
    return json(
      {
        errors: {
          ...errors,
          url: "URL er ikke på riktig format",
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
          image: "Bildet er ikke på base64-format",
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
          imageText: "Alternativ tekst på bilde er påkrevd",
        },
      },
      { status: 400 }
    );
  }

  if (typeof author !== "string" || author.length === 0) {
    return json(
      {
        errors: {
          ...errors,
          author: "Forfatter er påkrevd",
        },
      },
      { status: 400 }
    );
  }

  if (typeof category !== "string") {
    return json(
      {
        errors: {
          ...errors,
          category: "Kategori er påkrevd",
        },
      },
      { status: 400 }
    );
  }

  const newContentRecord = await createContent(
    {
      title,
      description,
      url,
      featured,
      category,
      image,
      imageText,
      author,
    },
    tags
  );

  if (category == Category.Course) {
    return redirect(`/admin/new/${newContentRecord.id}`);
  } else return redirect(`/`);
}

const NewContent = () => {
  const { tags } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const imageAltTextRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.description) {
      descriptionRef.current?.focus();
    } else if (actionData?.errors?.url) {
      urlRef.current?.focus();
    } else if (actionData?.errors?.image) {
      imageRef.current?.focus();
    } else if (actionData?.errors?.imageText) {
      imageAltTextRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="items-left mt-5 flex justify-center">
      <Form
        method="post"
        className="w-full rounded-3xl bg-variant-blue p-5 text-left text-white"
      >
        <Input
          error={actionData?.errors?.title}
          label="Tittel"
          htmlRef={titleRef}
          name="title"
        />

        <TextArea
          error={actionData?.errors?.description}
          label="Beskrivelse"
          htmlRef={descriptionRef}
          name="description"
        />

        <Input
          error={actionData?.errors?.url}
          label="Url"
          htmlRef={urlRef}
          name="url"
        />

        <Input
          error={actionData?.errors?.image}
          label={
            <span>
              Base64-enkodet bilde: Kan genereres{" "}
              <a
                href="https://www.base64-image.de/"
                className="text-variant-pink"
                target="_blank"
                rel="noopener noreferrer"
              >
                HER
              </a>
            </span>
          }
          htmlRef={imageRef}
          name="image"
        />

        <Input
          error={actionData?.errors?.imageText}
          label="Alternativ tekst for bilde"
          htmlRef={imageAltTextRef}
          name="imageText"
        />

        <Input
          error={actionData?.errors?.author}
          label="Forfatter (Variant-epost)"
          htmlRef={authorRef}
          name="author"
        />

        <div className="mt-3 grid grid-cols-2 pb-4 md:grid-cols-3">
          <Toggle
            leftText="Nei"
            rightText="Ja"
            label="Fremhevet"
            inputName="featured"
          />

          <fieldset className="sm:mt-4 md:col-span-2">
            <legend>Kategori:</legend>
            <div className="mt-3 gap-4 md:flex">
              {CATEGORIES.map((category) => {
                return (
                  <div key={category} className="flex items-center gap-1">
                    <input
                      className="h-4 w-4 cursor-pointer"
                      type="radio"
                      ref={categoriesRef}
                      name="category"
                      id="category"
                      value={category}
                    />
                    <label className="font-bold" htmlFor="category">
                      {category}
                    </label>
                  </div>
                );
              })}
            </div>

            {actionData?.errors?.category && (
              <div className="pb-1 text-variant-pink-2" id="error">
                {actionData?.errors?.category}
              </div>
            )}
          </fieldset>
        </div>

        <fieldset className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <legend>Tags:</legend>
          {tags?.map((tag) => {
            return (
              <div key={tag.id} className="flex items-center gap-1 ">
                <input
                  className="h-4 w-4 cursor-pointer"
                  type="checkbox"
                  ref={tagsRef}
                  name="tag"
                  id={tag.id}
                  value={tag.id}
                />
                <label className="font-bold" htmlFor="tag">
                  {tag.text}
                </label>
              </div>
            );
          })}
        </fieldset>

        <div className="mt-5 flex justify-end">
          <PrimaryButton
            type="submit"
            text={
              navigation.state === "submitting" ||
              navigation.state === "loading"
                ? "Lagrer ... "
                : "Lagre"
            }
            disabled={
              navigation.state === "submitting" ||
              navigation.state === "loading"
            }
          />
        </div>
      </Form>
    </div>
  );
};

export default NewContent;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
