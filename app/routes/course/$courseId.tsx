import { json, LoaderArgs } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { getContentById } from "~/models/content.server";
import invariant from "tiny-invariant";
import Level from "~/components/Level";
import { Tag } from "@prisma/client";
import SecondaryButton from "~/components/buttons/SecondaryButton";
import CheckTask from "~/components/CheckTask";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.courseId, "Course not found");
  const content = await getContentById(params.courseId);

  if (!content) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ content });
};

const CourseId = () => {
  const { content } = useLoaderData<typeof loader>();

  return (
    <main className=" mt-24 flex flex-col items-start text-white md:mx-[5rem] md:mt-32 lg:mx-[15rem] xl:mx-[35rem]">
      <NavLink to={"/course"}>
        <SecondaryButton text="Tilbake" />
      </NavLink>
      <div className="flex w-full justify-between pt-10">
        <div className="flex items-center">
          <img
            alt="course icon"
            className="h-[1rem] pr-2"
            src={"/assets/icons/course.svg"}
          />
          <p>Kurs</p>
        </div>
        <p>{new Date(content.createdAt).toLocaleDateString("nb")} </p>
      </div>
      <h1>{content.title}</h1>
      <div className="flex w-full flex-row justify-between pb-5 pt-10">
        {content.tags &&
          content.tags.map((tag: Tag) => <Level tag={tag.text} />)}
        <ul className="flex items-end">
          {content.tags &&
            content.tags.map((tag: Tag) => (
              <li className=" mr-3 rounded-3xl bg-variant-blue-3 px-2 py-1 text-xs hover:bg-variant-blue md:px-6 md:text-sm">
                {tag.text}
              </li>
            ))}
        </ul>
      </div>

      <p className="text-left">{content.description}</p>
      <hr className="my-5 h-px w-full"></hr>
      <h2>Innhold</h2>
      <div className="text-left underline md:mx-[12rem] md:mt-32 lg:mx-[12rem] xl:mx-[12srem]">
        <div className="flex items-center">
          <p>Intro</p>
          <img
            alt="arrowRigth"
            className="h-[1rem] pl-2"
            src={"/assets/icons/arrowRight.svg"}
          />
        </div>
        <div className="flex items-center">
          <p>Kapitel 1</p>
          <img
            alt="arrowRigth"
            className="h-[1rem] pl-2"
            src={"/assets/icons/arrowRight.svg"}
          />
        </div>
        <div className="flex items-center">
          <p>Kapitel 2</p>
          <img
            alt="arrowRigth"
            className="h-[1rem] pl-2"
            src={"/assets/icons/arrowRight.svg"}
          />
        </div>
      </div>

      <h2 className="mt-5 py-10">Intro</h2>
      <div className=" flex w-full rounded-2xl bg-variant-blue-2 p-5">
        Slides...
      </div>

      <h2 className="mt-5 py-10">Kapittel 1 med oppgaveliste</h2>
      <CheckTask
        title="Oppgave 1: skriv navnet ditt"
        description="  Bruk turtle-komandoene som forward(), left(), right(), penup() og
            pendown() til å skrive navnet ditt i Python."
        done={true}
      />
      <CheckTask
        title="Oppgave 2: Fyldte bokstaver"
        description=" Som neste utfordring skal du lage den første bokstaven i navnet ditt som en fyllt bokstav.
        Her kan det være lurt å dele bokstaven opp i enkle figurer som firkanter, trekanter og halvsirkler, og tegne én og én del."
        done={true}
      />
      <CheckTask
        title="Oppgave 3: Figurer"
        description="   Lek deg med ulike farger, og tegn et hus, en bil eller noe annet du har lyst til å lage. Bruk fantasien!"
        done={false}
      />
    </main>
  );
};

export default CourseId;
