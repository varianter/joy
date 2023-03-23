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

      <h1 className="text-white">Kurs</h1>
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
                />
              </div>
            );
          })}

          <CourseCard
            title="HTML & DOM"
            image={"/assets/icons/course.svg"}
            linkToCourse=""
            createdAt={new Date().toDateString()}
            description="Grunnleggende innføring i HTML og DOM"
          />
          <CourseCard
            title="JavaScript 101"
            linkToCourse=""
            createdAt={new Date().toDateString()}
            description="Grunnleggende innføring i JavaScript"
          />
          <CourseCard
            title="Game Development"
            image={"/assets/icons/course.svg"}
            linkToCourse=""
            createdAt={new Date().toDateString()}
            description="Grunnleggende innføring i spillutvikling"
          />
        </div>
      </section>
    </main>
  )
};

export default Course;
