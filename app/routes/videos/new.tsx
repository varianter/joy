import { ActionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import PrimaryButton from "~/components/buttons/PrimaryButton";
import SecondaryButton from "~/components/buttons/SecondaryButton";
import Card from "~/components/card/Card";
import { createVideo } from "~/models/videos.server";
import { requireUserSession } from "~/services/session";

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
          title: "Legg til tittel",
          description: null,
          youtubeid: null,
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
          description: "Legg til beskrivelse",
          youtubeid: null,
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
          youtubeid: "Legg til YouTube ID",
        },
      },
      { status: 400 }
    );
  }

  const video = await createVideo({ title, description, youtubeid, suggested });

  return redirect(`/videos/${video.id}`);
}

const NewVideoPage = () => {
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
    }
  }, [actionData]);

  return (
    <main>
      <section>
        <div className="flex justify-center text-left">
          <Card>
            <Form method="post" className="w-[30rem]">
              <div>
                <label className="flex w-full flex-col gap-1">
                  <span>Tittel: </span>
                  <input
                    ref={titleRef}
                    name="title"
                    className="flex-1 rounded-md border-2 px-3 leading-loose"
                    aria-invalid={actionData?.errors?.title ? true : undefined}
                    aria-errormessage={
                      actionData?.errors?.title ? "title-error" : undefined
                    }
                  />
                </label>
                {actionData?.errors?.title && (
                  <div className="py-1 text-variant-pink" id="title-error">
                    {actionData.errors.title}
                  </div>
                )}
              </div>

              <div>
                <label className="flex flex-col gap-1">
                  <span>Beskrivelse: </span>
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
                  <div
                    className="py-1 text-variant-pink"
                    id="description-error"
                  >
                    {actionData.errors.description}
                  </div>
                )}
              </div>

              <div>
                <label className="flex w-full flex-col gap-1">
                  <span>Youtube id: </span>
                  <input
                    ref={youtubeIdnRef}
                    name="youtubeid"
                    className="rounded-md border-2 px-3"
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
                  <div className="py-1 text-variant-pink" id="youtubeid-error">
                    {actionData.errors.youtubeid}
                  </div>
                )}
              </div>

              <div>
                <label className="flex flex-col gap-1">
                  <span>Anbefalt: </span>
                  <select
                    ref={suggestedRef}
                    name="suggested"
                    className="flex-1 rounded-md border-2 px-3 "
                  >
                    <option value="false">Nei</option>
                    <option value="true">Ja</option>
                  </select>
                </label>
              </div>

              <div className="flex pt-3">
                <Link to="/videos">
                  <SecondaryButton text="Tilbake" />
                </Link>

                <div className="ml-auto">
                  <PrimaryButton text="Lagre" />
                </div>
              </div>
            </Form>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default NewVideoPage;
