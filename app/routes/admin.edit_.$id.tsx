import type { ActionArgs, LoaderArgs } from "@remix-run/node";
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
import {
  getContentByIdWithImageData,
  updateContent,
} from "~/models/content.server";
import { getTags } from "~/models/tag.server";
import { CATEGORIES, Category, isValidUrl } from "~/utils";

export const loader = async ({ params }: LoaderArgs) => {
  const content = await getContentByIdWithImageData(params.id ?? "");
  if (!content) {
    throw new Response("Not Found", { status: 404 });
  }
  const tags = await getTags();
  return json({ id: params.id, content, tags });
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
  const category = formData.get("category");
  const tags = formData.getAll("tag") as string[];
  const createdAt = new Date(formData.get("createdAt") as string);

  const errors = {
    title: null,
    description: null,
    url: null,
    featured: null,
    category: null,
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

  await updateContent(
    {
      id,
      title,
      description,
      url,
      featured,
      category,
      image,
      imageText,
      author,
      createdAt,
    },
    tags
  );

  return redirect(`/admin/edit`);
}

const EditContent = () => {
  const { id, content, tags } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const createdAtRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const imageAltTextRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  const errors = actionData?.errors;

  const navigation = useNavigation();

  useEffect(() => {
    if (errors?.title) {
      titleRef.current?.focus();
    } else if (errors?.description) {
      descriptionRef.current?.focus();
    } else if (errors?.createdAt) {
      createdAtRef.current?.focus();
    } else if (errors?.url) {
      urlRef.current?.focus();
    } else if (errors?.image) {
      imageRef.current?.focus();
    } else if (errors?.imageText) {
      imageAltTextRef.current?.focus();
    } else if (errors?.author) {
      authorRef.current?.focus();
    }
  }, [errors]);

  return (
    <div className="items-left mt-5 flex justify-center">
      <Form
        method="put"
        className="w-full rounded-3xl bg-variant-blue p-5 text-left text-white"
      >
        <input name="id" hidden defaultValue={id} />
        <Input
          error={errors?.title}
          label={"Tittel"}
          htmlRef={titleRef}
          name={"title"}
          defaultValue={content.title}
        />

        <TextArea
          error={errors?.description}
          label={"Beskrivelse"}
          htmlRef={descriptionRef}
          name={"description"}
          defaultValue={content.description}
        />

        <Input
          error={errors?.url}
          label={"Url"}
          htmlRef={urlRef}
          name={"url"}
          defaultValue={content.url}
        />

        <Input
          error={errors?.image}
          defaultValue={content.imageData?.dataUrl ?? ""}
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
          error={errors?.imageText}
          label={"Alternativ tekst for bilde"}
          htmlRef={imageAltTextRef}
          defaultValue={content.imageText ?? ""}
          name={"imageText"}
        />

        <Input
          error={errors?.author}
          label={"Forfatter (Variant-epost)"}
          htmlRef={authorRef}
          defaultValue={content.author}
          name={"author"}
        />

        <Input
          type="date"
          error={errors?.createdAt}
          label={"Opprettet (dd.mm.yyyy)"}
          htmlRef={createdAtRef}
          defaultValue={content.createdAt.split("T")[0]}
          name={"createdAt"}
        />

        <div className="mt-3 grid grid-cols-2 pb-4 md:grid-cols-3">
          <Toggle
            leftText={"Nei"}
            rightText={"Ja"}
            label={"Fremhevet"}
            inputName={"featured"}
            defaultChecked={content.featured}
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
                      name="category"
                      id="category"
                      value={category}
                      defaultChecked={content.category === category}
                    />
                    <label className="font-bold" htmlFor="category">
                      {category}
                    </label>
                  </div>
                );
              })}
            </div>

            {errors?.category && (
              <div className="pb-1 text-variant-pink-2" id="error">
                {errors?.category}
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

export default EditContent;

export const ErrorBoundary = () => {
  const error = useRouteError();

  return <ErrorComponent error={error} />;
};
