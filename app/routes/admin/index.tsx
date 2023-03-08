import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import Card from "~/components/card/Card";
import { createVideo, getVideos } from "~/models/videos.server";
import { requireUserSession } from "~/services/session";

export const loader = async ({ request }: LoaderArgs) => {
  await requireUserSession(request);
  return json({ videos: await getVideos() });
};

export async function action({ request }: ActionArgs) {
  await requireUserSession(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const youtubeid = formData.get("youtubeid");
  const suggested = formData.get("suggested") === "true" ? true : false;

  if (typeof title !== "string" || title.length === 0) {
    return json(
      {
        errors: {
          title: "Title is required",
          description: null,
          youtubeid: null,
          suggested: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof description !== "string" || description.length === 0) {
    return json(
      {
        errors: {
          title: null,
          description: "Description is required",
          youtubeid: null,
          suggested: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof youtubeid !== "string" || youtubeid.length === 0) {
    return json(
      {
        errors: {
          title: null,
          description: null,
          youtubeid: "Youtubeid is required",
          suggested: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof suggested !== "boolean") {
    return json(
      {
        errors: {
          title: null,
          description: null,
          youtubeid: null,
          suggested: "suggested is required",
        },
      },
      { status: 400 }
    );
  }

  const video = await createVideo({ title, description, youtubeid, suggested });

  return redirect(`/videos/${video.id}`);
}

const Admin = () => {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const youtubeIdnRef = useRef<HTMLInputElement>(null);
  const suggestedRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.description) {
      descriptionRef.current?.focus();
    } else if (actionData?.errors?.youtubeid) {
      youtubeIdnRef.current?.focus();
    } else if (actionData?.errors?.suggested) {
      suggestedRef.current?.focus();
    }
  }, [actionData]);

  return (
    <main>
      <section>
        <Card header={"Legg til data"}>
          <Form
            method="post"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: "100%",
            }}
          >
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Title: </span>
                <input
                  ref={titleRef}
                  name="title"
                  className="border-blue-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
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
              <label className="flex w-full flex-col gap-1">
                <span>Description: </span>
                <textarea
                  ref={descriptionRef}
                  name="description"
                  rows={8}
                  className="border-blue-500 w-full flex-1 rounded-md border-2 py-2 px-3 text-lg leading-6"
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
                <span>Youtubeid: </span>
                <input
                  ref={youtubeIdnRef}
                  name="youtubeid"
                  className="border-blue-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
                  aria-invalid={
                    actionData?.errors?.youtubeid ? true : undefined
                  }
                  aria-errormessage={
                    actionData?.errors?.youtubeid
                      ? "youtubeid-error"
                      : undefined
                  }
                />
              </label>
              {actionData?.errors?.youtubeid && (
                <div className="text-red-700 pt-1" id="youtubeid-error">
                  {actionData.errors.youtubeid}
                </div>
              )}
            </div>

            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Anbefalt: </span>
                <select
                  ref={suggestedRef}
                  name="suggested"
                  className="border-blue-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
                  aria-invalid={
                    actionData?.errors?.suggested ? true : undefined
                  }
                  aria-errormessage={
                    actionData?.errors?.suggested
                      ? "suggested-error"
                      : undefined
                  }
                >
                  <option value="true">YES</option>
                  <option value="false">Nope</option>
                </select>
              </label>
              {actionData?.errors?.suggested && (
                <div className="text-red-700 pt-1" id="suggested-error">
                  {actionData.errors.suggested}
                </div>
              )}
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-400 rounded py-2 px-4 text-white"
              >
                Save
              </button>
            </div>
          </Form>
        </Card>
      </section>
    </main>
  );
};

export default Admin;
