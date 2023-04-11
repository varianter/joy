import CourseCard from "~/components/card/CourseCard";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCourses } from "~/models/content.server";

export const loader = async () => {
  const courses = await getCourses();
  return json({ courses });
};

const Course = () => {
  const { courses } = useLoaderData<typeof loader>();

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="pb-8 text-white">Kurs</h1>
      <section className="max-w-5xl">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses?.map((course) => {
            return (
              <div key={course.id} className="my-1 inline-grid">
                <CourseCard
                  title={course.title}
                  linkToCourse={course.url}
                  image={course.image}
                  createdAt={course.createdAt}
                  altImageText={course.imageText}
                  description={course.description}
                  id={course.id}
                />
              </div>
            );
          })}
          <CourseCard
            title="Intro til HTML"
            linkToCourse=""
            image="/assets/icons/course.svg"
            createdAt="11.06.2023"
            altImageText="Bildeteskt"
            description="Beskrivelse her av en beginner app"
            id=""
            tags={["beginner"]}
          />
        </div>
      </section>
    </main>
  );
};

export default Course;
