import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import PrimaryButton from "~/components/buttons/PrimaryButton";
import Input from "~/components/inputs/Input";
import TextArea from "~/components/inputs/TextArea";
import Toggle from "~/components/Toggle";
import { getCategories } from "~/models/category.server";
import { getContentById, updateContent } from "~/models/content.server";
import { getTags } from "~/models/tag.server";
import { isValidUrl } from "~/utils";

export const loader = async ({ params }: LoaderArgs) => {
  const content = await getContentById(params.id ?? "");
  if (!content) {
    throw new Response("Not Found", { status: 404 });
  }
  const [tags, categories] = await Promise.all([getTags(), getCategories()]);
  return json({ id: params.id, content, tags, categories });
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const id = formData.get("id");
  const title = formData.get("title");
  const description = formData.get("description");
  const url = formData.get("url");
  const featured = formData.get("featured") === "on" ? true : false;
  const image = formData.get("image");
  const imageText = formData.get("imageText");
  const author = formData.get("author");
  const categoryId = formData.get("categoryId");
  const tags = formData.getAll("tag") as string[];
  const createdAt = new Date(formData.get("createdAt") as string);

  const errors = {
    title: null,
    description: null,
    url: null,
    featured: null,
    categoryId: null,
    image: null,
    imageText: null,
    author: null,
    id: null,
    createdAt: null,
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

  if (typeof id !== "string" || id.length === 0) {
    return json(
      {
        errors: {
          ...errors,
          id: "ID er påkrevd",
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

  if (!isValidUrl(url)) {
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

  if (isNaN(createdAt.getDate())) {
    return json(
      {
        errors: {
          ...errors,
          createdAt: "Opprettetdato er påkrevd",
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

  await updateContent(
    {
      id,
      title,
      description,
      url,
      featured,
      categoryId,
      image,
      imageText,
      author,
      createdAt,
    },
    tags
  );

  return redirect(`/admin/content/edit`);
}

const EditContent = () => {
  const { id, content, tags, categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const featuredRef = useRef<HTMLInputElement>(null);
  const createdAtRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const imageAltTextRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  const transition = useTransition();

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.description) {
      descriptionRef.current?.focus();
    } else if (actionData?.errors?.featured) {
      featuredRef.current?.focus();
    } else if (actionData?.errors?.createdAt) {
      createdAtRef.current?.focus();
    } else if (actionData?.errors?.url) {
      urlRef.current?.focus();
    } else if (actionData?.errors?.image) {
      imageRef.current?.focus();
    } else if (actionData?.errors?.imageText) {
      imageAltTextRef.current?.focus();
    } else if (actionData?.errors?.author) {
      authorRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="put"
      className="w-full rounded-3xl bg-variant-blue p-5 text-left text-white"
    >
      <input name="id" hidden defaultValue={id} />
      <Input
        error={actionData?.errors?.title}
        label={"Tittel"}
        htmlRef={titleRef}
        name={"title"}
        defaultValue={content.title}
      />

      <TextArea
        error={actionData?.errors?.description}
        label={"Beskrivelse"}
        htmlRef={descriptionRef}
        name={"description"}
        defaultValue={content.description}
      />

      <Input
        error={actionData?.errors?.url}
        label={"Url"}
        htmlRef={urlRef}
        name={"url"}
        defaultValue={content.url}
      />

      <Input
        error={actionData?.errors?.image}
        defaultValue={content.image ?? ""}
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
        name={"image"}
      />

      <Input
        error={actionData?.errors?.imageText}
        label={"Alternativ tekst for bilde"}
        htmlRef={imageAltTextRef}
        defaultValue={content.imageText ?? ""}
        name={"imageText"}
      />

      <Input
        error={actionData?.errors?.author}
        label={"Forfatter (Variant-epost)"}
        htmlRef={authorRef}
        defaultValue={content.author}
        name={"author"}
      />

      <Input
        type="date"
        error={actionData?.errors?.createdAt}
        label={"Opprettet (mm-dd-yyyy)"}
        htmlRef={createdAtRef}
        defaultValue={content.createdAt.split("T")[0]}
        name={"createdAt"}
      />

      <div className="mt-3 grid grid-cols-2 pb-4 md:grid-cols-3">
        <Toggle
          leftText={"Nei"}
          rightText={"Ja"}
          label={"Fremhevet"}
          htmlRef={featuredRef}
          inputName={"featured"}
          defaultChecked={content.featured}
        />

        <fieldset className="sm:mt-4 md:col-span-2">
          <legend>Kategori:</legend>
          <div className="mt-3 gap-4 md:flex">
            {categories?.map((category) => {
              return (
                <div key={category.id} className="flex items-center gap-1">
                  <input
                    className="h-4 w-4 cursor-pointer"
                    type="radio"
                    name="categoryId"
                    id="category"
                    value={category.id}
                    defaultChecked={content.categoryId === category.id}
                  />
                  <label className="font-bold" htmlFor="category">
                    {category.text}
                  </label>
                </div>
              );
            })}
          </div>

          {actionData?.errors?.categoryId && (
            <div className="pb-1 text-variant-pink-2" id="error">
              {actionData?.errors?.categoryId}
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
                name="tag"
                id={tag.id}
                value={tag.id}
                defaultChecked={
                  content.tags.findIndex((t) => t.id === tag.id) !== -1
                    ? true
                    : false
                }
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
            transition.state === "submitting" || transition.state === "loading"
              ? "Lagrer ... "
              : "Lagre"
          }
          disabled={
            transition.state === "submitting" || transition.state === "loading"
          }
        />
      </div>
    </Form>
  );
};

export default EditContent;
